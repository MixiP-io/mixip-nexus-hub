
import { toast } from 'sonner';
import { Dispatch, SetStateAction } from 'react';

/**
 * Hook for handling upload errors
 */
export const useUploadErrorHandling = () => {
  // Handle case where no files were completed
  const handleNoCompletedFiles = (
    projectName: string, 
    hasErrors: boolean,
    setIsUploading: (value: boolean) => void,
    setUploadComplete: (value: boolean) => void,
    setUploadResults: (results: any) => void
  ) => {
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
      folderId: "root"
    });
  };
  
  // Handle upload errors
  const handleUploadError = (
    error: unknown, 
    projectId: string, 
    projectName: string,
    setIsUploading: (value: boolean) => void,
    setUploadComplete: (value: boolean) => void,
    setUploadResults: (results: any) => void
  ) => {
    console.error('Upload error:', error);
    toast.error(`There was a problem with the upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
    setIsUploading(false);
    setUploadComplete(true);
    setUploadResults({
      success: false,
      count: 0,
      projectId: projectId || "",
      projectName: projectName || "",
      folderId: "root"
    });
  };
  
  return {
    handleNoCompletedFiles,
    handleUploadError
  };
};
