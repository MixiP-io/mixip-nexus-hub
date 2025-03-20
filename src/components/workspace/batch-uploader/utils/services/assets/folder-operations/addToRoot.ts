
import { ProjectAsset } from '../../../types/projectTypes';
import { saveProjectsToLocalStorage } from '../../../data/store/storageSync';

/**
 * Add assets to project root folder
 * @param updatedProjects - The array of projects to update
 * @param projectIndex - Index of the project in the array
 * @param assets - Assets to add
 * @returns The updated projects array
 */
export const addAssetsToRootFolder = (
  updatedProjects: any[],
  projectIndex: number,
  assets: ProjectAsset[]
): any[] => {
  console.log(`[folderAssetOperations] Adding ${assets.length} assets to project root folder`);
  console.log(`[folderAssetOperations] Project has ${updatedProjects[projectIndex].assets?.length || 0} existing assets`);
  
  // Ensure assets array exists
  if (!Array.isArray(updatedProjects[projectIndex].assets)) {
    updatedProjects[projectIndex].assets = [];
  }
  
  // Make sure all assets have root folderId
  const assetsWithFolder = assets.map(asset => ({
    ...asset,
    folderId: 'root'
  }));
  
  // Add new assets to the project's assets array
  updatedProjects[projectIndex].assets = [
    ...updatedProjects[projectIndex].assets, 
    ...assetsWithFolder
  ];
  
  console.log(`[folderAssetOperations] Project now has ${updatedProjects[projectIndex].assets.length} assets`);
  
  // Update localStorage immediately
  saveProjectsToLocalStorage();
  console.log(`[folderAssetOperations] Updated localStorage after adding assets to root folder`);
  
  return updatedProjects;
};
