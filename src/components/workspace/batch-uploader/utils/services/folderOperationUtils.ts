
import { toast } from 'sonner';
import { ProjectAsset, ProjectFolder } from '../types/projectTypes';

/**
 * Add assets to a specific folder recursively
 * @param folders - Array of folders to search in
 * @param targetFolderId - ID of the folder to add assets to
 * @param assets - Assets to add to the folder
 * @returns Boolean indicating if the folder was found and assets were added
 */
export const addAssetsToFolder = (
  folders: ProjectFolder[],
  targetFolderId: string,
  assets: ProjectAsset[]
): boolean => {
  if (!folders || !Array.isArray(folders)) {
    console.log('No folders provided or folders is not an array');
    return false;
  }
  
  // Debug the input parameters
  console.log(`Attempting to add ${assets.length} assets to folder ID: ${targetFolderId}`);
  console.log(`Searching through ${folders.length} folders`);
  
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    
    // Check if the folder is valid
    if (!folder || typeof folder !== 'object') {
      console.log(`Invalid folder at index ${i}`);
      continue;
    }
    
    // Debug each folder being checked
    console.log(`Checking folder: ${folder.name} (${folder.id})`);
    
    if (folder.id === targetFolderId) {
      console.log(`Found folder ${folder.name} (${folder.id}). Adding ${assets.length} assets.`);
      
      // Initialize assets array if it doesn't exist
      if (!folder.assets) {
        folder.assets = [];
      } else if (!Array.isArray(folder.assets)) {
        console.log(`Folder's assets property is not an array, initializing it`);
        folder.assets = [];
      }
      
      // Add the assets
      folder.assets = [...folder.assets, ...assets];
      folder.updatedAt = new Date();
      
      console.log(`Folder ${folder.name} now has ${folder.assets.length} assets`);
      toast.success(`Added ${assets.length} files to folder "${folder.name}"`);
      return true;
    }
    
    // Check subfolders recursively
    if (folder.subfolders && Array.isArray(folder.subfolders) && folder.subfolders.length > 0) {
      console.log(`Checking ${folder.subfolders.length} subfolders of ${folder.name}`);
      if (addAssetsToFolder(folder.subfolders, targetFolderId, assets)) {
        return true;
      }
    }
  }
  
  console.log(`Folder ${targetFolderId} not found in the provided folders`);
  return false;
};
