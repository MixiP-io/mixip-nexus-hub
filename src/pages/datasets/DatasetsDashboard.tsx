
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DatasetsHeader from './components/DatasetsHeader';
import DatasetsToolbar from './components/DatasetsToolbar';
import DatasetsNavigation from './components/DatasetsNavigation';
import DatasetsContent from './components/DatasetsContent';
import { useDatasets } from './hooks/useDatasets';
import { toast } from 'sonner';

const DatasetsDashboard: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const {
    filteredDatasets,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    fetchDatasets,
    handleLicenseDataset
  } = useDatasets();

  // Handle back navigation
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Load datasets on component mount
  useEffect(() => {
    fetchDatasets();
    
    // Get active tab from URL params if available
    const tabParam = searchParams.get('filter');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Get view mode from URL params if available
    const viewModeParam = searchParams.get('view');
    if (viewModeParam && (viewModeParam === 'grid' || viewModeParam === 'list')) {
      setViewMode(viewModeParam as 'grid' | 'list');
    }
  }, [searchParams]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    searchParams.set('filter', tabId);
    setSearchParams(searchParams);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    searchParams.set('view', mode);
    setSearchParams(searchParams);
  };

  // Handle requesting a custom dataset
  const handleRequestCustomDataset = () => {
    toast.info('Custom dataset request feature coming soon!');
  };

  return (
    <div className="flex flex-col h-full">
      <DatasetsHeader onBackToDashboard={handleBackToDashboard} />
      
      <DatasetsToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onRequestCustomDataset={handleRequestCustomDataset}
      />
      
      <DatasetsNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <div className="flex-1 p-6">
        <DatasetsContent 
          isLoading={isLoading}
          filteredDatasets={filteredDatasets}
          viewMode={viewMode}
          onLicenseDataset={handleLicenseDataset}
          onRequestCustomDataset={handleRequestCustomDataset}
        />
      </div>
    </div>
  );
};

export default DatasetsDashboard;
