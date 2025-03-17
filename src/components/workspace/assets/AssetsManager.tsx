
import React, { useEffect } from 'react';
import { useAssetsManager } from './hooks/useAssetsManager';
import AssetsHeader from './components/AssetsHeader';
import AssetsTabs from './components/AssetsTabs';
import NoProjectSelected from './components/NoProjectSelected';
import RightsManagementPanel from './rights-panel';
import AssetsView from './components/AssetsView';
import AssetsDebugPanel from './components/AssetsDebugPanel';
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
    console.log('[CRITICAL] [AssetsManager] Component rendered with:', { 
      projectId: selectedProjectId, 
      folderId: selectedFolderId,
      currentFolderId
    });
    
    // Update current folder when selectedFolderId changes
    if (selectedFolderId && selectedFolderId !== currentFolderId) {
      console.log('[CRITICAL] [AssetsManager] Setting current folder to:', selectedFolderId);
      setCurrentFolderId(selectedFolderId);
      
      // Show folder navigation toast
      if (selectedFolderId !== 'root' && projectData && projectData.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          toast.info(`Viewing folder: ${folder.name}`);
        }
      }
    }
    
    // Logging project data for debugging
    if (projectData) {
      console.log('[CRITICAL] [AssetsManager] Project data loaded:', projectData.name);
      
      // Check if we're viewing a specific folder
      if (selectedFolderId && selectedFolderId !== 'root' && projectData.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          console.log(`[CRITICAL] [AssetsManager] Viewing folder: ${folder.name} with ${folder.assets?.length || 0} assets`);
          
          // Log assets in folder for debugging
          if (folder.assets && folder.assets.length > 0) {
            console.log(`[CRITICAL] [AssetsManager] Sample assets in folder "${folder.name}":`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
            
            // Log all assets in the folder for debugging
            console.log(`[CRITICAL] [AssetsManager] All assets in folder "${folder.name}":`);
            folder.assets.forEach((asset: any, index: number) => {
              console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
            });
          } else {
            console.log(`[CRITICAL] [AssetsManager] Folder "${folder.name}" has no assets`);
          }
        } else {
          console.log('[CRITICAL] [AssetsManager] Selected folder not found:', selectedFolderId);
        }
      } else {
        console.log('[CRITICAL] [AssetsManager] Viewing root folder with', projectData.assets?.length || 0, 'assets');
      }
    }
  }, [selectedProjectId, projectData, selectedFolderId, currentFolderId, setCurrentFolderId]);

  // Check localStorage for additional debugging
  useEffect(() => {
    if (selectedProjectId) {
      try {
        const projectsJson = localStorage.getItem('projects');
        if (projectsJson) {
          const projects = JSON.parse(projectsJson);
          const currentProject = projects.find((p: any) => p.id === selectedProjectId);
          if (currentProject) {
            console.log(`[CRITICAL] Found project in localStorage, checking for folder:`, selectedFolderId);
            
            if (selectedFolderId && selectedFolderId !== 'root' && currentProject.subfolders) {
              const folder = currentProject.subfolders.find((f: any) => f.id === selectedFolderId);
              if (folder) {
                console.log(`[CRITICAL] Found folder "${folder.name}" in localStorage with ${folder.assets?.length || 0} assets`);
                if (folder.assets && folder.assets.length > 0) {
                  console.log(`[CRITICAL] Sample assets from localStorage:`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
                }
              }
            }
          }
        }
      } catch (e) {
        console.error("Error checking localStorage:", e);
      }
    }
  }, [selectedProjectId, selectedFolderId]);

  if (!selectedProjectId) {
    return <NoProjectSelected />;
  }

  if (!projectData) {
    return (
      <div className="p-6">
        <AssetsDebugPanel 
          projectId={selectedProjectId}
          currentFolderId={currentFolderId || 'unknown'}
        />
        <NoProjectSelected />
      </div>
    );
  }

  // Check for assets in folders
  let hasAssetsInFolders = false;
  let foldersWithAssets: string[] = [];
  
  if (projectData.subfolders && projectData.subfolders.length > 0) {
    projectData.subfolders.forEach((folder: any) => {
      if (folder.assets && folder.assets.length > 0) {
        hasAssetsInFolders = true;
        foldersWithAssets.push(folder.name);
        
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
        projectName={projectData.name}
        foldersWithAssets={foldersWithAssets}
        handleBatchUpload={handleBatchUpload}
      />

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
