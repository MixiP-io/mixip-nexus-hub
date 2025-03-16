
import React, { useEffect } from 'react';
import { useAssetsManager } from './hooks/useAssetsManager';
import AssetsHeader from './components/AssetsHeader';
import AssetsTabs from './components/AssetsTabs';
import AssetsEmptyState from './components/AssetsEmptyState';
import AssetsGridView from './components/grid-view/AssetsGridView';
import AssetsListView from './components/list-view/AssetsListView';
import NoProjectSelected from './components/NoProjectSelected';
import RightsManagementPanel from './rights-panel';
import { toast } from 'sonner';

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
    currentFolderId
  } = useAssetsManager(selectedProjectId, selectedFolderId);

  useEffect(() => {
    console.log('[AssetsManager] Component rendered with:', { 
      projectId: selectedProjectId, 
      folderId: selectedFolderId,
      currentFolderId
    });
    
    // Update current folder when selectedFolderId changes
    if (selectedFolderId && selectedFolderId !== currentFolderId) {
      console.log('[AssetsManager] Setting current folder to:', selectedFolderId);
      setCurrentFolderId(selectedFolderId);
      
      // Show folder navigation toast
      if (selectedFolderId !== 'root' && projectData && projectData.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          toast.info(`Viewing folder: ${folder.name}`);
        }
      }
    }
    
    if (projectData) {
      console.log('[AssetsManager] Project data loaded:', projectData.name);
      
      // Check if we're viewing a specific folder
      if (selectedFolderId && selectedFolderId !== 'root' && projectData.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          console.log(`[AssetsManager] Viewing folder: ${folder.name} with ${folder.assets?.length || 0} assets`);
          
          // Log assets in folder for debugging
          if (folder.assets && folder.assets.length > 0) {
            console.log(`[AssetsManager] Sample assets in folder "${folder.name}":`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
            
            // Log all assets in the folder for debugging
            console.log(`[AssetsManager] All assets in folder "${folder.name}":`);
            folder.assets.forEach((asset: any, index: number) => {
              console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
            });
          } else {
            console.log(`[AssetsManager] Folder "${folder.name}" has no assets`);
          }
        } else {
          console.log('[AssetsManager] Selected folder not found:', selectedFolderId);
        }
      } else {
        console.log('[AssetsManager] Viewing root folder with', projectData.assets?.length || 0, 'assets');
      }
    }
  }, [selectedProjectId, projectData, selectedFolderId, currentFolderId, setCurrentFolderId]);

  if (!selectedProjectId) {
    return <NoProjectSelected />;
  }

  if (!projectData) {
    return (
      <div className="p-6">
        <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-lg mb-4">
          <p>Error loading project data. Project ID: {selectedProjectId}</p>
        </div>
        <NoProjectSelected />
      </div>
    );
  }

  const hasFilteredAssets = filteredAssets && filteredAssets.length > 0;
  
  // Check for assets in folders
  let hasAssetsInFolders = false;
  let foldersWithAssets: string[] = [];
  
  if (projectData.subfolders && projectData.subfolders.length > 0) {
    projectData.subfolders.forEach((folder: any) => {
      if (folder.assets && folder.assets.length > 0) {
        hasAssetsInFolders = true;
        foldersWithAssets.push(folder.name);
        
        // Log assets in this folder for debugging
        console.log(`[AssetsManager] Folder "${folder.name}" has ${folder.assets.length} assets`);
        if (folder.id === currentFolderId) {
          console.log(`[AssetsManager] This is the current folder`);
        }
      }
    });
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

      {!hasFilteredAssets ? (
        <div>
          {hasAssetsInFolders && currentFolderId === 'root' && (
            <div className="bg-blue-500/20 border border-blue-500/30 text-blue-200 p-4 rounded-lg mb-4">
              <p className="font-medium">Assets found in folders:</p>
              <p className="mt-1">This project has assets in the following folders: {foldersWithAssets.join(', ')}</p>
              <p className="mt-2">Check each folder to view its assets.</p>
            </div>
          )}
          
          <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 p-4 rounded-lg mb-4">
            <p>No assets found in {currentFolderId === 'root' ? `project "${projectData.name}"` : `folder "${currentFolderId}"`}.</p>
            {currentFolderId !== 'root' && (
              <p className="mt-2">Try uploading files directly to this folder from the uploader tab.</p>
            )}
          </div>
          <AssetsEmptyState handleBatchUpload={handleBatchUpload} />
        </div>
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
