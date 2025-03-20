
import React from 'react';
import { Loader } from 'lucide-react';
import AssetsTabs from './AssetsTabs';
import AssetsHeader from './AssetsHeader';
import AssetsView from './AssetsView';
import RightsManagementPanel from '../rights-panel/RightsManagementPanel';
import NoProjectSelected from './NoProjectSelected';

interface AssetsContentProps {
  projectData: any | null;
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
  selectedProjectId: string | null;
  folderName: string;
  isLoading: boolean;
  handleFolderSelect: (folderId: string, folderName?: string) => void;
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
  foldersWithAssets,
  selectedProjectId,
  folderName,
  isLoading,
  handleFolderSelect
}) => {
  // If no project is selected, show the no project view
  if (!projectData) {
    return <NoProjectSelected />;
  }

  // Extract project name from data
  const projectName = projectData.name || 'Unnamed Project';

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Header with search and view controls */}
        <AssetsHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleBatchUpload={handleBatchUpload}
          handleBatchRights={handleBatchRights}
          projectName={projectName}
          folderName={folderName}
        />

        {/* Asset tabs (might include All, Images, Videos, etc.) */}
        <AssetsTabs />

        {/* Main content area with assets grid or empty state */}
        <div className="flex-grow overflow-auto px-6 pb-6">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading assets...</span>
            </div>
          ) : (
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
              projectName={projectName}
              foldersWithAssets={foldersWithAssets}
              handleBatchUpload={handleBatchUpload}
              selectedProjectId={selectedProjectId}
              handleFolderSelect={handleFolderSelect}
              folderName={folderName}
            />
          )}
        </div>
      </div>

      {/* Rights management panel (slides in from right) */}
      {rightsPanelOpen && selectedAssetForRights && (
        <RightsManagementPanel
          isOpen={rightsPanelOpen}
          onClose={() => setRightsPanelOpen(false)}
          assetIds={[selectedAssetForRights]} 
          assets={filteredAssets}
        />
      )}
    </div>
  );
};

export default AssetsContent;
