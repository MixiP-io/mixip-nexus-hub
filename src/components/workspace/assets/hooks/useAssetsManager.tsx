import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getProjectById } from '../../batch-uploader/utils/projectUtils';

export const useAssetsManager = (selectedProjectId: string | null, initialFolderId?: string | null) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectData, setProjectData] = useState<any | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [rightsPanelOpen, setRightsPanelOpen] = useState(false);
  const [selectedAssetForRights, setSelectedAssetForRights] = useState<string | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialFolderId || 'root');
  
  // Debug logging for initial folder
  useEffect(() => {
    console.log('useAssetsManager initialized with initialFolderId:', initialFolderId);
    console.log('currentFolderId set to:', currentFolderId);
  }, [initialFolderId]);
  
  // Update current folder when initialFolderId changes
  useEffect(() => {
    if (initialFolderId && initialFolderId !== currentFolderId) {
      console.log('Setting current folder to initial value:', initialFolderId);
      setCurrentFolderId(initialFolderId);
    }
  }, [initialFolderId, currentFolderId]);
  
  // Load project data when selectedProjectId changes
  useEffect(() => {
    if (selectedProjectId) {
      console.log('Fetching project data for ID:', selectedProjectId);
      console.log('Current folder ID:', currentFolderId);
      
      try {
        const project = getProjectById(selectedProjectId);
        
        if (project) {
          console.log('Project found:', project.name);
          console.log('Project structure:', {
            rootAssets: project.assets?.length || 0,
            subfolders: project.subfolders?.length || 0
          });
          
          // Make a deep copy to avoid reference issues
          setProjectData(JSON.parse(JSON.stringify(project)));
          
          // Log all project folders and their assets for debugging
          if (project.subfolders && project.subfolders.length > 0) {
            console.log('Project folders:');
            project.subfolders.forEach((folder: any) => {
              console.log(`- Folder "${folder.name}" (${folder.id}): ${folder.assets?.length || 0} assets`);
              
              if (folder.id === currentFolderId) {
                console.log('  This is the current folder');
                if (folder.assets && folder.assets.length > 0) {
                  console.log(`  Sample assets:`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
                } else {
                  console.log('  No assets in this folder');
                }
              }
            });
          } else {
            console.log('Project has no folders');
          }
        } else {
          console.log(`Project not found for ID: ${selectedProjectId}`);
          setProjectData(null);
          toast.error('Project not found');
        }
      } catch (error) {
        console.error('Error loading project:', error);
        toast.error('Failed to load project data');
        setProjectData(null);
      }
    } else {
      console.log('No project selected');
      setProjectData(null);
    }
  }, [selectedProjectId, currentFolderId]);

  // Handle asset click
  const handleAssetClick = (assetId: string, e: React.MouseEvent) => {
    // Check if shift key is pressed for multiple selection
    if (e.shiftKey) {
      setSelectedAssets(prev => {
        if (prev.includes(assetId)) {
          return prev.filter(id => id !== assetId);
        } else {
          return [...prev, assetId];
        }
      });
    } else {
      // Single asset selection
      setSelectedAssets([assetId]);
    }
  };

  // Handle select all assets
  const handleSelectAll = () => {
    if (filteredAssets.length > 0) {
      if (selectedAssets.length === filteredAssets.length) {
        // Deselect all if all are selected
        setSelectedAssets([]);
      } else {
        // Select all
        setSelectedAssets(filteredAssets.map((asset: any) => asset.id));
      }
    }
  };

  // Handle batch upload
  const handleBatchUpload = () => {
    navigate('/dashboard/workspace?tab=uploader');
  };

  // Handle opening rights panel
  const handleOpenRightsPanel = (assetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAssetForRights(assetId);
    setRightsPanelOpen(true);
  };

  // Handle batch rights
  const handleBatchRights = () => {
    if (selectedAssets.length === 0) {
      toast.error('Please select at least one asset to manage rights');
      return;
    }
    
    setRightsPanelOpen(true);
  };

  // Get assets for the current folder
  const currentFolderAssets = useMemo(() => {
    if (!projectData) return [];
    
    console.log(`Getting assets for current folder: ${currentFolderId}`);
    
    // If viewing root folder, return root assets
    if (currentFolderId === 'root') {
      console.log(`Returning root assets: ${projectData.assets?.length || 0}`);
      return projectData.assets ? [...projectData.assets] : [];
    }
    
    // Otherwise, search for the specified folder
    if (projectData.subfolders && projectData.subfolders.length > 0) {
      const targetFolder = projectData.subfolders.find((folder: any) => folder.id === currentFolderId);
      
      if (targetFolder) {
        console.log(`Found folder "${targetFolder.name}" with ${targetFolder.assets?.length || 0} assets`);
        
        if (targetFolder.assets && targetFolder.assets.length > 0) {
          console.log('Sample asset from folder:', JSON.stringify(targetFolder.assets[0], null, 2));
          return [...targetFolder.assets];
        } else {
          console.log('Folder exists but has no assets');
          return [];
        }
      } else {
        console.log(`No folder found with ID ${currentFolderId}`);
      }
    }
    
    console.log(`Folder ${currentFolderId} not found, returning empty array`);
    return [];
  }, [projectData, currentFolderId]);
  
  // Log current folder assets for debugging
  useEffect(() => {
    console.log(`Current folder (${currentFolderId}) assets count: ${currentFolderAssets.length}`);
    if (currentFolderAssets.length > 0) {
      console.log('Sample assets in current folder:', JSON.stringify(currentFolderAssets.slice(0, 2), null, 2));
    }
  }, [currentFolderAssets, currentFolderId]);
  
  // Filter assets by search query
  const filteredAssets = useMemo(() => {
    return currentFolderAssets.filter((asset: any) => 
      asset && asset.name && asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentFolderAssets, searchQuery]);

  return {
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
    currentFolderId,
    setCurrentFolderId,
    handleAssetClick,
    handleSelectAll,
    handleBatchUpload,
    handleOpenRightsPanel,
    handleBatchRights
  };
};
