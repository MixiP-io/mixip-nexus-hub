
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { addFilesToProject } from '../../utils/services/assetService';
import { logProjects, getProjectById } from '../../utils/projectUtils';
import { updateProject } from '../../utils/services/projectManagement/projectUpdateOperations';
import { saveProjectsToLocalStorage } from '../../utils/data/store/storageSync';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook for handling completed uploads
 */
export const useCompletedUploads = () => {
  // Handle completed uploads
  const handleCompletedUploads = async (
    projectId: string,
    projectName: string,
    completedFiles: UploadFile[],
    licenseType: string,
    folderId: string,
    updateOverallProgress: () => void,
    setIsUploading: (value: boolean) => void,
    setUploadComplete: (value: boolean) => void,
    setUploadResults: (results: any) => void,
    completeUpload: (projectId: string, projectName: string, completedFiles: UploadFile[], folderId: string) => void
  ) => {
    console.log(`[CRITICAL] Adding ${completedFiles.length} files to project ${projectId}, folder: ${folderId}`);
    
    // Log the file previews to check if they're valid
    completedFiles.forEach((file, index) => {
      console.log(`File ${index + 1} preview:`, 
        file.preview ? `exists (starts with ${file.preview.substring(0, 30)}...)` : 'no preview');
    });
    
    if (completedFiles.length === 0) {
      console.error("No completed files to process");
      toast.error("No files were processed successfully. Please check file formats and try again.");
      setIsUploading(false);
      setUploadComplete(true);
      setUploadResults({
        success: false,
        count: 0,
        projectId,
        projectName,
        folderId,
        errorMessage: "No files were processed successfully"
      });
      return;
    }
    
    try {
      // Add files to project with proper error handling
      const result = await addFilesToProject(projectId, completedFiles, licenseType, folderId);
      console.log("[CRITICAL] addFilesToProject result:", result);
      
      setIsUploading(false);
      updateOverallProgress();
      
      // Force one more save to localStorage to ensure all data is persisted
      try {
        saveProjectsToLocalStorage();
      } catch (e) {
        // If localStorage is full, just log the error and continue
        console.error("Error saving to localStorage, but continuing with upload completion:", e);
      }
      
      // Log projects after upload for debugging
      logProjects();
      
      // Verify the assets were added to the database - use the result.location for the folder name
      let folderDbId = null;
      let folderName = result.location || "root";
      
      // If this is not the root folder, get the real folder ID from the database
      if (folderId !== 'root' || folderName !== 'root') {
        // Get the folder ID from the database using the folder name returned from addFilesToProject
        const { data: folderData, error: folderError } = await supabase
          .from('project_folders')
          .select('id, name')
          .eq('project_id', projectId)
          .eq('name', folderName)
          .maybeSingle();
          
        if (folderError) {
          console.error('[useCompletedUploads] Error fetching folder by name:', folderError);
        } else if (folderData) {
          folderDbId = folderData.id;
          folderName = folderData.name;
          console.log(`[useCompletedUploads] Retrieved folder from database by name: ${folderName} (${folderDbId})`);
        } else {
          // Try by ID as fallback
          console.log(`[useCompletedUploads] Folder not found by name, trying by ID: ${folderId}`);
          const { data: folderById, error: idError } = await supabase
            .from('project_folders')
            .select('id, name')
            .eq('id', folderId)
            .maybeSingle();
            
          if (idError) {
            console.error('[useCompletedUploads] Error fetching folder by ID:', idError);
          } else if (folderById) {
            folderDbId = folderById.id;
            folderName = folderById.name;
            console.log(`[useCompletedUploads] Retrieved folder from database by ID: ${folderName} (${folderDbId})`);
          }
        }
      }
      
      // Verify assets in the database
      const { data: dbAssets, error: dbAssetsError } = await supabase
        .from('assets')
        .select('id, name')
        .eq('project_id', projectId)
        .is('folder_id', folderDbId)
        .order('uploaded_at', { ascending: false })
        .limit(completedFiles.length);
        
      if (dbAssetsError) {
        console.error('[useCompletedUploads] Error verifying assets in database:', dbAssetsError);
      } else {
        console.log(`[useCompletedUploads] Found ${dbAssets.length} assets in database for folder ${folderName}`);
        
        if (dbAssets.length > 0) {
          console.log('[useCompletedUploads] Recent assets in database:', dbAssets.map(a => a.name).join(', '));
        }
      }
      
      // Check project again to verify assets were added
      const updatedProject = getProjectById(projectId);
      console.log("[CRITICAL] Updated project data:", updatedProject);
      
      if (updatedProject) {
        console.log("[CRITICAL] Updated project assets count:", updatedProject.assets?.length || 0);
        
        // Force project timestamp update to trigger re-renders
        try {
          updateProject(projectId, { updatedAt: new Date() });
        } catch (e) {
          console.error("Error updating project timestamp, but continuing:", e);
        }
        
        // IMPORTANT: Set upload complete with accurate folder information
        // This is the key part that was likely failing before
        console.log(`[CRITICAL] Setting upload complete with folder ID: ${folderDbId || folderId}, folder name: ${folderName}`);
        
        // This is the critical call to make sure the dialog appears
        completeUpload(projectId, projectName, completedFiles, folderDbId || folderId);
        
        // Set more detailed results if needed
        setUploadResults({
          success: true,
          count: completedFiles.length,
          projectId,
          projectName,
          folderId: folderDbId || folderId,
          folderName
        });
        
        // Make sure both of these are set
        setUploadComplete(true);
        
        // Show toast with clear folder navigation instructions
        if (folderName !== 'root') {
          toast.success(`Added ${completedFiles.length} files to folder "${folderName}" in project "${projectName}". Click "View Assets" to see them.`);
        } else {
          toast.success(`Added ${completedFiles.length} files to root folder in project "${projectName}". Click "View Assets" to see them.`);
        }
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
        folderId,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
  
  return {
    handleCompletedUploads
  };
};
