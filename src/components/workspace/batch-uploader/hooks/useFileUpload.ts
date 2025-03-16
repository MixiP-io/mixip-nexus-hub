
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useFileManager } from './useFileManager';
import { useFileInput } from './useFileInput';
import { simulateFileUpload, calculateTotalSize } from '../utils/uploadUtils';
import { addFilesToProject, getProjectById, logProjects } from '../utils/projectUtils';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  
  const {
    files,
    overallProgress,
    addFiles,
    removeFile,
    clearAll,
    updateFileProgress,
    updateFileStatus,
    updateOverallProgress
  } = useFileManager();
  
  const {
    fileInputRef,
    triggerFileInput,
    handleFileSelect: handleInputChange
  } = useFileInput(addFiles);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event);
  };
  
  const navigateToProject = (projectId: string) => {
    // In a real app, this would navigate to the project page
    console.log(`Navigating to project: ${projectId}`);
    
    // Force window navigation to ensure fresh load
    window.location.href = `/dashboard/workspace?tab=assets&project=${projectId}`;
  };

  // Reset upload complete when files change or component unmounts
  useEffect(() => {
    if (files.length === 0) {
      setUploadComplete(false);
    }
    
    // Clean up function to reset state when component unmounts
    return () => {
      setUploadComplete(false);
    };
  }, [files]);
  
  // Log state changes for debugging
  useEffect(() => {
    console.log("useFileUpload state:", { 
      uploadComplete, 
      selectedProject, 
      selectedProjectName,
      selectedFolder,
      filesCount: files.length,
      completedFiles: files.filter(f => f.status === 'complete').length
    });
  }, [uploadComplete, selectedProject, selectedProjectName, selectedFolder, files]);
  
  // Use a callback to ensure the upload complete setter is stable
  const completeUpload = useCallback(() => {
    console.log("Setting uploadComplete state to true");
    setUploadComplete(true);
    
    // Debug the project state after upload
    const project = getProjectById(selectedProject);
    if (project) {
      console.log(`Project ${project.name} now has ${project.assets?.length || 0} assets at root level`);
    }
  }, [selectedProject]);
  
  const startUpload = async (licenseType: string, projectId: string, folderId: string = 'root') => {
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return;
    }
    
    if (!licenseType) {
      toast.error("Please select a license type");
      return;
    }
    
    if (!projectId) {
      toast.error("Please select a project to upload");
      return;
    }
    
    console.log(`Starting upload to project: ${projectId}, folder: ${folderId}, license: ${licenseType}`);
    
    // Reset the upload complete state at the beginning of upload
    setUploadComplete(false);
    setIsUploading(true);
    setSelectedProject(projectId);
    setSelectedFolder(folderId);
    
    // Get project name for the success message
    const project = getProjectById(projectId);
    if (project) {
      setSelectedProjectName(project.name);
      console.log(`Project before upload: ${project.name} with ${project.assets?.length || 0} assets`);
    } else {
      console.error(`Project not found: ${projectId}`);
      toast.error(`Project not found: ${projectId}`);
      setIsUploading(false);
      return;
    }
    
    updateOverallProgress(); // Calculate initial progress
    
    try {
      // Process files one by one
      for (const file of files) {
        // Only process queued files
        if (file.status !== 'queued') continue;
        
        // Simulate upload - in a real app, replace with actual API calls
        await simulateFileUpload(file.id, updateFileProgress);
        
        // Mark as processing
        updateFileStatus(file.id, 'processing');
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mark as complete
        updateFileStatus(file.id, 'complete');
        
        // Update overall progress after each file
        updateOverallProgress();
      }
      
      // Add files to project after processing all files
      const completedFiles = files.filter(f => f.status === 'complete');
      console.log(`Completed files: ${completedFiles.length}`);
      
      if (completedFiles.length > 0) {
        console.log(`Adding ${completedFiles.length} files to project ${projectId}`);
        await addFilesToProject(projectId, completedFiles, licenseType, folderId);
        
        console.log("Upload complete, setting uploadComplete to true");
        console.log("Project:", projectId, "Project name:", selectedProjectName, "Folder:", folderId);
        
        // Log projects after upload (for debugging)
        logProjects();
        
        // Check project again to verify assets were added
        const updatedProject = getProjectById(projectId);
        if (updatedProject) {
          console.log(`Project after upload: ${updatedProject.name} with ${updatedProject.assets?.length || 0} assets`);
        }
        
        // Ensure all state is updated correctly after upload
        setIsUploading(false);
        updateOverallProgress();
        
        // Use setTimeout with a longer delay to ensure all state updates are processed
        // and the component has re-rendered before showing the dialog
        setTimeout(() => {
          completeUpload();
        }, 500);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('There was a problem with the upload');
      setUploadComplete(false);
    } finally {
      setIsUploading(false);
      // Force a final update to overall progress
      updateOverallProgress();
    }
  };

  return {
    files,
    isUploading,
    overallProgress,
    fileInputRef,
    triggerFileInput,
    handleFileSelect,
    removeFile,
    clearAll,
    startUpload,
    calculateTotalSize: () => calculateTotalSize(files),
    uploadComplete,
    setUploadComplete,
    selectedProject,
    selectedProjectName,
    selectedFolder,
    setSelectedFolder,
    navigateToProject
  };
};
