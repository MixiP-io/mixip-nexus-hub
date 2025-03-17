
import React, { useState } from 'react';
import NavigationTabs from '@/components/workspace/common/NavigationTabs';

interface AssetsTabsProps {
  onFilterChange?: (filter: string) => void;
}

const AssetsTabs: React.FC<AssetsTabsProps> = ({ onFilterChange }) => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Assets' },
    { id: 'images', label: 'Images' },
    { id: 'videos', label: 'Videos' },
    { id: 'documents', label: 'Documents' },
    { id: 'rights-cleared', label: 'Rights Cleared' },
    { id: 'rights-pending', label: 'Rights Pending' }
  ];

  return (
    <NavigationTabs 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
};

export default AssetsTabs;
