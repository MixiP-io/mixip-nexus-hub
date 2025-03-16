
import { useState, useEffect } from 'react';

export interface UseViewSettingsResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useViewSettings = (): UseViewSettingsResult => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Load previously saved view mode from localStorage if available
  useEffect(() => {
    const savedViewMode = localStorage.getItem('projectViewMode');
    if (savedViewMode && (savedViewMode === 'grid' || savedViewMode === 'list')) {
      setViewMode(savedViewMode as 'grid' | 'list');
    }
  }, []);
  
  // Save view mode changes to localStorage
  useEffect(() => {
    localStorage.setItem('projectViewMode', viewMode);
  }, [viewMode]);

  return {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode
  };
};
