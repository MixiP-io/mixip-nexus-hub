
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

  useEffect(() => {
    console.log('AssetsManager rendered with projectId:', selectedProjectId);
    
    if (projectData) {
      console.log('Project data loaded:', projectData.name);
      
      if (projectData.assets) {
        console.log('Project has assets array of length:', projectData.assets.length);
        if (projectData.assets.length > 0) {
          console.log('First few assets:', JSON.stringify(projectData.assets.slice(0, 3), null, 2));
        }
      } else {
        console.log('Project has no assets array or it is not initialized');
      }
      
      // Check for assets in subfolders
      let totalFolderAssets = 0;
      if (projectData.subfolders && projectData.subfolders.length > 0) {
        projectData.subfolders.forEach((folder: any) => {
          if (folder.assets && folder.assets.length > 0) {
            totalFolderAssets += folder.assets.length;
            console.log(`Folder ${folder.name} has ${folder.assets.length} assets`);
          }
        });
        
        if (totalFolderAssets > 0) {
          console.log(`Found ${totalFolderAssets} total assets in subfolders`);
        }
      }
      
      console.log('Filtered assets count:', filteredAssets?.length || 0);
      
      // Show a toast when project data loads
      if (projectData.name) {
        toast.info(`Viewing assets for project: ${projectData.name}`);
        
        // If we have subfolder assets but no filtered assets, show a helpful message
        if (totalFolderAssets > 0 && filteredAssets.length === 0) {
          toast.info(`This project has ${totalFolderAssets} assets in subfolders, but they may not be visible in the current view.`);
        }
      }
    } else {
      console.log('No project data loaded');
    }
  }, [selectedProjectId, projectData, filteredAssets]);

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

  const hasAssets = projectData.assets && projectData.assets.length > 0;
  const hasFilteredAssets = filteredAssets && filteredAssets.length > 0;
  
  // Check for assets in folders
  let hasAssetsInFolders = false;
  let foldersWithAssets: string[] = [];
  
  if (projectData.subfolders && projectData.subfolders.length > 0) {
    projectData.subfolders.forEach((folder: any) => {
      if (folder.assets && folder.assets.length > 0) {
        hasAssetsInFolders = true;
        foldersWithAssets.push(folder.name);
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
          {hasAssetsInFolders && (
            <div className="bg-blue-500/20 border border-blue-500/30 text-blue-200 p-4 rounded-lg mb-4">
              <p className="font-medium">Assets found in folders:</p>
              <p className="mt-1">This project has assets in the following folders: {foldersWithAssets.join(', ')}</p>
              <p className="mt-2">Check each folder to view its assets.</p>
            </div>
          )}
          
          <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 p-4 rounded-lg mb-4">
            <p>No assets found in project "{projectData.name}". Project has {hasAssets ? projectData.assets.length : 0} root assets.</p>
            {hasAssets && <p className="mt-2">Assets may be filtered out by your search criteria or stored in subfolders.</p>}
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
