
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { simulateFileUpload } from '../../utils/uploadUtils';
import { addFilesToProject } from '../../utils/services/assetService';
import { getProjectById, logProjects } from '../../utils/projectUtils';
import { ensureProjectDataIntegrity } from '../../utils/data/projectStore';

/**
 * Hook for managing the upload process logic
 */
export const useUploadProcess = () => {
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
    completedFiles: UploadFile[]
  ) => {
    console.log(`Setting uploadComplete state to true with ${completedFiles.length} files`);
    setUploadComplete(true);
    setUploadResults({
      success: completedFiles.length > 0,
      count: completedFiles.length,
      projectId: selectedProject,
      projectName: selectedProjectName
    });
    
    // Debug the project state after upload
    const project = getProjectById(selectedProject);
    if (project) {
      console.log(`Project ${project.name} now has ${project.assets?.length || 0} assets at root level`);
      
      // Show a confirmation toast here too for redundancy
      if (completedFiles.length > 0) {
        toast.success(`Upload complete! ${completedFiles.length} files added to ${project.name}`);
      } else {
        toast.error(`No files were uploaded successfully to ${project.name}`);
      }
    }
  }, []);
  
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
    
    // First ensure project data integrity
    ensureProjectDataIntegrity();
    
    setIsUploading(true);
    setUploadComplete(false);
    setUploadResults(null);
    
    updateOverallProgress(); // Calculate initial progress
    
    try {
      let hasErrors = false;
      const folderToUse = folderId || 'root';
      
      // Double-check project exists before proceeding
      const projectExists = getProjectById(projectId);
      if (!projectExists) {
        throw new Error(`Project ${projectId} not found before starting upload`);
      }
      
      // Process files one by one
      for (const file of files) {
        // Only process queued files
        if (file.status !== 'queued') {
          console.log(`Skipping file ${file.name} with status ${file.status}`);
          continue;
        }
        
        console.log(`Processing file: ${file.name}`);
        
        try {
          // Simulate upload - in a real app, replace with actual API calls
          await simulateFileUpload(file.id, updateFileProgress);
          
          // Mark as processing
          updateFileStatus(file.id, 'processing');
          console.log(`File ${file.name} is processing`);
          
          // Simulate processing delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mark as complete
          updateFileStatus(file.id, 'complete');
          console.log(`File ${file.name} is complete`);
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error);
          updateFileStatus(file.id, 'error', error instanceof Error ? error.message : 'Upload failed');
          hasErrors = true;
        }
        
        // Update overall progress after each file
        updateOverallProgress();
      }
      
      // Add files to project after processing all files
      const completedFiles = files.filter(f => f.status === 'complete');
      console.log(`Completed files: ${completedFiles.length}`);
      
      if (completedFiles.length > 0) {
        console.log(`Adding ${completedFiles.length} files to project ${projectId}, folder: ${folderToUse}`);
        
        try {
          // Double-check project exists before adding files
          const projectExists = getProjectById(projectId);
          if (!projectExists) {
            throw new Error(`Project ${projectId} not found`);
          }
          
          console.log(`Using folder: ${folderToUse}`);
          
          // Add files to project with proper error handling
          const result = await addFilesToProject(projectId, completedFiles, licenseType, folderToUse);
          console.log("addFilesToProject result:", result);
          
          console.log("Upload complete, setting uploadComplete to true");
          console.log("Project:", projectId, "Project name:", projectName, "Folder:", folderToUse);
          
          // Set upload complete flag
          setIsUploading(false);
          updateOverallProgress();
          
          // Log projects after upload (for debugging)
          logProjects();
          
          // Check project again to verify assets were added
          const updatedProject = getProjectById(projectId);
          if (updatedProject) {
            console.log('Project after upload:', updatedProject);
            console.log(`Project now has ${updatedProject.assets?.length || 0} assets at root level`);
            
            // Check if assets were actually added
            let assetsAdded = false;
            
            // Check root assets
            if (folderToUse === 'root' && updatedProject.assets && updatedProject.assets.length > 0) {
              assetsAdded = true;
            }
            
            // Check folder assets if uploading to a folder
            if (folderToUse !== 'root' && updatedProject.subfolders) {
              const targetFolder = updatedProject.subfolders.find(f => f.id === folderToUse);
              if (targetFolder && targetFolder.assets && targetFolder.assets.length > 0) {
                assetsAdded = true;
                console.log(`Found ${targetFolder.assets.length} assets in folder ${targetFolder.name}`);
              }
            }
            
            if (assetsAdded) {
              // Set upload complete flag
              completeUpload(projectId, projectName, completedFiles);
            } else {
              console.error("No assets were found after upload");
              toast.error("Upload completed but no assets were found. Please try again.");
              setUploadComplete(true);
              setUploadResults({
                success: false,
                count: 0,
                projectId,
                projectName
              });
            }
          } else {
            console.error("Project not found after upload");
            toast.error("Error: Project not found after upload");
            setUploadComplete(true);
            setUploadResults({
              success: false,
              count: 0,
              projectId,
              projectName
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
            projectName
          });
        }
      } else {
        console.log("No completed files to add to project");
        if (hasErrors) {
          toast.error("Upload failed: There were errors processing your files");
        } else {
          toast.warning("No files were uploaded successfully");
        }
        setIsUploading(false);
        setUploadComplete(true);
        setUploadResults({
          success: false,
          count: 0,
          projectId,
          projectName
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`There was a problem with the upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setUploadComplete(true);
      setUploadResults({
        success: false,
        count: 0,
        projectId: projectId || "",
        projectName: projectName || ""
      });
      setIsUploading(false);
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
