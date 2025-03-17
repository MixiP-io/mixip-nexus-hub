
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
    foldersWithAssets
  } = useAssetsManager(selectedProjectId, selectedFolderId);

  // Handle error states and project selection
  const errorState = <AssetsErrorState 
    selectedProjectId={selectedProjectId}
    currentFolderId={currentFolderId}
    projectData={projectData}
  />;
  
  if (errorState) return errorState;

  // Determine if we have assets in folders
  let hasAssetsByFolder = false;
  let folderAssetList: string[] = [];
  
  if (projectData?.subfolders && projectData.subfolders.length > 0) {
    projectData.subfolders.forEach((folder: any) => {
      if (folder.assets && folder.assets.length > 0) {
        hasAssetsByFolder = true;
        folderAssetList.push(folder.name);
        
        // Log assets in this folder for debugging
        console.log(`[CRITICAL] [AssetsManager] Folder "${folder.name}" has ${folder.assets.length} assets`);
        if (folder.id === currentFolderId) {
          console.log(`[CRITICAL] [AssetsManager] This is the current folder`);
          console.log(`[CRITICAL] Sample assets:`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
        }
      }
    });
  }

  return (
    <div className="p-6">
      {/* Side effects component for initialization and debugging */}
      <AssetsInitializer
        selectedProjectId={selectedProjectId}
        selectedFolderId={selectedFolderId}
        currentFolderId={currentFolderId}
        setCurrentFolderId={setCurrentFolderId}
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
