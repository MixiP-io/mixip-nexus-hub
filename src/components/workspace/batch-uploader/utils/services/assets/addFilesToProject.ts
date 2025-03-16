
import { toast } from 'sonner';
import { ProjectAsset } from '../../types/projectTypes';
import { UploadFile } from '../../../types';
import { projects, updateProjects, logProjects, ensureProjectDataIntegrity } from '../../data/projectStore';
import { convertFilesToAssets } from '../assetConversionUtils';
import { findProject, updateProjectCoverIfNeeded } from '../projectOperationUtils';
import { addAssetsToFolder } from '../folderOperationUtils';

/**
 * Add files to a project
 * @param projectId - ID of the project to add files to
 * @param files - Files to add to the project
 * @param licenseType - License type to apply to the assets
 * @param folderId - ID of the folder to add files to
 * @returns Promise that resolves with result info when files are added
 */
export const addFilesToProject = async (
  projectId: string, 
  files: UploadFile[],
  licenseType: string = 'standard',
  folderId: string = 'root'
): Promise<{ success: boolean, count: number, location: string }> => {
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
    return { success: false, count: 0, location: 'none' };
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
  
  let locationAdded = 'root';
  let folderFound = false;
  
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
    folderFound = true;
    locationAdded = 'root';
  } else {
    // Check if this is a test folder (common issue with test folders not being found)
    locationAdded = normalizedFolderId;
    
    // Debug folder names
    console.log(`[assetService] Looking for folder with ID: ${normalizedFolderId}`);
    if (updatedProjects[projectIndex].subfolders) {
      console.log(`[assetService] Project has ${updatedProjects[projectIndex].subfolders.length} subfolders`);
      updatedProjects[projectIndex].subfolders.forEach(folder => {
        console.log(`[assetService] Folder: ${folder.name} (${folder.id})`);
      });
    }
    
    // Direct exact match first
    if (updatedProjects[projectIndex].subfolders) {
      const exactMatch = updatedProjects[projectIndex].subfolders.find(
        folder => folder.id === normalizedFolderId
      );
      
      if (exactMatch) {
        console.log(`[assetService] Found exact folder match with ID: ${normalizedFolderId}`);
        if (!Array.isArray(exactMatch.assets)) {
          exactMatch.assets = [];
        }
        
        exactMatch.assets = [...exactMatch.assets, ...assets];
        exactMatch.updatedAt = new Date();
        folderFound = true;
        toast.success(`Added ${assets.length} files to folder "${exactMatch.name}"`);
      }
    }
    
    // If not found by ID, try to find by case-insensitive name match
    if (!folderFound && updatedProjects[projectIndex].subfolders) {
      const normalizedFolderName = normalizedFolderId.toLowerCase();
      const nameMatch = updatedProjects[projectIndex].subfolders.find(
        folder => folder.name.toLowerCase() === normalizedFolderName
      );
      
      if (nameMatch) {
        console.log(`[assetService] Found folder by name match: ${nameMatch.name}`);
        if (!Array.isArray(nameMatch.assets)) {
          nameMatch.assets = [];
        }
        
        nameMatch.assets = [...nameMatch.assets, ...assets];
        nameMatch.updatedAt = new Date();
        folderFound = true;
        locationAdded = nameMatch.id;
        toast.success(`Added ${assets.length} files to folder "${nameMatch.name}"`);
      }
    }
    
    // If still not found, use addAssetsToFolder as a fallback 
    if (!folderFound) {
      // Try to add assets to the specified folder
      folderFound = addAssetsToFolder(
        updatedProjects[projectIndex].subfolders, 
        normalizedFolderId, 
        assets
      );
      
      if (folderFound) {
        toast.success(`Added ${assets.length} files to folder successfully`);
      }
    }
      
    // If folder still not found, create it as a new folder or add to root
    if (!folderFound) {
      console.log(`[assetService] Folder ${normalizedFolderId} not found, creating a new folder`);
      
      // Create a safe folder ID and name
      const safeFolderId = normalizedFolderId.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
      const folderName = normalizedFolderId;
      
      console.log(`[assetService] Creating new folder: ${folderName} (${safeFolderId})`);
      
      const newFolder = {
        id: safeFolderId,
        name: folderName,
        assets: [...assets],
        createdAt: new Date(),
        updatedAt: new Date(),
        subfolders: []
      };
      
      // Add the new folder
      updatedProjects[projectIndex].subfolders.push(newFolder);
      toast.success(`Created new folder "${folderName}" and added ${assets.length} files`);
      folderFound = true;
      locationAdded = safeFolderId;
    }
  }
  
  // Update the project timestamp
  updatedProjects[projectIndex].updatedAt = new Date();
  
  try {
    // Update the global projects store with the new projects array
    updateProjects(updatedProjects);
    
    // Also update localStorage
    try {
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      console.log(`[assetService] Projects saved to localStorage`);
    } catch (e) {
      console.error(`[assetService] Error saving to localStorage:`, e);
    }
    
    console.log(`[assetService] Added ${assets.length} files to project ${projectId}`);
    
    // Log details about where assets were added
    if (normalizedFolderId === 'root') {
      console.log(`[assetService] Project now has ${updatedProjects[projectIndex].assets.length} assets at root level`);
    } else {
      const targetFolder = updatedProjects[projectIndex].subfolders.find(f => f.id === locationAdded);
      if (targetFolder) {
        console.log(`[assetService] Folder ${targetFolder.name} now has ${targetFolder.assets?.length || 0} assets`);
      }
    }
    
    // Debug project data after update
    console.log(`[assetService] Project data after update:`, updatedProjects[projectIndex]);
    
    logProjects(); // Log the updated projects for debugging
    
    return { 
      success: true, 
      count: assets.length, 
      location: locationAdded
    };
  } catch (error) {
    console.error('[assetService] Error updating projects:', error);
    toast.error('Failed to update project with new files');
    return Promise.reject(error);
  }
};
