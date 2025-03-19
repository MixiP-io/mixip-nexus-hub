
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import SectionHeader from '@/components/workspace/SectionHeader';
import DatasetsToolbar from './components/DatasetsToolbar';
import DatasetsEmpty from './components/DatasetsEmpty';
import DatasetGrid from './components/DatasetGrid';
import DatasetList from './components/DatasetList';
import DatasetsNavigation from './components/DatasetsNavigation';
import { Dataset } from './types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const DatasetsDashboard: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      setViewMode(viewModeParam);
    }
  }, [searchParams]);

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

  // Handle licensing a dataset
  const handleLicenseDataset = (datasetId: string) => {
    toast.info(`Licensing process initiated for dataset ID: ${datasetId}`);
    // Navigate to licensing flow (to be implemented)
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-[#1A1F2C] border-b border-gray-800">
        <Button 
          variant="ghost" 
          className="flex items-center text-gray-300 hover:text-white" 
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <SectionHeader 
        title="AI Training Datasets" 
        description="Browse and license high-quality datasets for training your AI models"
      />
      
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
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
        ) : filteredDatasets.length === 0 ? (
          <DatasetsEmpty onRequestCustomDataset={handleRequestCustomDataset} />
        ) : viewMode === 'grid' ? (
          <DatasetGrid 
            datasets={filteredDatasets} 
            onLicenseDataset={handleLicenseDataset} 
          />
        ) : (
          <DatasetList 
            datasets={filteredDatasets} 
            onLicenseDataset={handleLicenseDataset} 
          />
        )}
      </div>
    </div>
  );
};

export default DatasetsDashboard;
