
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getProjectById } from '../../batch-uploader/utils/projectUtils';

export const useAssetsManager = (selectedProjectId: string | null) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectData, setProjectData] = useState<any | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [rightsPanelOpen, setRightsPanelOpen] = useState(false);
  const [selectedAssetForRights, setSelectedAssetForRights] = useState<string | null>(null);
  
  useEffect(() => {
    if (selectedProjectId) {
      console.log('Fetching project data for ID:', selectedProjectId);
      const project = getProjectById(selectedProjectId);
      
      if (project) {
        console.log('Project found:', project.name);
        console.log('Root assets:', project.assets?.length || 0);
        console.log('Project assets data:', JSON.stringify(project.assets, null, 2));
        console.log('Project folders:', project.subfolders?.length || 0);
        
        // Make a deep copy to avoid reference issues
        setProjectData(JSON.parse(JSON.stringify(project)));
        
        // Ensure there are assets being processed
        if (!project.assets || project.assets.length === 0) {
          console.log('No assets found in project root');
        }
        
        // Check subfolders for assets
        let subfoldersWithAssets = 0;
        let totalSubfolderAssets = 0;
        if (project.subfolders && project.subfolders.length > 0) {
          project.subfolders.forEach((folder: any) => {
            if (folder.assets && folder.assets.length > 0) {
              subfoldersWithAssets++;
              totalSubfolderAssets += folder.assets.length;
              console.log(`Folder ${folder.name} has ${folder.assets.length} assets`);
            }
          });
        }
        console.log(`Found ${subfoldersWithAssets} folders with assets, total ${totalSubfolderAssets} assets in subfolders`);
      } else {
        console.log('Project not found for ID:', selectedProjectId);
        setProjectData(null);
        toast.error('Project not found');
      }
    } else {
      console.log('No project selected, showing all assets');
      setProjectData(null);
    }
  }, [selectedProjectId]);

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

  const handleBatchUpload = () => {
    navigate('/dashboard/workspace?tab=uploader');
  };

  const handleOpenRightsPanel = (assetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAssetForRights(assetId);
    setRightsPanelOpen(true);
  };

  const handleBatchRights = () => {
    if (selectedAssets.length === 0) {
      toast.error('Please select at least one asset to manage rights');
      return;
    }
    
    setRightsPanelOpen(true);
  };

  // Get all assets from project and subfolders
  const getAllProjectAssets = (project: any): any[] => {
    if (!project) return [];
    
    // Start with project root assets
    let allAssets = [...(project.assets || [])];
    console.log(`Getting all assets from project. Root assets: ${allAssets.length}`);
    
    // Function to recursively get assets from folders
    const getAssetsFromFolders = (folders: any[]) => {
      if (!folders || !Array.isArray(folders)) return;
      
      folders.forEach(folder => {
        // Add assets from this folder
        if (folder.assets && Array.isArray(folder.assets)) {
          console.log(`Adding ${folder.assets.length} assets from folder ${folder.name}`);
          allAssets = [...allAssets, ...folder.assets];
        }
        
        // Recursively process subfolders
        if (folder.subfolders && folder.subfolders.length > 0) {
          getAssetsFromFolders(folder.subfolders);
        }
      });
    };
    
    // Process all folders in the project
    if (project.subfolders && project.subfolders.length > 0) {
      getAssetsFromFolders(project.subfolders);
    }
    
    console.log(`Total assets found: ${allAssets.length}`);
    return allAssets;
  };

  // Get all assets and filter by search query
  const allAssets = getAllProjectAssets(projectData);
  const filteredAssets = allAssets.filter((asset: any) => 
    asset && asset.name && asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    handleAssetClick,
    handleSelectAll,
    handleBatchUpload,
    handleOpenRightsPanel,
    handleBatchRights
  };
};
