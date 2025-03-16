
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { simulateFileUpload } from '../../utils/uploadUtils';
import { addFilesToProject, getProjectById, logProjects } from '../../utils/projectUtils';

/**
 * Hook for managing the upload process logic
 */
export const useUploadProcess = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  // Function to set upload complete and handle final steps
  const completeUpload = useCallback((
    selectedProject: string, 
    selectedProjectName: string, 
    completedFiles: UploadFile[]
  ) => {
    console.log("Setting uploadComplete state to true");
    setUploadComplete(true);
    
    // Debug the project state after upload
    const project = getProjectById(selectedProject);
    if (project) {
      console.log(`Project ${project.name} now has ${project.assets?.length || 0} assets at root level`);
      
      // Show a confirmation toast here too for redundancy
      toast.success(`Upload complete! ${completedFiles.length} files added to ${project.name}`);
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
    updateFileStatus: (fileId: string, status: any) => void,
    updateOverallProgress: () => void,
  ) => {
    console.log(`Starting upload process to project: ${projectId}, folder: ${folderId}`);
    setIsUploading(true);
    setUploadComplete(false);
    
    updateOverallProgress(); // Calculate initial progress
    
    try {
      // Process files one by one
      for (const file of files) {
        // Only process queued files
        if (file.status !== 'queued') continue;
        
        // Simulate upload - in a real app, replace with actual API calls
        await simulateFileUpload(file.id, updateFileProgress);
        
        // Mark as processing
        updateFileStatus(file.id, 'processing');
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mark as complete
        updateFileStatus(file.id, 'complete');
        
        // Update overall progress after each file
        updateOverallProgress();
      }
      
      // Add files to project after processing all files
      const completedFiles = files.filter(f => f.status === 'complete');
      console.log(`Completed files: ${completedFiles.length}`);
      
      if (completedFiles.length > 0) {
        console.log(`Adding ${completedFiles.length} files to project ${projectId}`);
        await addFilesToProject(projectId, completedFiles, licenseType, folderId);
        
        console.log("Upload complete, setting uploadComplete to true");
        console.log("Project:", projectId, "Project name:", projectName, "Folder:", folderId);
        
        // Log projects after upload (for debugging)
        logProjects();
        
        // Check project again to verify assets were added
        const updatedProject = getProjectById(projectId);
        if (updatedProject) {
          console.log(`Project after upload: ${updatedProject.name} with ${updatedProject.assets?.length || 0} assets`);
          
          // Ensure all state is updated correctly after upload
          setIsUploading(false);
          updateOverallProgress();
          
          // Set upload complete flag
          completeUpload(projectId, projectName, completedFiles);
        } else {
          console.error("Updated project not found after upload");
          toast.error("Error: Could not verify upload completed");
          setIsUploading(false);
        }
      } else {
        console.log("No completed files to add to project");
        toast.warning("No files were uploaded successfully");
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('There was a problem with the upload');
      setUploadComplete(false);
      setIsUploading(false);
    } finally {
      // Force a final update to overall progress
      updateOverallProgress();
    }
  };
  
  return {
    isUploading,
    uploadComplete,
    setUploadComplete,
    processUpload
  };
};
