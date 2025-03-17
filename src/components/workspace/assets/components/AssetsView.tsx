
import React from 'react';
import AssetsGridView from './grid-view/AssetsGridView';
import AssetsListView from './list-view/AssetsListView';
import AssetsEmptyStateView from './AssetsEmptyStateView';
import BatchActionsBar from './BatchActionsBar';

interface AssetsViewProps {
  viewMode: 'grid' | 'list';
  filteredAssets: any[];
  selectedAssets: string[];
  handleAssetClick: (assetId: string, e: React.MouseEvent) => void;
  handleSelectAll: () => void;
  handleOpenRightsPanel: (assetId: string, e: React.MouseEvent) => void;
  handleBatchRights: () => void;
  hasAssetsInFolders: boolean;
  currentFolderId: string;
  projectName: string;
  foldersWithAssets: string[];
  handleBatchUpload: () => void;
  selectedProjectId: string | null;
}

const AssetsView: React.FC<AssetsViewProps> = ({
  viewMode,
  filteredAssets,
  selectedAssets,
  handleAssetClick,
  handleSelectAll,
  handleOpenRightsPanel,
  handleBatchRights,
  hasAssetsInFolders,
  currentFolderId,
  projectName,
  foldersWithAssets,
  handleBatchUpload,
  selectedProjectId
}) => {
  const hasFilteredAssets = filteredAssets && filteredAssets.length > 0;

  if (!hasFilteredAssets) {
    return (
      <AssetsEmptyStateView
        hasAssetsInFolders={hasAssetsInFolders}
        currentFolderId={currentFolderId}
        projectName={projectName}
        foldersWithAssets={foldersWithAssets}
        handleBatchUpload={handleBatchUpload}
        selectedProjectId={selectedProjectId}
      />
    );
  }

  if (viewMode === 'grid') {
    return (
      <AssetsGridView
        assets={filteredAssets}
        selectedAssets={selectedAssets}
        handleAssetClick={handleAssetClick}
        handleSelectAll={handleSelectAll}
        handleOpenRightsPanel={handleOpenRightsPanel}
        handleBatchRights={handleBatchRights}
      />
    );
  }

  return (
    <AssetsListView
      assets={filteredAssets}
      selectedAssets={selectedAssets}
      handleAssetClick={handleAssetClick}
      handleSelectAll={handleSelectAll}
      handleOpenRightsPanel={handleOpenRightsPanel}
    />
  );
};

export default AssetsView;
