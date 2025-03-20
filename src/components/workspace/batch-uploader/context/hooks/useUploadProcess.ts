import { useCallback } from 'react';
import { toast } from 'sonner';
import { UploaderState, UploadResults } from '../types';
import { getProjectById } from '../../utils/projectUtils';
import { addFilesToProject } from '../../utils/services/assets/upload/addFilesToProject';
import { simulateFileUpload } from '../../utils/uploadUtils';

/**
 * Hook for handling the upload process
 */
export const useUploadProcess = (
  state: UploaderState, 
  dispatch: React.Dispatch<any>,
  updateFileProgress: (fileId: string, progress: number) => void,
  updateFileStatus: (fileId: string, status: any, errorMessage?: string) => void
) => {
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
    const completedFiles: any[] = [];
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
  }, [state, dispatch, updateFileProgress, updateFileStatus]);

  return {
    startUpload
  };
};
