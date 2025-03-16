
import { toast } from 'sonner';
import { ProjectAsset } from '../types/projectTypes';
import { UploadFile } from '../../types';
import { projects, updateProjects, logProjects, ensureProjectDataIntegrity } from '../data/projectStore';
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
  console.log(`[assetService] Adding files to project: ${projectId}, folder: ${folderId}, license: ${licenseType}`);
  console.log(`[assetService] Files count: ${files.length}`);
  
  // Force an integrity check before proceeding
  ensureProjectDataIntegrity();
  
  // Normalize folder ID (use 'root' if undefined, null or empty string)
  const normalizedFolderId = folderId || 'root';
  console.log(`[assetService] Using normalized folder ID: ${normalizedFolderId}`);
  
  // Find the project
  const projectData = findProject(projectId);
  if (!projectData) {
    console.error(`[assetService] Project not found: ${projectId}`);
    toast.error(`Project not found: ${projectId}`);
    return Promise.reject(new Error(`Project not found: ${projectId}`));
  }
  
  const { projectIndex, project } = projectData;
  console.log(`[assetService] Project found at index ${projectIndex}: ${project.name}`);
  
  // Convert files to assets
  const assets = convertFilesToAssets(files, licenseType, normalizedFolderId);
  console.log(`[assetService] Converted ${files.length} files to ${assets.length} assets`);
  
  if (assets.length === 0) {
    console.log('[assetService] No completed files to add to project');
    toast.warning('No files were processed successfully');
    return Promise.resolve();
  }
  
  // Create a deep copy of projects to avoid reference issues
  const updatedProjects = JSON.parse(JSON.stringify(projects));
  
  // Ensure project is properly structured before proceeding
  if (!updatedProjects[projectIndex]) {
    console.error('[assetService] Project index is invalid');
    toast.error('Internal error: Project not found at index');
    return Promise.reject(new Error('Project index is invalid'));
  }
  
  // Double-check that arrays are properly initialized
  if (!Array.isArray(updatedProjects[projectIndex].assets)) {
    console.log('[assetService] Initializing assets array for project');
    updatedProjects[projectIndex].assets = [];
  }
  
  if (!Array.isArray(updatedProjects[projectIndex].subfolders)) {
    console.log('[assetService] Initializing subfolders array for project');
    updatedProjects[projectIndex].subfolders = [];
  }
  
  // Check if we need to update cover image
  updateProjectCoverIfNeeded(projectIndex, assets, updatedProjects);
  
  // If adding to root folder
  if (normalizedFolderId === 'root') {
    // Update the project with new assets
    console.log(`[assetService] Adding ${assets.length} assets to project ${projectId} root folder`);
    console.log(`[assetService] Project has ${updatedProjects[projectIndex].assets.length} existing assets`);
    
    // Ensure assets array exists
    if (!Array.isArray(updatedProjects[projectIndex].assets)) {
      updatedProjects[projectIndex].assets = [];
    }
    
    // Add new assets to the project's assets array
    updatedProjects[projectIndex].assets = [
      ...updatedProjects[projectIndex].assets, 
      ...assets
    ];
    
    console.log(`[assetService] Project now has ${updatedProjects[projectIndex].assets.length} assets`);
    toast.success(`Added ${assets.length} files to project root folder`);
  } else {
    // Try to add assets to the specified folder
    const folderFound = addAssetsToFolder(
      updatedProjects[projectIndex].subfolders, 
      normalizedFolderId, 
      assets
    );
    
    if (!folderFound) {
      // If folder not found, add to project root
      console.log(`[assetService] Folder ${normalizedFolderId} not found, adding to project root instead`);
      
      // Ensure assets array exists
      if (!Array.isArray(updatedProjects[projectIndex].assets)) {
        updatedProjects[projectIndex].assets = [];
      }
      
      updatedProjects[projectIndex].assets = [
        ...updatedProjects[projectIndex].assets, 
        ...assets
      ];
      toast.warning(`Folder "${normalizedFolderId}" not found, added files to project root instead`);
    } else {
      toast.success(`Added ${assets.length} files to folder successfully`);
    }
  }
  
  // Update the project timestamp
  updatedProjects[projectIndex].updatedAt = new Date();
  
  try {
    // Update the global projects store with the new projects array
    updateProjects(updatedProjects);
    console.log(`[assetService] Added ${assets.length} files to project ${projectId}`);
    console.log(`[assetService] Project now has ${updatedProjects[projectIndex].assets.length} assets at root level`);
    
    // Debug project data after update
    console.log(`[assetService] Project data after update:`, updatedProjects[projectIndex]);
    
    logProjects(); // Log the updated projects for debugging
    
    return Promise.resolve();
  } catch (error) {
    console.error('[assetService] Error updating projects:', error);
    toast.error('Failed to update project with new files');
    return Promise.reject(error);
  }
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
