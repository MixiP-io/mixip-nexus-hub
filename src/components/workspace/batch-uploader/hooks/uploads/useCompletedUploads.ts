
import { toast } from 'sonner';
import { addFilesToProject } from '../../utils/services/assets/upload/addFilesToProject';

/**
 * Hook for handling completed uploads
 */
export const useCompletedUploads = () => {
  // Handle completed uploads
  const handleCompletedUploads = async (
    projectId: string,
    projectName: string,
    completedFiles: any[],
    licenseType: string,
    folderId: string,
    updateOverallProgress: () => void,
    setIsUploading: (value: boolean) => void,
    setUploadComplete: (value: boolean) => void,
    completeUpload: (projectId: string, results: any) => void
  ) => {
    try {
      // Add files to project
      console.log(`[useCompletedUploads] Adding ${completedFiles.length} files to project ${projectId}, folder ${folderId}`);
      
      const { success, count, location } = await addFilesToProject(
        projectId,
        completedFiles,
        licenseType,
        folderId
      );
      
      // Set upload complete
      console.log(`[useCompletedUploads] Upload complete: success=${success}, count=${count}, location=${location}`);
      
      // Update overall progress
      updateOverallProgress();
      
      // Set upload state
      setIsUploading(false);
      setUploadComplete(true);
      
      const results = {
        success,
        count,
        projectId,
        projectName,
        folderId,
        location
      };
      
      // Complete upload
      completeUpload(projectId, results);
      
      // Show toast notification
      if (success) {
        toast.success(`Successfully uploaded ${count} files to ${projectName}`);
      } else {
        toast.error('Failed to upload files to project');
      }
    } catch (error) {
      console.error("[useCompletedUploads] Error finalizing upload:", error);
      setIsUploading(false);
      
      // Set upload error result
      completeUpload(projectId, {
        success: false,
        count: 0,
        projectId,
        projectName,
        folderId
      });
      
      toast.error('Error finalizing uploads');
    }
  };
  
  return {
    handleCompletedUploads
  };
};
