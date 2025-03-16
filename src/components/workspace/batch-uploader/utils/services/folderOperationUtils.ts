
import { ProjectAsset } from '../types/projectTypes';

/**
 * Recursively add assets to a folder in a project
 * @param folders - Array of folders to search for the target folder
 * @param targetFolderId - ID of the folder to add assets to
 * @param assets - Array of assets to add to the folder
 * @returns Boolean indicating if the folder was found and assets were added
 */
export const addAssetsToFolder = (
  folders: any[] = [], 
  targetFolderId: string, 
  assets: ProjectAsset[]
): boolean => {
  if (!Array.isArray(folders) || folders.length === 0 || !targetFolderId) {
    console.log(`[folderOperationUtils] Invalid input: folders=${!!folders}, targetFolderId=${targetFolderId}`);
    return false;
  }
  
  console.log(`[folderOperationUtils] Looking for folder ${targetFolderId} in ${folders.length} folders`);
  
  // Check for exact ID match first
  for (const folder of folders) {
    if (folder.id === targetFolderId) {
      console.log(`[folderOperationUtils] Found folder (exact match): ${folder.name} (${folder.id})`);
      
      // Initialize assets array if not present
      if (!Array.isArray(folder.assets)) {
        folder.assets = [];
      }
      
      // Add assets to the folder
      folder.assets = [...folder.assets, ...assets];
      folder.updatedAt = new Date();
      
      console.log(`[folderOperationUtils] Added ${assets.length} assets to folder ${folder.name}, now has ${folder.assets.length} assets`);
      return true;
    }
  }
  
  // If no exact match is found, try case-insensitive name matching
  const targetFolderLower = targetFolderId.toLowerCase();
  for (const folder of folders) {
    const folderIdLower = folder.id.toLowerCase();
    const folderNameLower = folder.name?.toLowerCase() || '';
    
    // Check for similar ID or name match
    if (folderIdLower === targetFolderLower || folderNameLower === targetFolderLower) {
      console.log(`[folderOperationUtils] Found folder (case-insensitive match): ${folder.name} (${folder.id})`);
      
      // Initialize assets array if not present
      if (!Array.isArray(folder.assets)) {
        folder.assets = [];
      }
      
      // Add assets to the folder
      folder.assets = [...folder.assets, ...assets];
      folder.updatedAt = new Date();
      
      console.log(`[folderOperationUtils] Added ${assets.length} assets to folder ${folder.name}, now has ${folder.assets.length} assets`);
      return true;
    }
  }
  
  // No match found at this level, search recursively in subfolders
  for (const folder of folders) {
    if (Array.isArray(folder.subfolders) && folder.subfolders.length > 0) {
      console.log(`[folderOperationUtils] Checking subfolders of ${folder.name}`);
      
      const found = addAssetsToFolder(folder.subfolders, targetFolderId, assets);
      if (found) {
        return true;
      }
    }
  }
  
  console.log(`[folderOperationUtils] Folder ${targetFolderId} not found in any level`);
  return false;
};
