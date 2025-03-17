
import { useState } from 'react';

/**
 * Hook to manage the rights management panel state
 */
export const useRightsPanel = () => {
  const [rightsPanelOpen, setRightsPanelOpen] = useState(false);
  const [selectedAssetForRights, setSelectedAssetForRights] = useState<string | null>(null);

  // Handle opening rights panel
  const handleOpenRightsPanel = (assetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAssetForRights(assetId);
    setRightsPanelOpen(true);
  };

  // Handle batch rights
  const handleBatchRights = () => {
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
