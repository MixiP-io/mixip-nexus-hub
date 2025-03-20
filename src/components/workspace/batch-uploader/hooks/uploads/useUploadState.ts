
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
    location?: string;
  } | null>(null);
  
  /**
   * Set upload to complete state with all necessary information
   */
  const completeUpload = (
    projectId: string, 
    results: any
  ) => {
    console.log(`Setting upload complete for project: ${projectId}, results:`, results);
    
    // Make sure we set both upload complete flag and results in one operation
    setUploadComplete(true);
    setUploadResults(results);
    
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
