
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
      
      console.log('Filtered assets count:', filteredAssets?.length || 0);
      
      // Show a toast when project data loads
      if (projectData.name) {
        toast.info(`Viewing assets for project: ${projectData.name}`);
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
