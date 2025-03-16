
import { ProjectAsset } from '../../../types/projectTypes';

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
  console.log(`[CRITICAL] [folderOperations] Adding ${assets.length} assets to project root folder`);
  console.log(`[folderOperations] Project has ${updatedProjects[projectIndex].assets?.length || 0} existing assets`);
  
  // Ensure assets array exists
  if (!Array.isArray(updatedProjects[projectIndex].assets)) {
    updatedProjects[projectIndex].assets = [];
  }
  
  // Make sure all assets have root folderId
  const assetsWithFolder = assets.map(asset => ({
    ...asset,
    folderId: 'root'
  }));
  
  // Log all assets being added to the root folder
  console.log(`[CRITICAL] [folderOperations] Assets being added to root folder:`);
  assetsWithFolder.forEach((asset, index) => {
    console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
  });
  
  // Add new assets to the project's assets array
  updatedProjects[projectIndex].assets = [
    ...updatedProjects[projectIndex].assets, 
    ...assetsWithFolder
  ];
  
  console.log(`[CRITICAL] [folderOperations] Project now has ${updatedProjects[projectIndex].assets.length} assets`);
  
  // Update localStorage immediately
  try {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    console.log(`[CRITICAL] [folderOperations] Updated localStorage after adding assets to root folder`);
  } catch (e) {
    console.error(`[folderOperations] Error saving to localStorage:`, e);
  }
  
  return updatedProjects;
};
