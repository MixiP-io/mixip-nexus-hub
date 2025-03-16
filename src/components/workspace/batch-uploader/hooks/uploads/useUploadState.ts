
import { useState } from 'react';
import { UploadFile } from '../../types';

/**
 * Hook for managing upload state
 */
export const useUploadState = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [uploadResults, setUploadResults] = useState<{
    success: boolean;
    count: number;
    projectId: string;
    projectName: string;
    folderId: string;
  } | null>(null);
  
  /**
   * Set upload to complete state
   */
  const completeUpload = (
    projectId: string, 
    projectName: string, 
    completedFiles: UploadFile[],
    folderId: string = 'root'
  ) => {
    console.log(`Setting upload complete for project: ${projectId} (${projectName}), folder: ${folderId || 'root'}`);
    
    setUploadComplete(true);
    setUploadResults({
      success: true,
      count: completedFiles.length,
      projectId,
      projectName,
      folderId: folderId || 'root'
    });
    
    setIsUploading(false);
  };
  
  return {
    isUploading,
    setIsUploading,
    uploadComplete,
    setUploadComplete,
    uploadResults,
    setUploadResults,
    completeUpload
  };
};
