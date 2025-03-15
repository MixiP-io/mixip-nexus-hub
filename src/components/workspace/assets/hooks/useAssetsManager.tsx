
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
      const project = getProjectById(selectedProjectId);
      setProjectData(project || null);
    } else {
      // If no project is selected, show all assets from all projects
      // In a real implementation, this would fetch all assets
      const allProjects = [] as any[];
      setProjectData({
        name: 'All Assets',
        assets: allProjects.flatMap(p => p.assets || [])
      });
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

  const filteredAssets = projectData?.assets?.filter((asset: any) => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
