
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
    console.log('[CRITICAL] useAssetsManager initialized with:');
    console.log('- selectedProjectId:', selectedProjectId);
    console.log('- initialFolderId:', initialFolderId);
    console.log('- currentFolderId:', currentFolderId);
  }, [initialFolderId, selectedProjectId]);
  
  // Update current folder when initialFolderId changes
  useEffect(() => {
    if (initialFolderId && initialFolderId !== currentFolderId) {
      console.log('[CRITICAL] Setting current folder to initial value:', initialFolderId);
      setCurrentFolderId(initialFolderId);
    }
  }, [initialFolderId, currentFolderId]);
  
  // Load project data when selectedProjectId changes
  useEffect(() => {
    if (selectedProjectId) {
      console.log('[CRITICAL] Fetching project data for ID:', selectedProjectId);
      console.log('[CRITICAL] Current folder ID:', currentFolderId);
      
      try {
        // Force direct read from localStorage for latest data
        let project = null;
        try {
          const projectsJson = localStorage.getItem('projects');
          if (projectsJson) {
            const projects = JSON.parse(projectsJson);
            project = projects.find((p: any) => p.id === selectedProjectId);
          }
        } catch (e) {
          console.error("Error reading from localStorage:", e);
        }
        
        // Fall back to getProjectById if localStorage failed
        if (!project) {
          console.log('[CRITICAL] Falling back to getProjectById');
          project = getProjectById(selectedProjectId);
        }
        
        if (project) {
          console.log('[CRITICAL] Project found:', project.name);
          console.log('[CRITICAL] Project structure:', {
            id: project.id,
            rootAssets: project.assets?.length || 0,
            subfolders: project.subfolders?.length || 0
          });
          
          // Make a deep copy to avoid reference issues
          setProjectData(JSON.parse(JSON.stringify(project)));
          
          // Log all project folders and their assets for debugging
          if (project.subfolders && project.subfolders.length > 0) {
            console.log('================================');
            console.log('[CRITICAL] PROJECT FOLDERS INSPECTION:');
            project.subfolders.forEach((folder: any) => {
              console.log(`- Folder "${folder.name}" (${folder.id}): ${folder.assets?.length || 0} assets`);
              
              if (folder.id === currentFolderId) {
                console.log('  [CRITICAL] THIS IS THE CURRENT FOLDER');
                if (folder.assets && folder.assets.length > 0) {
                  console.log(`  [CRITICAL] Sample assets:`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
                  console.log(`  [CRITICAL] Asset count: ${folder.assets.length}`);
                } else {
                  console.log('  [CRITICAL] No assets in this folder');
                }
              }
              
              // If folder has assets, list first 2 with their details
              if (folder.assets && folder.assets.length > 0) {
                folder.assets.slice(0, 2).forEach((asset: any, index: number) => {
                  console.log(`  [Asset ${index + 1}] ID: ${asset.id}, Name: ${asset.name}, FolderId: ${asset.folderId || 'none'}`);
                });
              }
            });
            console.log('================================');
          } else {
            console.log('[CRITICAL] Project has no folders');
          }
          
          // If current folder ID is set but the folder doesn't exist, reset to root
          if (currentFolderId !== 'root' && project.subfolders) {
            const folderExists = project.subfolders.some((folder: any) => folder.id === currentFolderId);
            if (!folderExists) {
              console.log(`[CRITICAL] WARNING: Current folder ID ${currentFolderId} doesn't exist in project, resetting to root`);
              setCurrentFolderId('root');
            }
          }
        } else {
          console.log(`[CRITICAL] Project not found for ID: ${selectedProjectId}`);
          setProjectData(null);
          toast.error('Project not found');
        }
      } catch (error) {
        console.error('[CRITICAL] Error loading project:', error);
        toast.error('Failed to load project data');
        setProjectData(null);
      }
    } else {
      console.log('[CRITICAL] No project selected');
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
    // Pass current folder ID to the uploader
    if (currentFolderId && selectedProjectId) {
      navigate(`/dashboard/workspace?tab=uploader&project=${selectedProjectId}&folder=${currentFolderId}`);
    } else {
      navigate('/dashboard/workspace?tab=uploader');
    }
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
    
    console.log(`[CRITICAL] Getting assets for current folder: ${currentFolderId}`);
    
    // If viewing root folder, return root assets
    if (currentFolderId === 'root') {
      console.log(`[CRITICAL] Returning root assets: ${projectData.assets?.length || 0}`);
      return projectData.assets ? [...projectData.assets] : [];
    }
    
    // Otherwise, search for the specified folder
    if (projectData.subfolders && projectData.subfolders.length > 0) {
      const targetFolder = projectData.subfolders.find((folder: any) => folder.id === currentFolderId);
      
      if (targetFolder) {
        console.log(`[CRITICAL] Found folder "${targetFolder.name}" with ${targetFolder.assets?.length || 0} assets`);
        
        if (targetFolder.assets && targetFolder.assets.length > 0) {
          console.log('[CRITICAL] Sample asset from folder:', JSON.stringify(targetFolder.assets[0], null, 2));
          
          // Log all assets in the folder for debugging
          console.log(`[CRITICAL] All assets in folder "${targetFolder.name}":`);
          targetFolder.assets.forEach((asset: any, index: number) => {
            console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
          });
          
          return [...targetFolder.assets];
        } else {
          console.log('[CRITICAL] Folder exists but has no assets');
          return [];
        }
      } else {
        console.log(`[CRITICAL] No folder found with ID ${currentFolderId}`);
      }
    }
    
    console.log(`[CRITICAL] Folder ${currentFolderId} not found, returning empty array`);
    return [];
  }, [projectData, currentFolderId]);
  
  // Log current folder assets for debugging
  useEffect(() => {
    console.log(`[CRITICAL] Current folder (${currentFolderId}) assets count: ${currentFolderAssets.length}`);
    if (currentFolderAssets.length > 0) {
      console.log('[CRITICAL] Sample assets in current folder:', JSON.stringify(currentFolderAssets.slice(0, 2), null, 2));
    }
  }, [currentFolderAssets, currentFolderId]);
  
  // Filter assets by search query
  const filteredAssets = useMemo(() => {
    if (!currentFolderAssets || currentFolderAssets.length === 0) {
      console.log('[CRITICAL] No assets to filter');
      return [];
    }
    
    console.log(`[CRITICAL] Filtering ${currentFolderAssets.length} assets with query: "${searchQuery}"`);
    
    const filtered = currentFolderAssets.filter((asset: any) => 
      asset && asset.name && asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    console.log(`[CRITICAL] Found ${filtered.length} assets after filtering`);
    return filtered;
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
