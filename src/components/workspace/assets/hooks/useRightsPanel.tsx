
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook to manage the rights management panel state
 */
export const useRightsPanel = (selectedAssets: string[] = []) => {
  const [rightsPanelOpen, setRightsPanelOpen] = useState(false);
  const [selectedAssetForRights, setSelectedAssetForRights] = useState<string | null>(null);

  // Handle opening rights panel for a specific asset
  const handleOpenRightsPanel = (assetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAssetForRights(assetId);
    setRightsPanelOpen(true);
  };

  // Handle batch rights for multiple assets
  const handleBatchRights = () => {
    if (selectedAssets.length === 0) {
      toast.error('Please select at least one asset to manage rights');
      return;
    }
    
    // Clear single asset selection when opening batch mode
    setSelectedAssetForRights(null);
    setRightsPanelOpen(true);
  };

  return {
    rightsPanelOpen,
    setRightsPanelOpen,
    selectedAssetForRights,
    setSelectedAssetForRights,
    handleOpenRightsPanel,
    handleBatchRights
  };
};
