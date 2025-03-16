
import { useState, useCallback } from 'react';

/**
 * Hook for managing upload state (progress, completion, results)
 */
export const useUploadState = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    success: boolean;
    count: number;
    projectId: string;
    projectName: string;
  } | null>(null);
  
  // Function to set upload complete and handle final steps
  const completeUpload = useCallback((
    selectedProject: string, 
    selectedProjectName: string, 
    completedFiles: any[]
  ) => {
    console.log(`Setting uploadComplete state to true with ${completedFiles.length} files`);
    setUploadComplete(true);
    setUploadResults({
      success: completedFiles.length > 0,
      count: completedFiles.length,
      projectId: selectedProject,
      projectName: selectedProjectName
    });
  }, []);
  
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
