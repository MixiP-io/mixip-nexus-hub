
import { useState, useEffect } from 'react';
import { Dataset } from '../types';
import { toast } from 'sonner';

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
      // For now, using sample data
      const sampleDatasets: Dataset[] = [
        {
          id: '1',
          title: 'Diverse Facial Expressions',
          description: 'A comprehensive collection of facial expressions across different demographics, ideal for emotion recognition models.',
          itemCount: 5000,
          category: 'people',
          contentType: 'photos',
          price: 1200,
          thumbnailUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhY2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
          tags: ['faces', 'emotions', 'diversity', 'high-resolution'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Urban Environments Collection',
          description: 'High-quality footage of urban environments from 50+ cities worldwide, perfect for scene understanding models.',
          itemCount: 2500,
          category: 'environments',
          contentType: 'videos',
          price: 1800,
          thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
          tags: ['urban', 'cities', 'architecture', '4K', 'global'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Product Photography Dataset',
          description: 'Clean, studio-quality product photos across multiple categories, ideal for e-commerce AI applications.',
          itemCount: 10000,
          category: 'objects',
          contentType: 'photos',
          price: 2500,
          thumbnailUrl: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
          tags: ['products', 'e-commerce', 'studio', 'white-background'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Human Activities & Sports',
          description: 'A diverse collection of people performing various physical activities and sports, suitable for action recognition.',
          itemCount: 7500,
          category: 'actions',
          contentType: 'mixed',
          price: 2200,
          thumbnailUrl: 'https://images.unsplash.com/photo-1576858574144-9ae73f7a72e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
          tags: ['sports', 'activities', 'motion', 'outdoor', 'indoor'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Medical Imaging Collection',
          description: 'Ethically sourced and anonymized medical imaging data, cleared for AI research and development.',
          itemCount: 3000,
          category: 'medical',
          contentType: 'photos',
          price: 3500,
          thumbnailUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
          tags: ['medical', 'healthcare', 'diagnostics', 'anonymized'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Diverse Cultural Celebrations',
          description: 'Visual documentation of cultural celebrations and traditions from around the world.',
          itemCount: 4500,
          category: 'cultural',
          contentType: 'mixed',
          price: 1950,
          thumbnailUrl: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGN1bHR1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
          tags: ['culture', 'traditions', 'global', 'diversity', 'celebrations'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
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
