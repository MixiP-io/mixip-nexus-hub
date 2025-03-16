
import { ProjectAsset } from '../types/projectTypes';

/**
 * Add assets to a specific folder recursively
 * @param folders - Array of folders to search in
 * @param targetFolderId - ID of the folder to add assets to
 * @param assets - Assets to add to the folder
 * @returns Boolean indicating if the folder was found and assets were added
 */
export const addAssetsToFolder = (
  folders: any[],
  targetFolderId: string,
  assets: ProjectAsset[]
): boolean => {
  if (!folders || !Array.isArray(folders)) {
    console.log('No folders provided or folders is not an array');
    return false;
  }
  
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    
    if (folder.id === targetFolderId) {
      console.log(`Found folder ${folder.name} (${folder.id}). Adding ${assets.length} assets.`);
      
      // Initialize assets array if it doesn't exist
      if (!folder.assets || !Array.isArray(folder.assets)) {
        folder.assets = [];
      }
      
      folder.assets = [...folder.assets, ...assets];
      folder.updatedAt = new Date();
      
      console.log(`Folder now has ${folder.assets.length} assets`);
      return true;
    }
    
    // Check subfolders recursively
    if (folder.subfolders && folder.subfolders.length > 0) {
      if (addAssetsToFolder(folder.subfolders, targetFolderId, assets)) {
        return true;
      }
    }
  }
  
  console.log(`Folder ${targetFolderId} not found in the provided folders`);
  return false;
};
