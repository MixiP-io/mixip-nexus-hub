
import React from 'react';
import { useAssetsManager } from './hooks/useAssetsManager';
import AssetsContent from './components/AssetsContent';
import AssetsErrorState from './components/AssetsErrorState';
import AssetsInitializer from './components/AssetsInitializer';

interface AssetsManagerProps {
  selectedProjectId: string | null;
  selectedFolderId?: string | null;
}

const AssetsManager: React.FC<AssetsManagerProps> = ({ 
  selectedProjectId,
  selectedFolderId = 'root'
}) => {
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
    handleBatchRights,
    setCurrentFolderId,
    currentFolderId,
    hasAssetsInFolders,
    foldersWithAssets,
    handleFolderChange
  } = useAssetsManager(selectedProjectId, selectedFolderId);

  // Handle error states and project selection
  const errorState = <AssetsErrorState 
    selectedProjectId={selectedProjectId}
    currentFolderId={currentFolderId}
    projectData={projectData}
  />;
  
  if (errorState) return errorState;

  return (
    <div className="p-6">
      {/* Side effects component for initialization and debugging */}
      <AssetsInitializer
        selectedProjectId={selectedProjectId}
        selectedFolderId={selectedFolderId}
        currentFolderId={currentFolderId}
        setCurrentFolderId={setCurrentFolderId}
        handleFolderChange={handleFolderChange}
        projectData={projectData}
      />
      
      {/* Main content */}
      <AssetsContent
        projectData={projectData}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedAssets={selectedAssets}
        rightsPanelOpen={rightsPanelOpen}
        setRightsPanelOpen={setRightsPanelOpen}
        selectedAssetForRights={selectedAssetForRights}
        setSelectedAssetForRights={setSelectedAssetForRights}
        filteredAssets={filteredAssets}
        handleAssetClick={handleAssetClick}
        handleSelectAll={handleSelectAll}
        handleBatchUpload={handleBatchUpload}
        handleOpenRightsPanel={handleOpenRightsPanel}
        handleBatchRights={handleBatchRights}
        hasAssetsInFolders={hasAssetsInFolders}
        currentFolderId={currentFolderId}
        foldersWithAssets={foldersWithAssets}
      />
    </div>
  );
};

export default AssetsManager;
