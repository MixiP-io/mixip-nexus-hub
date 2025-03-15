
import { useState } from 'react';
import { toast } from 'sonner';
import { useFileManager } from './useFileManager';
import { useFileInput } from './useFileInput';
import { simulateFileUpload, calculateTotalSize } from '../utils/uploadUtils';
import { addFilesToProject } from '../utils/projectUtils';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  
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
  
  const startUpload = async (licenseType: string, selectedProject: string) => {
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return;
    }
    
    if (!licenseType) {
      toast.error("Please select a license type");
      return;
    }
    
    if (!selectedProject) {
      toast.error("Please select a project to upload");
      return;
    }
    
    setIsUploading(true);
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
      }
      
      // Add files to project after processing all files
      await addFilesToProject(selectedProject, files, licenseType);
      
      toast.success(`All files uploaded successfully to project!`);
      updateFileStatus('', 'complete'); // Force progress to 100%
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('There was a problem with the upload');
    } finally {
      setIsUploading(false);
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
    calculateTotalSize: () => calculateTotalSize(files)
  };
};
