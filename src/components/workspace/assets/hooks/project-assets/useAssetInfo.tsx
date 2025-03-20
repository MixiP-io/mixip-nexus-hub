import { useMemo } from 'react';

/**
 * Hook to compute asset information and statistics
 */
export const useAssetInfo = (projectData: any, currentFolderId: string, folderAssets: any[]) => {
  // Get assets for the current folder
  const currentFolderAssets = useMemo(() => {
    // First try the directly loaded folder assets
    if (folderAssets.length > 0) {
      console.log(`[useAssetInfo] Using ${folderAssets.length} directly loaded assets`);
      return folderAssets;
    }
    
    if (!projectData) return [];
    
    console.log(`[useAssetInfo] Getting assets for current folder: ${currentFolderId}`);
    
    // If viewing root folder, return root assets
    if (currentFolderId === 'root') {
      console.log(`[useAssetInfo] Returning root assets: ${projectData.assets?.length || 0}`);
      return projectData.assets ? [...projectData.assets] : [];
    }
    
    // Otherwise, search for the specified folder
    if (projectData.subfolders && projectData.subfolders.length > 0) {
      const targetFolder = projectData.subfolders.find((folder: any) => folder.id === currentFolderId);
      
      if (targetFolder) {
        console.log(`[useAssetInfo] Found folder "${targetFolder.name}" with ${targetFolder.assets?.length || 0} assets`);
        
        if (targetFolder.assets && targetFolder.assets.length > 0) {
          // Debug the first few assets to make sure they're valid
          console.log('Sample assets from folder:', targetFolder.assets.slice(0, 2));
          return [...targetFolder.assets];
        } else {
          console.log('[useAssetInfo] Folder exists but has no assets');
          return [];
        }
      } else {
        console.log(`[useAssetInfo] No folder found with ID ${currentFolderId}`);
      }
    }
    
    console.log(`[useAssetInfo] Folder ${currentFolderId} not found, returning empty array`);
    return [];
  }, [projectData, currentFolderId, folderAssets]);
  
  // Determine if there are assets in any folders
  const folderAssetInfo = useMemo(() => {
    let hasAssetsInFolders = false;
    let foldersWithAssets: string[] = [];
    
    if (projectData?.subfolders && projectData.subfolders.length > 0) {
      projectData.subfolders.forEach((folder: any) => {
        if (folder.assets && folder.assets.length > 0) {
          hasAssetsInFolders = true;
          foldersWithAssets.push(folder.name);
        }
      });
    }
    
    return { hasAssetsInFolders, foldersWithAssets };
  }, [projectData]);

  return {
    currentFolderAssets,
    hasAssetsInFolders: folderAssetInfo.hasAssetsInFolders,
    foldersWithAssets: folderAssetInfo.foldersWithAssets
  };
};
