
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { addFilesToProject } from '../../utils/services/assets/upload/addFilesToProject';
import { supabase } from '@/integrations/supabase/client';

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
      console.log(`Processing ${completedFiles.length} completed files for project ${projectId} in folder ${normalizedFolderId}`);
      
      // Verify the project exists in Supabase
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('id, name')
        .eq('id', projectId)
        .single();
        
      if (projectError) {
        console.error('[useCompletedUploads] Error verifying project:', projectError);
        throw new Error(`Project verification failed: ${projectError.message}`);
      }
      
      console.log(`[useCompletedUploads] Verified project: ${projectData.name}`);
      
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
      
      // Complete the upload process with the proper arguments
      completeUpload(projectId, results);
      
      // Update the overall progress to 100%
      updateOverallProgress();
      
      // Force refresh assets by updating project timestamp
      const { error: updateError } = await supabase
        .from('projects')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', projectId);
        
      if (updateError) {
        console.error('[useCompletedUploads] Error updating project timestamp:', updateError);
      } else {
        console.log('[useCompletedUploads] Updated project timestamp to trigger refresh');
      }
      
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
      
      const errorResults = {
        success: false,
        count: 0,
        projectId,
        projectName,
        folderId: normalizedFolderId,
        error: error instanceof Error ? error.message : 'Failed to process uploads'
      };
      
      setUploadResults(errorResults);
      completeUpload(projectId, errorResults);
      
      toast.error('Error processing uploads');
    }
  };
  
  return {
    handleCompletedUploads
  };
};
