
import { useEffect } from 'react';
import { useAssetSelection } from './useAssetSelection';
import { useRightsPanel } from './useRightsPanel';
import { useAssetFiltering } from './useAssetFiltering';
import { useFolderNavigation } from './useFolderNavigation';
import { useProjectAssets } from './useProjectAssets';

/**
 * Main hook that coordinates all assets management functionality
 */
export const useAssetsManager = (selectedProjectId: string | null, initialFolderId?: string | null) => {
  // Initialize folder navigation
  const {
    currentFolderId,
    setCurrentFolderId,
    handleFolderChange,
    handleBatchUpload
  } = useFolderNavigation(selectedProjectId, initialFolderId);

  // Load project assets
  const {
    projectData,
    currentFolderAssets,
    hasAssetsInFolders,
    foldersWithAssets,
    isLoading
  } = useProjectAssets(selectedProjectId, currentFolderId);

  // Filter assets
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    filteredAssets
  } = useAssetFiltering(currentFolderAssets);

  // Asset selection
  const {
    selectedAssets,
    setSelectedAssets,
    handleAssetClick,
    handleSelectAll
  } = useAssetSelection(filteredAssets);

  // Rights panel management
  const {
    rightsPanelOpen,
    setRightsPanelOpen,
    selectedAssetForRights,
    setSelectedAssetForRights,
    handleOpenRightsPanel,
    handleBatchRights
  } = useRightsPanel(selectedAssets);

  // Debug logging for initial render
  useEffect(() => {
    console.log('[CRITICAL] useAssetsManager initialized with:');
    console.log('- selectedProjectId:', selectedProjectId);
    console.log('- initialFolderId:', initialFolderId);
    console.log('- currentFolderId:', currentFolderId);
  }, []);

  return {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    projectData,
    selectedAssets,
    rightsPanelOpen,
    setRightsPanelOpen,
    selectedAssetForRights,
    setSelectedAssetForRights,
    filteredAssets,
    currentFolderId,
    setCurrentFolderId,
    handleAssetClick,
    handleSelectAll,
    handleBatchUpload,
    handleOpenRightsPanel,
    handleBatchRights,
    hasAssetsInFolders,
    foldersWithAssets,
    isLoading,
    handleFolderChange
  };
};
