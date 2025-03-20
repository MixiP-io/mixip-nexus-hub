
import { useEffect, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAssetSelection } from './useAssetSelection';
import { useRightsPanel } from './useRightsPanel';
import { useAssetFiltering } from './useAssetFiltering';
import { useFolderNavigation } from './useFolderNavigation';
import { useProjectAssets } from './useProjectAssets';
import { supabase } from '@/integrations/supabase/client';

/**
 * Main hook that coordinates all assets management functionality
 */
export const useAssetsManager = (selectedProjectId: string | null, initialFolderId?: string | null) => {
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  
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
    isLoading,
    reloadFolderAssets
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

  // Force reload of assets
  const forceReload = useCallback(() => {
    console.log('[useAssetsManager] Force reloading assets');
    setRefreshTrigger(Date.now());
    
    if (selectedProjectId && currentFolderId) {
      reloadFolderAssets(selectedProjectId, currentFolderId, true);
    }
  }, [selectedProjectId, currentFolderId, reloadFolderAssets]);

  // Set up realtime subscription to refresh assets when changes happen
  useEffect(() => {
    if (!selectedProjectId) return;
    
    console.log('[useAssetsManager] Setting up realtime subscription for assets changes');
    
    // Subscribe to changes in the assets table for this project
    const channel = supabase
      .channel('assets-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'assets',
          filter: `project_id=eq.${selectedProjectId}`
        }, 
        (payload) => {
          console.log('[useAssetsManager] Received asset change:', payload);
          forceReload();
        }
      )
      .subscribe();
      
    return () => {
      console.log('[useAssetsManager] Removing realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [selectedProjectId, forceReload]);

  // Refresh when trigger changes or folder changes
  useEffect(() => {
    if (selectedProjectId && currentFolderId) {
      console.log(`[useAssetsManager] Loading assets due to refresh trigger or folder change`);
      reloadFolderAssets(selectedProjectId, currentFolderId);
    }
  }, [selectedProjectId, currentFolderId, refreshTrigger, reloadFolderAssets]);

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
    handleFolderChange,
    forceReload
  };
};
