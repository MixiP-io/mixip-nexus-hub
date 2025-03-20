
/**
 * Folder Asset Operations
 * 
 * This file is kept for backwards compatibility.
 * New code should import from the folder-operations directory directly.
 */

// Re-export all folder operations from the new structure
export { 
  addAssetsToSpecificFolder,
  createNewFolderWithAssets,
  addAssetsToRootFolder 
} from './folder-operations';
