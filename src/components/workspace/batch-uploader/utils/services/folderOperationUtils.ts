
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
  for (let i = 0; i < folders.length; i++) {
    if (folders[i].id === targetFolderId) {
      folders[i].assets = [...folders[i].assets, ...assets];
      folders[i].updatedAt = new Date();
      return true;
    }
    
    if (folders[i].subfolders.length > 0) {
      if (addAssetsToFolder(folders[i].subfolders, targetFolderId, assets)) {
        return true;
      }
    }
  }
  return false;
};
