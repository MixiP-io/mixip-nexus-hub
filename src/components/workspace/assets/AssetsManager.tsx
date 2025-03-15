
import React from 'react';
import { useAssetsManager } from './hooks/useAssetsManager';
import AssetsHeader from './components/AssetsHeader';
import AssetsTabs from './components/AssetsTabs';
import AssetsEmptyState from './components/AssetsEmptyState';
import AssetsGridView from './components/grid-view/AssetsGridView';
import AssetsListView from './components/list-view/AssetsListView';
import NoProjectSelected from './components/NoProjectSelected';
import RightsManagementPanel from './rights-panel';

interface AssetsManagerProps {
  selectedProjectId: string | null;
}

const AssetsManager: React.FC<AssetsManagerProps> = ({ selectedProjectId }) => {
  const {
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
    handleAssetClick,
    handleSelectAll,
    handleBatchUpload,
    handleOpenRightsPanel,
    handleBatchRights
  } = useAssetsManager(selectedProjectId);

  if (!projectData) {
    return <NoProjectSelected />;
  }

  return (
    <div className="p-6">
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

      {filteredAssets.length === 0 ? (
        <AssetsEmptyState handleBatchUpload={handleBatchUpload} />
      ) : viewMode === 'grid' ? (
        <AssetsGridView
          assets={filteredAssets}
          selectedAssets={selectedAssets}
          handleAssetClick={handleAssetClick}
          handleSelectAll={handleSelectAll}
          handleOpenRightsPanel={handleOpenRightsPanel}
          handleBatchRights={handleBatchRights}
        />
      ) : (
        <AssetsListView
          assets={filteredAssets}
          selectedAssets={selectedAssets}
          handleAssetClick={handleAssetClick}
          handleSelectAll={handleSelectAll}
          handleOpenRightsPanel={handleOpenRightsPanel}
        />
      )}

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
    </div>
  );
};

export default AssetsManager;
