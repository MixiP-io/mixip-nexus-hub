
import { useState } from 'react';

/**
 * Hook to manage asset selection state and actions
 */
export const useAssetSelection = (assets: any[]) => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  // Handle asset click
  const handleAssetClick = (assetId: string, e: React.MouseEvent) => {
    // Check if shift key is pressed for multiple selection
    if (e.shiftKey) {
      setSelectedAssets(prev => {
        if (prev.includes(assetId)) {
          return prev.filter(id => id !== assetId);
        } else {
          return [...prev, assetId];
        }
      });
    } else {
      // Single asset selection
      setSelectedAssets([assetId]);
    }
  };

  // Handle select all assets
  const handleSelectAll = () => {
    if (assets.length > 0) {
      if (selectedAssets.length === assets.length) {
        // Deselect all if all are selected
        setSelectedAssets([]);
      } else {
        // Select all
        setSelectedAssets(assets.map((asset: any) => asset.id));
      }
    }
  };

  return {
    selectedAssets,
    setSelectedAssets,
    handleAssetClick,
    handleSelectAll
  };
};
