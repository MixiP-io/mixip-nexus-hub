
import { toast } from 'sonner';
import { ProjectAsset } from '../types/projectTypes';
import { UploadFile } from '../../types';
import { projects, updateProjects, logProjects } from '../data/projectStore';
import { convertFilesToAssets } from './assetConversionUtils';
import { findProject, updateProjectCoverIfNeeded, findAssetInProject } from './projectOperationUtils';
import { addAssetsToFolder } from './folderOperationUtils';

/**
 * Add files to a project
 * @param projectId - ID of the project to add files to
 * @param files - Files to add to the project
 * @param licenseType - License type to apply to the assets
 * @param folderId - ID of the folder to add files to
 * @returns Promise that resolves when files are added
 */
export const addFilesToProject = async (
  projectId: string, 
  files: UploadFile[],
  licenseType: string = 'standard',
  folderId: string = 'root'
): Promise<void> => {
  console.log(`Adding files to project: ${projectId}, folder: ${folderId}, license: ${licenseType}`);
  console.log(`Files count: ${files.length}`);
  
  // Find the project
  const projectData = findProject(projectId);
  if (!projectData) {
    console.error(`Project not found: ${projectId}`);
    toast.error(`Project not found: ${projectId}`);
    return Promise.reject(new Error(`Project not found: ${projectId}`));
  }
  
  const { projectIndex, project } = projectData;
  console.log(`Project found at index ${projectIndex}: ${project.name}`);
  
  // Convert files to assets
  const assets = convertFilesToAssets(files, licenseType, folderId);
  console.log(`Converted ${files.length} files to ${assets.length} assets`);
  
  if (assets.length === 0) {
    console.log('No completed files to add to project');
    return Promise.resolve();
  }
  
  // Create a deep copy of projects to avoid reference issues
  const updatedProjects = JSON.parse(JSON.stringify(projects));
  
  // Ensure the project has an assets array
  if (!updatedProjects[projectIndex].assets) {
    console.log('Initializing assets array for project');
    updatedProjects[projectIndex].assets = [];
  }
  
  // Check if we need to update cover image
  updateProjectCoverIfNeeded(projectIndex, assets, updatedProjects);
  
  // If adding to root folder
  if (folderId === 'root') {
    // Update the project with new assets
    console.log(`Adding ${assets.length} assets to project ${projectId} root folder`);
    console.log(`Project has ${updatedProjects[projectIndex].assets.length} existing assets`);
    
    updatedProjects[projectIndex].assets = [
      ...updatedProjects[projectIndex].assets, 
      ...assets
    ];
    
    console.log(`Project now has ${updatedProjects[projectIndex].assets.length} assets`);
  } else {
    // Try to add assets to the specified folder
    const folderFound = addAssetsToFolder(
      updatedProjects[projectIndex].subfolders, 
      folderId, 
      assets
    );
    
    if (!folderFound) {
      // If folder not found, add to project root
      console.log(`Folder ${folderId} not found, adding to project root instead`);
      updatedProjects[projectIndex].assets = [
        ...updatedProjects[projectIndex].assets, 
        ...assets
      ];
      toast.warning(`Folder not found, added to project root`);
    }
  }
  
  // Update the project timestamp
  updatedProjects[projectIndex].updatedAt = new Date();
  
  // Update the global projects store with the new projects array
  updateProjects(updatedProjects);
  console.log(`Added ${assets.length} files to project ${projectId}`);
  console.log(`Project now has ${updatedProjects[projectIndex].assets.length} assets at root level`);
  
  // Debug project data after update
  console.log(`Project data after update:`, JSON.stringify(updatedProjects[projectIndex], null, 2));
  
  toast.success(`Added ${assets.length} files to project`);
  logProjects(); // Log the updated projects for debugging
  
  return Promise.resolve();
};

/**
 * Set a project's cover image
 * @param projectId - ID of the project to update
 * @param assetId - ID of the asset to use as cover image
 * @returns Boolean indicating if the cover image was set
 */
export const setProjectCoverImage = (projectId: string, assetId: string): boolean => {
  const projectData = findProject(projectId);
  
  if (!projectData) {
    return false;
  }
  
  const { projectIndex, project } = projectData;
  
  // Find the asset in the project
  const targetAsset = findAssetInProject(project, assetId);
  
  if (!targetAsset) {
    toast.error(`Asset not found in project`);
    return false;
  }
  
  // Update the project with the new cover image
  const updatedProjects = [...projects];
  updatedProjects[projectIndex].coverImage = targetAsset.preview;
  updatedProjects[projectIndex].updatedAt = new Date();
  
  updateProjects(updatedProjects);
  toast.success(`Project cover image updated`);
  
  return true;
};
