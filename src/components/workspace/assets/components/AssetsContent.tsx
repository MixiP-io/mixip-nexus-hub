
import React from 'react';
import AssetsHeader from './AssetsHeader';
import AssetsTabs from './AssetsTabs';
import AssetsView from './AssetsView';
import RightsManagementPanel from '../rights-panel';

interface AssetsContentProps {
  projectData: any;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedAssets: string[];
  rightsPanelOpen: boolean;
  setRightsPanelOpen: (open: boolean) => void;
  selectedAssetForRights: string | null;
  setSelectedAssetForRights: (assetId: string | null) => void;
  filteredAssets: any[];
  handleAssetClick: (assetId: string, e: React.MouseEvent) => void;
  handleSelectAll: () => void;
  handleBatchUpload: () => void;
  handleOpenRightsPanel: (assetId: string, e: React.MouseEvent) => void;
  handleBatchRights: () => void;
  hasAssetsInFolders: boolean;
  currentFolderId: string;
  foldersWithAssets: string[];
}

const AssetsContent: React.FC<AssetsContentProps> = ({
  projectData,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  selectedAssets,
  rightsPanelOpen,
  setRightsPanelOpen,
  selectedAssetForRights,
  setSelectedAssetForRights,
  filteredAssets,
  handleAssetClick,
  handleSelectAll,
  handleBatchUpload,
  handleOpenRightsPanel,
  handleBatchRights,
  hasAssetsInFolders,
  currentFolderId,
  foldersWithAssets
}) => {
  return (
    <>
      <AssetsHeader
        projectName={projectData.name}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        handleBatchRights={handleBatchRights}
        handleBatchUpload={handleBatchUpload}
      />

      <AssetsTabs />

      <AssetsView
        viewMode={viewMode}
        filteredAssets={filteredAssets}
        selectedAssets={selectedAssets}
        handleAssetClick={handleAssetClick}
        handleSelectAll={handleSelectAll}
        handleOpenRightsPanel={handleOpenRightsPanel}
        handleBatchRights={handleBatchRights}
        hasAssetsInFolders={hasAssetsInFolders}
        currentFolderId={currentFolderId}
        projectName={projectData.name}
        foldersWithAssets={foldersWithAssets}
        handleBatchUpload={handleBatchUpload}
      />

      <RightsManagementPanel
        isOpen={rightsPanelOpen}
        onClose={() => {
          setRightsPanelOpen(false);
          setSelectedAssetForRights(null);
        }}
        assetIds={selectedAssetForRights ? [selectedAssetForRights] : selectedAssets}
        assets={filteredAssets.filter((asset: any) => 
          selectedAssetForRights 
            ? asset.id === selectedAssetForRights 
            : selectedAssets.includes(asset.id)
        )}
      />
    </>
  );
};

export default AssetsContent;
