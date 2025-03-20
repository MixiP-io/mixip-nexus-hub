
import React, { useEffect } from 'react';
import { useAssetsNavigation } from '@/hooks/useAssetsNavigation';
import AssetsContent from './components/AssetsContent';
import AssetsErrorState from './components/AssetsErrorState';
import { useProjectLoader } from './hooks/project-assets/useProjectLoader';
import { useAssetSelection } from './hooks/useAssetSelection';
import { useRightsPanel } from './hooks/useRightsPanel';
import { useAssetFiltering } from './hooks/useAssetFiltering';
import AssetsInitializer from './components/AssetsInitializer';

interface AssetsManagerProps {
  selectedProjectId: string | null;
  selectedFolderId?: string | null;
}

const AssetsManager: React.FC<AssetsManagerProps> = ({ 
  selectedProjectId,
  selectedFolderId = 'root'
}) => {
  // Load project data
  const { loadProjectWithRetries, isLoading: projectLoading, projectData } = useProjectLoader();
  
  // Use our improved navigation and assets loading hook
  const {
    currentFolderId,
    folderName,
    folderAssets,
    isLoading: assetsLoading,
    error,
    handleFolderSelect,
    navigateToFolder
  } = useAssetsNavigation(selectedProjectId);
  
  // Load project data when project ID changes
  useEffect(() => {
    if (selectedProjectId) {
      loadProjectWithRetries(selectedProjectId);
    }
  }, [selectedProjectId, loadProjectWithRetries]);
  
  // Filter assets
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    filteredAssets
  } = useAssetFiltering(folderAssets);
  
  // Asset selection
  const {
    selectedAssets,
    handleAssetClick,
    handleSelectAll
  } = useAssetSelection(filteredAssets);
  
  // Rights panel
  const {
    rightsPanelOpen,
    setRightsPanelOpen,
    selectedAssetForRights,
    setSelectedAssetForRights,
    handleOpenRightsPanel,
    handleBatchRights
  } = useRightsPanel(selectedAssets);
  
  // Initialize assets and handle folder selection from URL
  useEffect(() => {
    if (selectedFolderId && selectedProjectId && selectedFolderId !== currentFolderId) {
      console.log(`[AssetsManager] Setting folder from URL: ${selectedFolderId}`);
      navigateToFolder(selectedFolderId);
    }
  }, [selectedFolderId, selectedProjectId, currentFolderId, navigateToFolder]);
  
  // Handle batch upload
  const handleBatchUpload = () => {
    if (!selectedProjectId) return;
    
    // Logic for batch upload
    console.log(`Opening batch upload for project ${selectedProjectId}, folder ${currentFolderId}`);
  };
  
  // Debug output
  useEffect(() => {
    console.log('[AssetsManager] Render with:', {
      projectId: selectedProjectId,
      folderId: currentFolderId,
      folderName,
      assetsCount: folderAssets.length,
      error
    });
  }, [selectedProjectId, currentFolderId, folderName, folderAssets, error]);
  
  // Add an initializer component to handle folder changes from URL
  const initializer = (
    <AssetsInitializer
      selectedProjectId={selectedProjectId}
      selectedFolderId={selectedFolderId}
      currentFolderId={currentFolderId}
      setCurrentFolderId={navigateToFolder}
      projectData={projectData}
    />
  );
  
  // Show error state if needed
  const errorState = (
    <AssetsErrorState 
      selectedProjectId={selectedProjectId}
      currentFolderId={currentFolderId}
      projectData={projectData}
      error={error}
    />
  );
  
  if (error) return errorState;
  
  const isLoading = projectLoading || assetsLoading;
  
  // Folders with assets information
  const hasAssetsInFolders = projectData?.subfolders?.some((folder: any) => 
    folder.assets && folder.assets.length > 0
  ) || false;
  
  const foldersWithAssets = projectData?.subfolders
    ?.filter((folder: any) => folder.assets && folder.assets.length > 0)
    ?.map((folder: any) => folder.name) || [];
  
  return (
    <div className="p-6">
      {initializer}
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
        selectedProjectId={selectedProjectId}
        folderName={folderName}
        isLoading={isLoading}
        handleFolderSelect={handleFolderSelect}
      />
    </div>
  );
};

export default AssetsManager;
