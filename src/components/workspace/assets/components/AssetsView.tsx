
import React from 'react';
import AssetsGridView from './grid-view/AssetsGridView';
import AssetsListView from './list-view/AssetsListView';
import AssetsEmptyState from './AssetsEmptyState';

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
  handleFolderSelect: (folderId: string, folderName?: string) => void;
  folderName?: string;
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
  selectedProjectId,
  handleFolderSelect,
  folderName
}) => {
  // Show empty state if no assets
  if (filteredAssets.length === 0) {
    return (
      <AssetsEmptyState
        projectName={projectName}
        hasAssetsInFolders={hasAssetsInFolders}
        currentFolderId={currentFolderId}
        foldersWithAssets={foldersWithAssets}
        handleBatchUpload={handleBatchUpload}
        selectedProjectId={selectedProjectId}
        handleFolderSelect={handleFolderSelect}
        folderName={folderName}
      />
    );
  }

  // Render grid or list view based on selection
  return viewMode === 'grid' ? (
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
  );
};

export default AssetsView;
