
import { toast } from 'sonner';
import { ProjectAsset } from '../../types/projectTypes';
import { addAssetsToFolder } from '../folderOperationUtils';

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
      console.log(`[folderAssetOperations] Before: Folder has ${updatedProjects[projectIndex].subfolders[folderIndex].assets.length} assets`);
      
      // Make sure all assets have the folderId field set correctly
      const assetsWithFolder = assets.map(asset => ({
        ...asset,
        folderId: normalizedFolderId,
        folderName: folder.name // Add folder name for easy reference
      }));
      
      // Log all assets being added for debugging
      console.log(`[folderAssetOperations] Assets being added to folder "${folder.name}":`);
      assetsWithFolder.forEach((asset, index) => {
        console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
      });
      
      updatedProjects[projectIndex].subfolders[folderIndex].assets = [
        ...updatedProjects[projectIndex].subfolders[folderIndex].assets,
        ...assetsWithFolder
      ];
      
      updatedProjects[projectIndex].subfolders[folderIndex].updatedAt = new Date();
      
      console.log(`[folderAssetOperations] After: Folder has ${updatedProjects[projectIndex].subfolders[folderIndex].assets.length} assets`);
      
      // Log some assets after adding for verification
      const sampleAssets = updatedProjects[projectIndex].subfolders[folderIndex].assets.slice(0, 3);
      console.log(`[folderAssetOperations] Sample assets after adding:`, JSON.stringify(sampleAssets, null, 2));
      
      folderFound = true;
      locationAdded = updatedProjects[projectIndex].subfolders[folderIndex].id;
      
      // Update localStorage immediately
      try {
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        console.log(`[folderAssetOperations] Updated localStorage after adding assets to folder`);
      } catch (e) {
        console.error(`[folderAssetOperations] Error saving to localStorage:`, e);
      }
    }
  }
  
  return { folderFound, locationAdded };
};

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
  
  // Log all assets being added to the new folder
  console.log(`[folderAssetOperations] Assets being added to new folder "${folderName}":`);
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
  updatedProjects[projectIndex].subfolders.push(newFolder);
  
  // Update localStorage immediately
  try {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    console.log(`[folderAssetOperations] Updated localStorage after creating new folder`);
  } catch (e) {
    console.error(`[folderAssetOperations] Error saving to localStorage:`, e);
  }
  
  toast.success(`Created new folder "${folderName}" and added ${assets.length} files`);
  
  return { folderFound: true, locationAdded: safeFolderId };
};

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
  
  // Log all assets being added to the root folder
  console.log(`[folderAssetOperations] Assets being added to root folder:`);
  assetsWithFolder.forEach((asset, index) => {
    console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
  });
  
  // Add new assets to the project's assets array
  updatedProjects[projectIndex].assets = [
    ...updatedProjects[projectIndex].assets, 
    ...assetsWithFolder
  ];
  
  console.log(`[folderAssetOperations] Project now has ${updatedProjects[projectIndex].assets.length} assets`);
  
  // Update localStorage immediately
  try {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    console.log(`[folderAssetOperations] Updated localStorage after adding assets to root folder`);
  } catch (e) {
    console.error(`[folderAssetOperations] Error saving to localStorage:`, e);
  }
  
  return updatedProjects;
};
