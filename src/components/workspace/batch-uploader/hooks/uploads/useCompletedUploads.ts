
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { addFilesToProject } from '../../utils/services/assets/upload/addFilesToProject';

/**
 * Hook for managing completed uploads
 */
export const useCompletedUploads = () => {
  const handleCompletedUploads = async (
    projectId: string,
    projectName: string,
    completedFiles: UploadFile[],
    licenseType: string,
    normalizedFolderId: string,
    updateOverallProgress: () => void,
    setIsUploading: (isUploading: boolean) => void,
    setUploadComplete: (isComplete: boolean) => void,
    setUploadResults: (results: any) => void,
    completeUpload: (projectId: string, results: any) => void
  ) => {
    try {
      console.log(`Processing ${completedFiles.length} completed files`);
      
      // Add the files to the project
      const { success, count, location } = await addFilesToProject(
        projectId,
        completedFiles,
        licenseType,
        normalizedFolderId
      );
      
      // Update the results with project, folder, and success info
      const results = {
        success,
        count,
        location,
        projectId,
        projectName,
        folderId: normalizedFolderId // Ensure folder ID is passed correctly
      };
      
      console.log(`[useCompletedUploads] Upload results:`, results);
      
      // Update UI state
      setIsUploading(false);
      setUploadComplete(true);
      setUploadResults(results);
      
      // Complete the upload process
      completeUpload(projectId, results);
      
      // Update the overall progress to 100%
      updateOverallProgress();
      
      // Show toast notification
      if (success) {
        toast.success(`Successfully uploaded ${count} files to ${projectName}`);
      } else {
        toast.error('Failed to upload files to project');
      }
    } catch (error) {
      console.error('[useCompletedUploads] Error handling completed uploads:', error);
      setIsUploading(false);
      setUploadComplete(true);
      setUploadResults({
        success: false,
        count: 0,
        projectId,
        projectName,
        error: 'Failed to process uploads'
      });
      
      toast.error('Error processing uploads');
    }
  };
  
  return {
    handleCompletedUploads
  };
};
