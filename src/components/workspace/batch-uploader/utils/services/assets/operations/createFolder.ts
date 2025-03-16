
import { toast } from 'sonner';
import { ProjectAsset } from '../../../types/projectTypes';

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
  console.log(`[CRITICAL] [folderOperations] Creating new folder: ${folderId}`);
  
  // Create a safe folder ID and name
  const safeFolderId = folderId.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
  const folderName = folderId;
  
  console.log(`[CRITICAL] [folderOperations] Creating new folder: ${folderName} (${safeFolderId})`);
  
  // Make sure all assets have the folderId field set
  const assetsWithFolder = assets.map(asset => ({
    ...asset,
    folderId: safeFolderId,
    folderName: folderName
  }));
  
  // Log all assets being added to the new folder
  console.log(`[CRITICAL] [folderOperations] Assets being added to new folder "${folderName}":`);
  assetsWithFolder.forEach((asset, index) => {
    console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
  });
  
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
  
  // Update localStorage immediately
  try {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    console.log(`[CRITICAL] [folderOperations] Updated localStorage after creating new folder`);
  } catch (e) {
    console.error(`[folderOperations] Error saving to localStorage:`, e);
  }
  
  toast.success(`Created new folder "${folderName}" and added ${assets.length} files`);
  
  return { folderFound: true, locationAdded: safeFolderId };
};
