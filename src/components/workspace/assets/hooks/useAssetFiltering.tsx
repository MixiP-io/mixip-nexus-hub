
import { useState, useMemo } from 'react';

/**
 * Hook to handle asset filtering functionality
 */
export const useAssetFiltering = (currentFolderAssets: any[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter assets by search query
  const filteredAssets = useMemo(() => {
    if (!currentFolderAssets || currentFolderAssets.length === 0) {
      console.log('[useAssetFiltering] No assets to filter');
      return [];
    }
    
    console.log(`[useAssetFiltering] Filtering ${currentFolderAssets.length} assets with query: "${searchQuery}"`);
    
    const filtered = currentFolderAssets.filter((asset: any) => 
      asset && asset.name && asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    console.log(`[useAssetFiltering] Found ${filtered.length} assets after filtering`);
    return filtered;
  }, [currentFolderAssets, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    filteredAssets
  };
};
