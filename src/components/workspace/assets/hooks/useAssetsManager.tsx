
import { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    // Update current folder when initialFolderId changes
    if (initialFolderId) {
      console.log('Setting current folder to initial value:', initialFolderId);
      setCurrentFolderId(initialFolderId);
    }
  }, [initialFolderId]);
  
  useEffect(() => {
    if (selectedProjectId) {
      console.log('Fetching project data for ID:', selectedProjectId);
      console.log('Current folder ID:', currentFolderId);
      
      const project = getProjectById(selectedProjectId);
      
      if (project) {
        console.log('Project found:', project.name);
        console.log('Root assets:', project.assets?.length || 0);
        
        // Make a deep copy to avoid reference issues
        setProjectData(JSON.parse(JSON.stringify(project)));
        
        // Ensure there are assets being processed
        if (!project.assets || project.assets.length === 0) {
          console.log('No assets found in project root');
          
          // Check if this project has subfolders with assets
          let hasAssetsInSubfolders = false;
          if (project.subfolders && project.subfolders.length > 0) {
            // Check each subfolder for assets
            project.subfolders.forEach((folder: any) => {
              if (folder.assets && folder.assets.length > 0) {
                hasAssetsInSubfolders = true;
                console.log(`Found ${folder.assets.length} assets in folder "${folder.name}"`);
              }
            });
          }
          
          if (hasAssetsInSubfolders && currentFolderId === 'root') {
            toast.info(`This project has assets in subfolders. Select a specific folder to view them.`);
          }
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
  }, [selectedProjectId, currentFolderId]);

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

  // Get assets from the current folder
  const getAssetsForCurrentFolder = (project: any): any[] => {
    if (!project) return [];
    
    console.log(`Getting assets for current folder: ${currentFolderId}`);
    
    // If viewing root folder, return root assets
    if (currentFolderId === 'root') {
      console.log(`Returning root assets: ${project.assets?.length || 0}`);
      return [...(project.assets || [])];
    }
    
    // Otherwise, search for the specified folder
    if (project.subfolders && project.subfolders.length > 0) {
      // First try direct match
      const targetFolder = project.subfolders.find((folder: any) => folder.id === currentFolderId);
      if (targetFolder) {
        console.log(`Found folder ${targetFolder.name} with ${targetFolder.assets?.length || 0} assets`);
        return [...(targetFolder.assets || [])];
      }
      
      // If not found, try recursive search (for future nested folders)
      const searchFolders = (folders: any[]): any[] => {
        for (const folder of folders) {
          if (folder.id === currentFolderId) {
            console.log(`Found nested folder ${folder.name} with ${folder.assets?.length || 0} assets`);
            return [...(folder.assets || [])];
          }
          
          if (folder.subfolders && folder.subfolders.length > 0) {
            const nestedResult = searchFolders(folder.subfolders);
            if (nestedResult.length > 0) {
              return nestedResult;
            }
          }
        }
        return [];
      };
      
      const nestedAssets = searchFolders(project.subfolders);
      if (nestedAssets.length > 0) {
        return nestedAssets;
      }
    }
    
    console.log(`Folder ${currentFolderId} not found, returning empty array`);
    return [];
  };

  // Get assets based on current folder selection
  const currentFolderAssets = getAssetsForCurrentFolder(projectData);
  
  console.log(`Current folder assets: ${currentFolderAssets.length}`);
  
  // Filter by search query
  const filteredAssets = currentFolderAssets.filter((asset: any) => 
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
    currentFolderId,
    setCurrentFolderId,
    handleAssetClick,
    handleSelectAll,
    handleBatchUpload,
    handleOpenRightsPanel,
    handleBatchRights
  };
};
