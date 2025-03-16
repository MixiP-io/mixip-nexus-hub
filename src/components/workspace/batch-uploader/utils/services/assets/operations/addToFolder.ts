
import { toast } from 'sonner';
import { ProjectAsset } from '../../../types/projectTypes';

/**
 * Handle adding assets to a specific folder
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
  console.log(`[CRITICAL] [folderOperations] Looking for folder with ID: ${normalizedFolderId}`);
  let folderFound = false;
  let locationAdded = normalizedFolderId;
  
  // Debug folder names
  if (updatedProjects[projectIndex].subfolders) {
    console.log(`[folderOperations] Project has ${updatedProjects[projectIndex].subfolders.length} subfolders`);
    updatedProjects[projectIndex].subfolders.forEach((folder: any) => {
      console.log(`[folderOperations] Available folder: ${folder.name} (${folder.id})`);
    });
  }
  
  // Direct exact match first
  if (updatedProjects[projectIndex].subfolders) {
    const folderIndex = updatedProjects[projectIndex].subfolders.findIndex(
      (folder: any) => folder.id === normalizedFolderId
    );
    
    if (folderIndex !== -1) {
      console.log(`[CRITICAL] [folderOperations] Found exact folder match with ID: ${normalizedFolderId} at index ${folderIndex}`);
      const folder = updatedProjects[projectIndex].subfolders[folderIndex];
      
      // Initialize assets array if it doesn't exist
      if (!Array.isArray(folder.assets)) {
        console.log(`[CRITICAL] [folderOperations] Initializing assets array for folder: ${folder.name}`);
        updatedProjects[projectIndex].subfolders[folderIndex].assets = [];
      }
      
      // Add assets to folder
      console.log(`[CRITICAL] [folderOperations] Adding ${assets.length} assets to folder ${folder.name}`);
      console.log(`[folderOperations] Before: Folder has ${updatedProjects[projectIndex].subfolders[folderIndex].assets?.length || 0} assets`);
      
      // Make sure all assets have the folderId field set correctly
      const assetsWithFolder = assets.map(asset => ({
        ...asset,
        folderId: normalizedFolderId,
        folderName: folder.name // Add folder name for easy reference
      }));
      
      // Log all assets being added for debugging
      console.log(`[CRITICAL] [folderOperations] Assets being added to folder "${folder.name}":`);
      assetsWithFolder.forEach((asset, index) => {
        console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
      });
      
      // Add the assets to the folder
      if (!updatedProjects[projectIndex].subfolders[folderIndex].assets) {
        updatedProjects[projectIndex].subfolders[folderIndex].assets = [];
      }
      
      updatedProjects[projectIndex].subfolders[folderIndex].assets = [
        ...updatedProjects[projectIndex].subfolders[folderIndex].assets,
        ...assetsWithFolder
      ];
      
      updatedProjects[projectIndex].subfolders[folderIndex].updatedAt = new Date();
      
      console.log(`[CRITICAL] [folderOperations] After: Folder has ${updatedProjects[projectIndex].subfolders[folderIndex].assets.length} assets`);
      
      // Log some assets after adding for verification
      const sampleAssets = updatedProjects[projectIndex].subfolders[folderIndex].assets.slice(0, 3);
      console.log(`[CRITICAL] [folderOperations] Sample assets after adding:`, JSON.stringify(sampleAssets, null, 2));
      
      folderFound = true;
      locationAdded = updatedProjects[projectIndex].subfolders[folderIndex].id;
      
      // Update localStorage immediately
      try {
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        console.log(`[CRITICAL] [folderOperations] Updated localStorage after adding assets to folder`);
      } catch (e) {
        console.error(`[folderOperations] Error saving to localStorage:`, e);
      }
    }
  }
  
  return { folderFound, locationAdded };
};
