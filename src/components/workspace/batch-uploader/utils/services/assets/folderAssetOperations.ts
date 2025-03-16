
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
      console.log(`[folderAssetOperations] Folder: ${folder.name} (${folder.id})`);
    });
  }
  
  // Direct exact match first
  if (updatedProjects[projectIndex].subfolders) {
    const exactMatch = updatedProjects[projectIndex].subfolders.find(
      (folder: any) => folder.id === normalizedFolderId
    );
    
    if (exactMatch) {
      console.log(`[folderAssetOperations] Found exact folder match with ID: ${normalizedFolderId}`);
      if (!Array.isArray(exactMatch.assets)) {
        exactMatch.assets = [];
      }
      
      exactMatch.assets = [...exactMatch.assets, ...assets];
      exactMatch.updatedAt = new Date();
      folderFound = true;
      locationAdded = exactMatch.id;
      toast.success(`Added ${assets.length} files to folder "${exactMatch.name}"`);
    }
  }
  
  // If not found by ID, try to find by case-insensitive name match
  if (!folderFound && updatedProjects[projectIndex].subfolders) {
    const normalizedFolderName = normalizedFolderId.toLowerCase();
    const nameMatch = updatedProjects[projectIndex].subfolders.find(
      (folder: any) => folder.name.toLowerCase() === normalizedFolderName
    );
    
    if (nameMatch) {
      console.log(`[folderAssetOperations] Found folder by name match: ${nameMatch.name}`);
      if (!Array.isArray(nameMatch.assets)) {
        nameMatch.assets = [];
      }
      
      nameMatch.assets = [...nameMatch.assets, ...assets];
      nameMatch.updatedAt = new Date();
      folderFound = true;
      locationAdded = nameMatch.id;
      toast.success(`Added ${assets.length} files to folder "${nameMatch.name}"`);
    }
  }
  
  // If still not found, use addAssetsToFolder as a fallback
  if (!folderFound) {
    // Try to add assets to the specified folder
    folderFound = addAssetsToFolder(
      updatedProjects[projectIndex].subfolders, 
      normalizedFolderId, 
      assets
    );
    
    if (folderFound) {
      toast.success(`Added ${assets.length} files to folder successfully`);
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
  
  const newFolder = {
    id: safeFolderId,
    name: folderName,
    assets: [...assets],
    createdAt: new Date(),
    updatedAt: new Date(),
    subfolders: []
  };
  
  // Add the new folder
  updatedProjects[projectIndex].subfolders.push(newFolder);
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
  
  // Add new assets to the project's assets array
  updatedProjects[projectIndex].assets = [
    ...updatedProjects[projectIndex].assets, 
    ...assets
  ];
  
  console.log(`[folderAssetOperations] Project now has ${updatedProjects[projectIndex].assets.length} assets`);
  toast.success(`Added ${assets.length} files to project root folder`);
  
  return updatedProjects;
};
