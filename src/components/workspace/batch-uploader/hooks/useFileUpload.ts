
import { useState, useEffect, useCallback } from 'react';
import { useFileManager } from './useFileManager';
import { useFileInput } from './useFileInput';
import { calculateTotalSize } from '../utils/uploadUtils';
import { logProjects, getProjectById } from '../utils/projectUtils';
import { useUploadProcess } from './uploads/useUploadProcess';
import { useProjectSelection } from './uploads/useProjectSelection';
import { useNavigation } from './uploads/useNavigation';
import { useUploadValidation } from './uploads/useUploadValidation';

export const useFileUpload = () => {
  // Import sub-hooks
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
  
  const {
    isUploading,
    uploadComplete,
    setUploadComplete,
    processUpload
  } = useUploadProcess();
  
  const {
    selectedProject,
    selectedProjectName,
    selectedFolder,
    setSelectedFolder,
    selectProject
  } = useProjectSelection();
  
  const { navigateToProject } = useNavigation();
  
  const { validateUploadParams } = useUploadValidation();
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event);
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
  }, [files, setUploadComplete]);
  
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
  
  const startUpload = async (licenseType: string, projectId: string, folderId: string = 'root') => {
    // Validate upload parameters
    if (!validateUploadParams(files, licenseType, projectId)) {
      return;
    }
    
    console.log(`Starting upload to project: ${projectId}, folder: ${folderId}, license: ${licenseType}`);
    
    // Update selected project and folder
    selectProject(projectId);
    setSelectedFolder(folderId);
    
    // Process the upload
    await processUpload(
      files,
      projectId,
      selectedProjectName || getProjectById(projectId)?.name || "Project",
      folderId,
      licenseType,
      updateFileProgress,
      updateFileStatus,
      updateOverallProgress
    );
    
    // Log projects after upload (for debugging)
    logProjects();
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
