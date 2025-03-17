
/**
 * Utility functions for counting assets in projects and folders
 */

/**
 * Get total assets count from all folders and root
 */
export const getTotalAssetsCount = (project: any): number => {
  if (!project) return 0;
  
  // Count assets at root level
  const rootAssets = project.assets?.length || 0;
  
  // Count assets in all subfolders
  const folderAssets = project.subfolders?.reduce((total: number, folder: any) => {
    return total + (folder.assets?.length || 0);
  }, 0) || 0;
  
  // Return total
  return rootAssets + folderAssets;
};
