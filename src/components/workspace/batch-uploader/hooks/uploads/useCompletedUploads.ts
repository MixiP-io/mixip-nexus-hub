
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { addFilesToProject } from '../../utils/services/assetService';
import { logProjects, getProjectById } from '../../utils/projectUtils';

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
    console.log(`Adding ${completedFiles.length} files to project ${projectId}, folder: ${folderId}`);
    
    try {
      // Add files to project with proper error handling
      const result = await addFilesToProject(projectId, completedFiles, licenseType, folderId);
      console.log("addFilesToProject result:", result);
      
      setIsUploading(false);
      updateOverallProgress();
      
      // Log projects after upload (for debugging)
      logProjects();
      
      // Check project again to verify assets were added
      const updatedProject = getProjectById(projectId);
      if (updatedProject) {
        console.log("Updated project assets count:", updatedProject.assets?.length || 0);
        
        // Debug folder assets
        let assetsFoundInFolder = false;
        if (folderId !== 'root' && updatedProject.subfolders) {
          const targetFolder = updatedProject.subfolders.find(folder => folder.id === folderId);
          if (targetFolder) {
            console.log(`Target folder "${targetFolder.name}" (${folderId}) assets: ${targetFolder.assets?.length || 0}`);
            if (targetFolder.assets && targetFolder.assets.length > 0) {
              assetsFoundInFolder = true;
              console.log(`First few assets in folder:`, JSON.stringify(targetFolder.assets.slice(0, 3), null, 2));
            }
          } else {
            console.log(`Target folder with ID ${folderId} not found in project`);
          }
        } else if (folderId === 'root') {
          console.log(`Root folder assets: ${updatedProject.assets?.length || 0}`);
          if (updatedProject.assets && updatedProject.assets.length > 0) {
            assetsFoundInFolder = true;
            console.log(`First few assets in root:`, JSON.stringify(updatedProject.assets.slice(0, 3), null, 2));
          }
        }
        
        // Log all project folders and their assets
        if (updatedProject.subfolders) {
          updatedProject.subfolders.forEach(folder => {
            console.log(`Folder ${folder.name} (${folder.id}) assets: ${folder.assets?.length || 0}`);
            if (folder.assets && folder.assets.length > 0) {
              console.log(`Sample asset from folder ${folder.name}:`, folder.assets[0]);
            }
          });
        }
        
        // Set upload complete with accurate folder information
        console.log(`Setting upload complete with folder ID: ${folderId}`);
        completeUpload(projectId, projectName, completedFiles, folderId);
        
        // Show folder-specific toast
        if (folderId !== 'root') {
          const folderName = updatedProject.subfolders?.find(f => f.id === folderId)?.name || folderId;
          toast.success(`Added ${completedFiles.length} files to folder "${folderName}" in project "${projectName}"`);
        } else {
          toast.success(`Added ${completedFiles.length} files to root folder in project "${projectName}"`);
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
        folderId
      });
    }
  };
  
  return {
    handleCompletedUploads
  };
};
