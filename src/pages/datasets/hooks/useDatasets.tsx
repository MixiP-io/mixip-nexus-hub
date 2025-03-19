
import { useState, useEffect } from 'react';
import { Dataset } from '../types';
import { toast } from 'sonner';
import { sampleDatasets } from '../data/mockDatasets';

export const useDatasets = (initialTab = 'all') => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch datasets (for now using mock data)
  const fetchDatasets = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, we would fetch from Supabase
      // For now, using sample data imported from a separate file
      setDatasets(sampleDatasets);
      setFilteredDatasets(sampleDatasets);
      
    } catch (error) {
      console.error('Error fetching datasets:', error);
      toast.error('Failed to load datasets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter datasets based on active tab and search query
  useEffect(() => {
    let results = [...datasets];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        dataset => 
          dataset.title.toLowerCase().includes(query) || 
          dataset.description.toLowerCase().includes(query) ||
          dataset.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply content type filter from tab
    if (activeTab !== 'all') {
      results = results.filter(dataset => dataset.contentType === activeTab);
    }
    
    setFilteredDatasets(results);
  }, [datasets, searchQuery, activeTab]);

  // License a dataset
  const handleLicenseDataset = (datasetId: string) => {
    toast.info(`Licensing process initiated for dataset ID: ${datasetId}`);
    // Navigate to licensing flow (to be implemented)
  };

  return {
    datasets,
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
  };
};
