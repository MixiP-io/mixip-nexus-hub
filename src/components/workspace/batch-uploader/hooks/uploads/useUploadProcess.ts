
import { useCallback } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { useUploadState } from './useUploadState';
import { useUploadProcessing } from './useUploadProcessing';
import { useCompletedUploads } from './useCompletedUploads';
import { useUploadErrorHandling } from './useUploadErrorHandling';

/**
 * Hook for managing the upload process logic
 */
export const useUploadProcess = () => {
  // Use sub-hooks for different responsibilities
  const {
    isUploading,
    setIsUploading,
    uploadComplete,
    setUploadComplete,
    uploadResults,
    setUploadResults,
    completeUpload
  } = useUploadState();
  
  const { processUploadFiles } = useUploadProcessing();
  const { handleCompletedUploads } = useCompletedUploads();
  const { handleNoCompletedFiles, handleUploadError } = useUploadErrorHandling();
  
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
    
    // Initialize state
    setIsUploading(true);
    setUploadComplete(false);
    setUploadResults(null);
    
    try {
      const normalizedFolderId = folderId || 'root';
      console.log(`Using normalized folder ID for upload: ${normalizedFolderId}`);
      
      // Process the files
      const { completedFiles, hasErrors } = await processUploadFiles(
        files,
        projectId,
        updateFileProgress,
        updateFileStatus,
        updateOverallProgress
      );
      
      // Handle the results
      if (completedFiles.length > 0) {
        await handleCompletedUploads(
          projectId,
          projectName,
          completedFiles,
          licenseType,
          normalizedFolderId,
          updateOverallProgress,
          setIsUploading,
          setUploadComplete,
          setUploadResults,
          completeUpload
        );
      } else {
        handleNoCompletedFiles(
          projectName, 
          hasErrors,
          setIsUploading,
          setUploadComplete,
          setUploadResults
        );
      }
    } catch (error) {
      handleUploadError(
        error, 
        projectId, 
        projectName,
        setUploadComplete,
        setUploadResults,
        setIsUploading
      );
    } finally {
      // Force a final update to overall progress
      updateOverallProgress();
    }
  };
  
  return {
    isUploading,
    uploadComplete,
    uploadResults,
    setUploadComplete,
    processUpload
  };
};
