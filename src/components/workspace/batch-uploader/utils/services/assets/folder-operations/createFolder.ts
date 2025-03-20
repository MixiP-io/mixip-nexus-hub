
import { toast } from 'sonner';
import { ProjectAsset } from '../../../types/projectTypes';
import { saveProjectsToLocalStorage } from '../../../data/store/storageSync';

/**
 * Create a new folder and add assets to it
 * @param updatedProjects - The array of projects to update
 * @param projectIndex - Index of the project in the array 
 * @param folderId - Folder ID to create
 * @param assets - Assets to add to the new folder
 * @returns Object containing success status and the ID of the created folder
 */
export const createNewFolderWithAssets = (
  updatedProjects: any[],
  projectIndex: number,
  folderId: string,
  assets: ProjectAsset[]
): { folderFound: boolean; locationAdded: string } => {
  console.log(`[folderAssetOperations] Creating new folder: ${folderId}`);
  
  // Create a safe folder ID and name
  const safeFolderId = folderId.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
  const folderName = folderId;
  
  console.log(`[folderAssetOperations] Creating new folder: ${folderName} (${safeFolderId})`);
  
  // Make sure all assets have the folderId field set
  const assetsWithFolder = assets.map(asset => ({
    ...asset,
    folderId: safeFolderId,
    folderName: folderName
  }));
  
  const newFolder = {
    id: safeFolderId,
    name: folderName,
    assets: assetsWithFolder,
    createdAt: new Date(),
    updatedAt: new Date(),
    subfolders: []
  };
  
  // Add the new folder
  if (!Array.isArray(updatedProjects[projectIndex].subfolders)) {
    updatedProjects[projectIndex].subfolders = [];
  }
  
  updatedProjects[projectIndex].subfolders.push(newFolder);
  
  // Also add reference assets to root for backup access
  if (!Array.isArray(updatedProjects[projectIndex].assets)) {
    updatedProjects[projectIndex].assets = [];
  }
  
  // Create reference copies that point to the folder
  const referenceAssets = assetsWithFolder.map(asset => ({
    ...asset,
    isReference: true // Mark as reference to avoid duplication in UI
  }));
  
  // Add them to the root
  updatedProjects[projectIndex].assets = [
    ...updatedProjects[projectIndex].assets,
    ...referenceAssets
  ];
  
  console.log(`[folderAssetOperations] Adding ${referenceAssets.length} reference assets to project root as well`);
  
  // Update localStorage immediately
  saveProjectsToLocalStorage();
  console.log(`[folderAssetOperations] Updated localStorage after creating new folder`);
  
  toast.success(`Created new folder "${folderName}" and added ${assets.length} files`);
  
  return { folderFound: true, locationAdded: folderName };
};
