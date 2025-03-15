
import { useState } from 'react';
import { toast } from 'sonner';
import { useFileManager } from './useFileManager';
import { useFileInput } from './useFileInput';
import { simulateFileUpload, calculateTotalSize } from '../utils/uploadUtils';
import { addFilesToProject, getProjectById } from '../utils/projectUtils';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  
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
    // This is where you'd implement navigation to the project folder
    // For example: router.push(`/dashboard/projects/${projectId}`);
  };
  
  const startUpload = async (licenseType: string, projectId: string) => {
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
    
    setIsUploading(true);
    setSelectedProject(projectId);
    
    // Get project name for the success message
    const project = getProjectById(projectId);
    if (project) {
      setSelectedProjectName(project.name);
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
      
      if (completedFiles.length > 0) {
        await addFilesToProject(projectId, completedFiles, licenseType);
        
        // Set upload complete to show success message
        setUploadComplete(true);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('There was a problem with the upload');
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
    navigateToProject
  };
};
