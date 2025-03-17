import { toast } from 'sonner';
import { ProjectAsset } from '../../types/projectTypes';
import { UploadFile } from '../../../types';
import { projects, updateProjects } from '../../data/projectStore';
import { logProjects } from '../../data/store/storageSync';
import { convertFilesToAssets } from '../assetConversionUtils';
import { validateProjectForAssets, ensureProjectStructure } from './projectAssetsValidation';
import { 
  addAssetsToRootFolder, 
  addAssetsToSpecificFolder, 
  createNewFolderWithAssets 
} from './folderAssetOperations';
import { updateProjectCoverIfNeeded } from './coverImageOperations';
import { saveProjectsToLocalStorage } from '../../data/store/storageSync';

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
  
  // Validate project
  const validation = validateProjectForAssets(projectId);
  if (!validation.isValid) {
    return Promise.reject(new Error(`Project not found: ${projectId}`));
  }
  
  const { projectIndex, project } = validation;
  
  // Normalize folder ID (use 'root' if undefined, null or empty string)
  const normalizedFolderId = folderId || 'root';
  console.log(`[assetService] Using normalized folder ID: ${normalizedFolderId}`);
  
  // Convert files to assets
  const assets = convertFilesToAssets(files, licenseType, normalizedFolderId);
  console.log(`[assetService] Converted ${files.length} files to ${assets.length} assets`);
  
  if (assets.length === 0) {
    console.log('[assetService] No completed files to add to project');
    toast.warning('No files were processed successfully');
    return { success: false, count: 0, location: 'none' };
  }
  
  try {
    // Create a deep copy of projects to avoid reference issues
    const updatedProjects = JSON.parse(JSON.stringify(projects));
    
    // Ensure project structure is valid
    ensureProjectStructure(updatedProjects, projectIndex);
    
    // Check if we need to update cover image
    updateProjectCoverIfNeeded(projectIndex, assets, updatedProjects);
    
    let locationAdded = 'root';
    let folderFound = false;
    
    // Add assets to the appropriate location
    if (normalizedFolderId === 'root') {
      // Add to root folder
      addAssetsToRootFolder(updatedProjects, projectIndex, assets);
      folderFound = true;
      locationAdded = 'root';
    } else {
      // Try to add to specified folder
      const result = addAssetsToSpecificFolder(updatedProjects, projectIndex, normalizedFolderId, assets);
      folderFound = result.folderFound;
      locationAdded = result.locationAdded;
      
      // If folder still not found, create a new one
      if (!folderFound) {
        const newFolderResult = createNewFolderWithAssets(updatedProjects, projectIndex, normalizedFolderId, assets);
        folderFound = newFolderResult.folderFound;
        locationAdded = newFolderResult.locationAdded;
      }
    }
    
    // Update the project timestamp
    updatedProjects[projectIndex].updatedAt = new Date();
    
    // Update the global projects store with the new projects array
    updateProjects(updatedProjects);
    
    // Save to localStorage using our improved serialization
    saveProjectsToLocalStorage();
    
    console.log(`[assetService] Added ${assets.length} files to project ${projectId}`);
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
