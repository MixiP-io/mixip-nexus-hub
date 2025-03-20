
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { useUploadState } from './useUploadState';
import { useUploadProcessing } from './useUploadProcessing';
import { useCompletedUploads } from './useCompletedUploads';
import { useUploadErrorHandling } from './useUploadErrorHandling';
import { supabase } from '@/integrations/supabase/client';

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
    
    // Check if projectId is a valid UUID format for Supabase
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
    
    if (!isValidUUID) {
      console.error(`[useUploadProcess] Project ID is not a valid UUID format: ${projectId}`);
      toast.error('Invalid project ID format. Database operations require UUID format.');
      return;
    }
    
    // Verify project exists in Supabase
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('id, name')
        .eq('id', projectId)
        .maybeSingle();
        
      if (projectError) {
        console.error(`[useUploadProcess] Error verifying project: ${projectError.message}`);
        toast.error('Error verifying project, please check your connection');
        return;
      }
      
      if (!projectData) {
        console.error(`[useUploadProcess] Project not found in database: ${projectId}`);
        toast.error('Project not found in database. Please create the project first.');
        return;
      }
      
      console.log(`[useUploadProcess] Verified project in Supabase: ${projectData.name}`);
    } catch (err) {
      console.error('[useUploadProcess] Unexpected error verifying project:', err);
      toast.error('Error preparing upload');
      return;
    }
    
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
          // Simple boolean wrapper function
          (value: boolean) => setUploadComplete(value),
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
        setIsUploading,
        setUploadComplete,
        setUploadResults
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
