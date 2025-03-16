
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { addFilesToProject } from '../../utils/services/assetService';
import { logProjects, getProjectById } from '../../utils/projectUtils';
import { updateProject } from '../../utils/services/projectManagement/projectUpdateOperations';
import { saveProjectsToLocalStorage } from '../../utils/data/store/storageSync';

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
      console.log("addFilesToProject result:", result);
      
      setIsUploading(false);
      updateOverallProgress();
      
      // Log projects after upload for debugging
      logProjects();
      
      // Check project again to verify assets were added
      const updatedProject = getProjectById(projectId);
      if (updatedProject) {
        console.log("Updated project assets count:", updatedProject.assets?.length || 0);
        
        // Force project timestamp update to trigger re-renders
        updateProject(projectId, { updatedAt: new Date() });
        
        // Debug folder assets
        let folderName = "root";
        let foundAssetsInFolder = false;
        
        if (folderId !== 'root' && updatedProject.subfolders) {
          const targetFolder = updatedProject.subfolders.find(folder => folder.id === folderId);
          if (targetFolder) {
            folderName = targetFolder.name;
            console.log(`Target folder "${targetFolder.name}" (${folderId}) assets: ${targetFolder.assets?.length || 0}`);
            
            // Log each asset in the folder for debugging
            if (targetFolder.assets && targetFolder.assets.length > 0) {
              console.log(`[CRITICAL] All assets in folder "${folderName}":`);
              targetFolder.assets.forEach((asset: any, index: number) => {
                console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, Preview=${asset.preview ? 'exists' : 'missing'}`);
              });
              foundAssetsInFolder = true;
            } else {
              console.log(`[ERROR] No assets found in folder "${folderName}" after upload. This is unexpected.`);
            }
          } else {
            console.log(`[ERROR] Target folder with ID ${folderId} not found in project`);
          }
        } else if (folderId === 'root') {
          console.log(`Root folder assets: ${updatedProject.assets?.length || 0}`);
          if (updatedProject.assets && updatedProject.assets.length > 0) {
            foundAssetsInFolder = true;
            console.log(`First few assets in root:`, JSON.stringify(updatedProject.assets.slice(0, 3), null, 2));
          }
        }
        
        // Set upload complete with accurate folder information
        console.log(`[CRITICAL] Setting upload complete with folder ID: ${folderId}, folder name: ${folderName}`);
        completeUpload(projectId, projectName, completedFiles, folderId);
        
        // Force one more save to localStorage to ensure all data is persisted
        saveProjectsToLocalStorage();
        
        // Show toast with clear folder navigation instructions
        if (folderId !== 'root') {
          toast.success(`Added ${completedFiles.length} files to folder "${folderName}" in project "${projectName}". Click "View Assets" to see them.`);
        } else {
          toast.success(`Added ${completedFiles.length} files to root folder in project "${projectName}". Click "View Assets" to see them.`);
        }
        
        setUploadResults({
          success: true,
          count: completedFiles.length,
          projectId,
          projectName,
          folderId,
          folderName
        });
        
        setUploadComplete(true);
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
