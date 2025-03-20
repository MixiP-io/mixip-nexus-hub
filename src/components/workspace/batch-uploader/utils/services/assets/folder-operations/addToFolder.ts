
import { toast } from 'sonner';
import { ProjectAsset } from '../../../types/projectTypes';
import { saveProjectsToLocalStorage } from '../../../data/store/storageSync';

/**
 * Add assets to a specific folder in a project
 * @param updatedProjects - The array of projects to update
 * @param projectIndex - Index of the project in the array
 * @param normalizedFolderId - Normalized folder ID
 * @param assets - Assets to add
 * @returns Object containing success status and location where assets were added
 */
export const addAssetsToSpecificFolder = (
  updatedProjects: any[],
  projectIndex: number,
  normalizedFolderId: string,
  assets: ProjectAsset[]
): { folderFound: boolean; locationAdded: string } => {
  console.log(`[folderAssetOperations] Looking for folder with ID: ${normalizedFolderId}`);
  let folderFound = false;
  let locationAdded = normalizedFolderId;
  
  // Debug folder names
  if (updatedProjects[projectIndex].subfolders) {
    console.log(`[folderAssetOperations] Project has ${updatedProjects[projectIndex].subfolders.length} subfolders`);
    updatedProjects[projectIndex].subfolders.forEach((folder: any) => {
      console.log(`[folderAssetOperations] Available folder: ${folder.name} (${folder.id})`);
    });
  }
  
  // Direct exact match first
  if (updatedProjects[projectIndex].subfolders) {
    const folderIndex = updatedProjects[projectIndex].subfolders.findIndex(
      (folder: any) => folder.id === normalizedFolderId
    );
    
    if (folderIndex !== -1) {
      console.log(`[folderAssetOperations] Found exact folder match with ID: ${normalizedFolderId} at index ${folderIndex}`);
      const folder = updatedProjects[projectIndex].subfolders[folderIndex];
      
      // Initialize assets array if it doesn't exist
      if (!Array.isArray(folder.assets)) {
        console.log(`[folderAssetOperations] Initializing assets array for folder: ${folder.name}`);
        updatedProjects[projectIndex].subfolders[folderIndex].assets = [];
      }
      
      // Add assets to folder
      console.log(`[folderAssetOperations] Adding ${assets.length} assets to folder ${folder.name}`);
      console.log(`[folderAssetOperations] Before: Folder has ${updatedProjects[projectIndex].subfolders[folderIndex].assets?.length || 0} assets`);
      
      // Make sure all assets have the folderId field set correctly
      const assetsWithFolder = assets.map(asset => ({
        ...asset,
        folderId: normalizedFolderId,
        folderName: folder.name // Add folder name for easy reference
      }));
      
      // Add the assets to the folder
      updatedProjects[projectIndex].subfolders[folderIndex].assets = [
        ...updatedProjects[projectIndex].subfolders[folderIndex].assets || [],
        ...assetsWithFolder
      ];
      
      updatedProjects[projectIndex].subfolders[folderIndex].updatedAt = new Date();
      
      console.log(`[folderAssetOperations] After: Folder has ${updatedProjects[projectIndex].subfolders[folderIndex].assets.length} assets`);
      
      folderFound = true;
      locationAdded = folder.name;
      
      // Also add reference assets to root for backup access
      if (!Array.isArray(updatedProjects[projectIndex].assets)) {
        updatedProjects[projectIndex].assets = [];
      }
      
      // Create reference copies that point to the folder
      const referenceAssets = assetsWithFolder.map(asset => ({
        ...asset,
        isReference: true // Mark as reference to avoid duplication in UI
      }));
      
      // Add references to root
      updatedProjects[projectIndex].assets = [
        ...updatedProjects[projectIndex].assets,
        ...referenceAssets
      ];
      
      console.log(`[folderAssetOperations] Added ${referenceAssets.length} reference assets to project root as well`);
      
      // Update localStorage immediately
      saveProjectsToLocalStorage();
      console.log(`[folderAssetOperations] Updated localStorage after adding assets to folder`);
    }
  }
  
  return { folderFound, locationAdded };
};
