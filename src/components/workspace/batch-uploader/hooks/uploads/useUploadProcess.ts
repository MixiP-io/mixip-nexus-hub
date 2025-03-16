
import { useCallback } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { addFilesToProject } from '../../utils/services/assetService';
import { getProjectById, logProjects } from '../../utils/projectUtils';
import { useUploadState } from './useUploadState';
import { executeFileUploads } from './useUploadExecution';
import { validateProject } from './useProjectValidation';

/**
 * Hook for managing the upload process logic
 */
export const useUploadProcess = () => {
  // Use the upload state hook
  const {
    isUploading,
    setIsUploading,
    uploadComplete,
    setUploadComplete,
    uploadResults,
    setUploadResults,
    completeUpload
  } = useUploadState();
  
  // The main upload process function
  const processUpload = async (
    files: UploadFile[],
    projectId: string,
    projectName: string,
    folderId: string,
    licenseType: string,
    updateFileProgress: (fileId: string, progress: number) => void,
    updateFileStatus: (fileId: string, status: any, errorMessage?: string) => void,
    updateOverallProgress: () => void,
  ) => {
    console.log(`Starting upload process to project: ${projectId}, folder: ${folderId || 'root'}`);
    console.log(`Files to process: ${files.length}, License: ${licenseType}`);
    
    // Validate project
    if (!validateProject(projectId)) {
      return;
    }
    
    // Initialize state
    setIsUploading(true);
    setUploadComplete(false);
    setUploadResults(null);
    
    updateOverallProgress(); // Calculate initial progress
    
    try {
      const normalizedFolderId = folderId || 'root';
      console.log(`Using normalized folder ID for upload: ${normalizedFolderId}`);
      
      // Execute file uploads
      const { completedFiles, hasErrors } = await executeFileUploads(
        files, 
        updateFileProgress, 
        updateFileStatus, 
        updateOverallProgress
      );
      
      console.log(`Completed files: ${completedFiles.length}`);
      
      // Handle completion
      if (completedFiles.length > 0) {
        await handleCompletedUploads(
          projectId,
          projectName,
          completedFiles,
          licenseType,
          normalizedFolderId,
          updateOverallProgress
        );
      } else {
        handleNoCompletedFiles(projectName, hasErrors);
      }
    } catch (error) {
      handleUploadError(error, projectId, projectName);
    } finally {
      // Force a final update to overall progress
      updateOverallProgress();
    }
  };
  
  // Handle completed uploads
  const handleCompletedUploads = async (
    projectId: string,
    projectName: string,
    completedFiles: UploadFile[],
    licenseType: string,
    folderId: string,
    updateOverallProgress: () => void
  ) => {
    console.log(`Adding ${completedFiles.length} files to project ${projectId}, folder: ${folderId}`);
    
    try {
      // Add files to project with proper error handling
      const result = await addFilesToProject(projectId, completedFiles, licenseType, folderId);
      console.log("addFilesToProject result:", result);
      
      setIsUploading(false);
      updateOverallProgress();
      
      // Log projects after upload (for debugging)
      logProjects();
      
      // Check project again to verify assets were added
      const updatedProject = getProjectById(projectId);
      if (updatedProject) {
        // Set upload complete
        completeUpload(projectId, projectName, completedFiles, folderId);
      } else {
        console.error("Project not found after upload");
        toast.error("Error: Project not found after upload");
        setUploadComplete(true);
        setUploadResults({
          success: false,
          count: 0,
          projectId,
          projectName,
          folderId
        });
      }
    } catch (error) {
      console.error("Error adding files to project:", error);
      toast.error(`Failed to add files to project: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsUploading(false);
      setUploadComplete(true);
      setUploadResults({
        success: false,
        count: 0,
        projectId,
        projectName,
        folderId
      });
    }
  };
  
  // Handle case where no files were completed
  const handleNoCompletedFiles = (projectName: string, hasErrors: boolean) => {
    console.log("No completed files to add to project");
    if (hasErrors) {
      toast.error(`Upload failed: There were errors processing your files`);
    } else {
      toast.warning("No files were uploaded successfully");
    }
    setIsUploading(false);
    setUploadComplete(true);
    setUploadResults({
      success: false,
      count: 0,
      projectId: "",
      projectName,
      folderId: ""
    });
  };
  
  // Handle upload errors
  const handleUploadError = (error: unknown, projectId: string, projectName: string) => {
    console.error('Upload error:', error);
    toast.error(`There was a problem with the upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
    setUploadComplete(true);
    setUploadResults({
      success: false,
      count: 0,
      projectId: projectId || "",
      projectName: projectName || "",
      folderId: ""
    });
    setIsUploading(false);
  };
  
  return {
    isUploading,
    uploadComplete,
    uploadResults,
    setUploadComplete,
    processUpload
  };
};
