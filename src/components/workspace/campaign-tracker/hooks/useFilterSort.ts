
import { useState } from 'react';
import { TabType, SortDirection } from './types';

export const useFilterSort = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    console.log(`Sorting creators by ${sortDirection}`);
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    activeRole,
    setActiveRole,
    sortDirection,
    handleSort
  };
};
