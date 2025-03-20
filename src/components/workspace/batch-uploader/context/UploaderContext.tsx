import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { UploaderState, UploaderAction, UploadResults } from './types';
import { initialState, uploaderReducer } from './uploaderReducer';
import { UploadFile, FileStatus, UploadSource } from '../types';
import { getFilePreview } from '../utils/fileUtils';
import { getProjectById } from '../utils/projectUtils';
import { addFilesToProject } from '../utils/services/assets/upload/addFilesToProject';
import { formatFileSize } from '../utils/formatUtils';
import { calculateTotalSize } from '../utils/uploadUtils';
import { simulateFileUpload } from '../utils/uploadUtils';

interface UploaderContextValue extends UploaderState {
  // Actions
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (id: string) => void;
  clearAll: () => void;
  startUpload: () => void;
  setUploadComplete: (isComplete: boolean) => void;
  navigateToProject: (projectId: string, folderId?: string) => void;
  updateFileProgress: (fileId: string, progress: number) => void;
  updateFileStatus: (fileId: string, status: FileStatus, errorMessage?: string) => void;
  
  // UI actions
  setActiveView: (view: 'source' | 'metadata' | 'project') => void;
  setActiveSource: (source: UploadSource) => void;
  setTags: (tags: string[]) => void;
  setSelectedLicense: (license: string) => void;
  setUsageRights: (rights: Record<string, boolean>) => void;
  setSelectedProject: (projectId: string) => void;
  setSelectedFolder: (folderId: string) => void;
  
  // Utility functions
  formatFileSize: (bytes: number) => string;
  calculateTotalSize: () => number;
  
  // Refs
  fileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileInput: () => void;
}

export const UploaderContext = createContext<UploaderContextValue | undefined>(undefined);

export const UploaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uploaderReducer, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle files reset when component unmounts
  useEffect(() => {
    if (state.files.length === 0) {
      dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: false });
    }
    
    return () => {
      dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: false });
    };
  }, [state.files.length]);
  
  // File Input Handlers
  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }
    
    try {
      // Process files before dispatching to generate previews
      const filesArray = Array.from(selectedFiles);
      
      // Process each file to create previews
      const processedFiles: File[] = [];
      
      for (const file of filesArray) {
        processedFiles.push(file);
        
        // Generate preview asynchronously
        if (file.type.startsWith('image/')) {
          try {
            const preview = await getFilePreview(file);
            // Once preview is ready, update the file in state
            const newFiles = state.files.map(f => {
              if (f.file === file) {
                return { ...f, preview };
              }
              return f;
            });
            if (newFiles.some(f => f.file === file)) {
              dispatch({ type: 'ADD_FILES', payload: [] }); // Dummy dispatch to trigger update
            }
          } catch (error) {
            console.error("Error generating preview:", error);
          }
        }
      }
      
      dispatch({ type: 'ADD_FILES', payload: processedFiles });
      toast.success(`${processedFiles.length} files added to upload queue`);
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Error processing files");
    } finally {
      // Reset the input value to allow selecting the same file again
      if (event.target) {
        event.target.value = '';
      }
    }
  }, [state.files]);
  
  // File Management Actions
  const removeFile = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FILE', payload: id });
  }, []);
  
  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_FILES' });
  }, []);
  
  const updateFileProgress = useCallback((fileId: string, progress: number) => {
    dispatch({ 
      type: 'UPDATE_FILE_PROGRESS', 
      payload: { fileId, progress } 
    });
  }, []);
  
  const updateFileStatus = useCallback((fileId: string, status: FileStatus, errorMessage?: string) => {
    dispatch({ 
      type: 'UPDATE_FILE_STATUS', 
      payload: { fileId, status, errorMessage } 
    });
  }, []);
  
  // Upload Process
  const startUpload = useCallback(async () => {
    const { files, selectedProject, selectedLicense, selectedFolder } = state;
    
    // Validation
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return;
    }
    
    if (!selectedProject) {
      toast.error("Please select a project to upload files to");
      return;
    }
    
    // Get project name for logs
    const project = getProjectById(selectedProject);
    if (!project) {
      toast.error("Project not found");
      return;
    }
    
    const projectName = project.name;
    
    // Set uploading state
    dispatch({ type: 'SET_IS_UPLOADING', payload: true });
    dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: false });
    
    // Keep track of completed files
    const completedFiles: UploadFile[] = [];
    let hasErrors = false;
    
    // Process each file
    for (const file of files) {
      if (file.status !== 'queued') continue;
      
      try {
        // Simulate upload
        await simulateFileUpload(file.id, updateFileProgress);
        
        // Mark as processing
        updateFileStatus(file.id, 'processing');
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mark as complete
        updateFileStatus(file.id, 'complete');
        
        // Add to completed files
        completedFiles.push({ ...file, status: 'complete', progress: 100 });
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        updateFileStatus(file.id, 'error', error instanceof Error ? error.message : 'Upload failed');
        hasErrors = true;
      }
    }
    
    // Handle completion
    if (completedFiles.length > 0) {
      try {
        // Add files to project
        const normalizedFolderId = selectedFolder || 'root';
        const { success, count, location } = await addFilesToProject(
          selectedProject,
          completedFiles,
          selectedLicense,
          normalizedFolderId
        );
        
        // Set results
        const results: UploadResults = {
          success,
          count,
          location,
          projectId: selectedProject,
          projectName,
          folderId: normalizedFolderId
        };
        
        dispatch({ type: 'SET_IS_UPLOADING', payload: false });
        dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: true });
        dispatch({ type: 'SET_UPLOAD_RESULTS', payload: results });
        
        // Show toast
        if (success) {
          toast.success(`Successfully uploaded ${count} files to ${projectName}`);
        } else {
          toast.error('Failed to upload files to project');
        }
      } catch (error) {
        console.error("Error finalizing upload:", error);
        dispatch({ type: 'SET_IS_UPLOADING', payload: false });
        dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: true });
        dispatch({ 
          type: 'SET_UPLOAD_RESULTS', 
          payload: {
            success: false,
            count: 0,
            projectId: selectedProject,
            projectName,
            folderId: selectedFolder || 'root'
          }
        });
        toast.error('Error finalizing uploads');
      }
    } else {
      // No completed files
      dispatch({ type: 'SET_IS_UPLOADING', payload: false });
      dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: true });
      dispatch({ 
        type: 'SET_UPLOAD_RESULTS', 
        payload: {
          success: false,
          count: 0,
          projectId: selectedProject || "",
          projectName: projectName || "",
          folderId: selectedFolder || 'root'
        }
      });
      
      if (hasErrors) {
        toast.error(`Upload failed: There were errors processing your files`);
      } else {
        toast.warning("No files were uploaded successfully");
      }
    }
  }, [state.files, state.selectedProject, state.selectedLicense, state.selectedFolder, updateFileProgress, updateFileStatus]);
  
  // Navigation
  const navigateToProject = useCallback((projectId: string, folderId?: string) => {
    const targetLocation = folderId && folderId !== 'root'
      ? `/dashboard/workspace/projects/${projectId}/folder/${folderId}`
      : `/dashboard/workspace/projects/${projectId}`;
    
    window.location.href = targetLocation;
  }, []);
  
  // UI State Actions
  const setActiveView = useCallback((view: 'source' | 'metadata' | 'project') => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  }, []);
  
  const setActiveSource = useCallback((source: UploadSource) => {
    dispatch({ type: 'SET_ACTIVE_SOURCE', payload: source });
  }, []);
  
  const setTags = useCallback((tags: string[]) => {
    dispatch({ type: 'SET_TAGS', payload: tags });
  }, []);
  
  const setSelectedLicense = useCallback((license: string) => {
    dispatch({ type: 'SET_LICENSE', payload: license });
  }, []);
  
  const setUsageRights = useCallback((rights: Record<string, boolean>) => {
    dispatch({ type: 'SET_USAGE_RIGHTS', payload: rights });
  }, []);
  
  const setSelectedProject = useCallback((projectId: string) => {
    if (!projectId) {
      dispatch({ 
        type: 'SELECT_PROJECT', 
        payload: { projectId: '', projectName: '' } 
      });
      return;
    }
    
    const project = getProjectById(projectId);
    if (project) {
      dispatch({ 
        type: 'SELECT_PROJECT', 
        payload: { projectId, projectName: project.name } 
      });
    } else {
      console.error(`Project not found: ${projectId}`);
      toast.error("Project not found");
    }
  }, []);
  
  const setSelectedFolder = useCallback((folderId: string) => {
    dispatch({ type: 'SET_SELECTED_FOLDER', payload: folderId });
  }, []);
  
  const setUploadComplete = useCallback((isComplete: boolean) => {
    dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: isComplete });
  }, []);
  
  // Utility functions
  const calculateStateTotalSize = useCallback(() => {
    return calculateTotalSize(state.files);
  }, [state.files]);
  
  const contextValue: UploaderContextValue = {
    ...state,
    handleFileSelect,
    removeFile,
    clearAll,
    startUpload,
    setUploadComplete,
    navigateToProject,
    updateFileProgress,
    updateFileStatus,
    setActiveView,
    setActiveSource,
    setTags,
    setSelectedLicense,
    setUsageRights,
    setSelectedProject,
    setSelectedFolder,
    formatFileSize,
    calculateTotalSize: calculateStateTotalSize,
    fileInputRef,
    triggerFileInput
  };
  
  return (
    <UploaderContext.Provider value={contextValue}>
      {children}
    </UploaderContext.Provider>
  );
};

export const useUploaderContext = () => {
  const context = useContext(UploaderContext);
  if (context === undefined) {
    throw new Error('useUploaderContext must be used within a UploaderProvider');
  }
  return context;
};
