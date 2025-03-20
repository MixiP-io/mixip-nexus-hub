
import { useState, useEffect, useCallback } from 'react';
import { useFolderNavigation } from './useFolderNavigation';
import { useFolderAssets } from './useFolderAssets';

/**
 * Combined hook for folder navigation and asset loading
 */
export const useAssetsNavigation = (projectId: string | null) => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use the folder navigation hook
  const {
    currentFolderId,
    folderName,
    navigateToFolder,
    setCurrentFolderId
  } = useFolderNavigation(projectId);
  
  // Use the folder assets hook
  const {
    folderAssets,
    isLoading,
    error,
    loadFolderAssets
  } = useFolderAssets();
  
  // Load assets when folder changes
  useEffect(() => {
    if (projectId && currentFolderId) {
      console.log(`[useAssetsNavigation] Loading assets for folder: ${currentFolderId}`);
      loadFolderAssets(projectId, currentFolderId, isInitialized);
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [projectId, currentFolderId, loadFolderAssets, isInitialized]);
  
  // Handle folder selection
  const handleFolderSelect = useCallback((folderId: string, folderName?: string) => {
    console.log(`[useAssetsNavigation] Selected folder: ${folderId} ${folderName ? `(${folderName})` : ''}`);
    navigateToFolder(folderId, folderName);
  }, [navigateToFolder]);
  
  return {
    currentFolderId,
    folderName,
    folderAssets,
    isLoading,
    error,
    handleFolderSelect,
    navigateToFolder,
    setCurrentFolderId
  };
};
