
import React from 'react';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  selectedProjectId
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
          selectedAssets={selectedAssets}
          handleSelectAll={handleSelectAll}
          handleBatchUpload={handleBatchUpload}
          handleBatchRights={handleBatchRights}
          projectName={projectName}
        />

        {/* Asset tabs (might include All, Images, Videos, etc.) */}
        <AssetsTabs />

        {/* Main content area with assets grid or empty state */}
        <div className="flex-grow overflow-auto px-6 pb-6">
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
          />
        </div>
      </div>

      {/* Rights management panel (slides in from right) */}
      {rightsPanelOpen && selectedAssetForRights && (
        <RightsManagementPanel
          isOpen={rightsPanelOpen}
          onClose={() => setRightsPanelOpen(false)}
          assetId={selectedAssetForRights}
          assets={filteredAssets}
        />
      )}
    </div>
  );
};

export default AssetsContent;
