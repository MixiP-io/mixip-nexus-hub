
import React from 'react';
import NavigationTabs from '@/components/workspace/common/NavigationTabs';

interface DatasetsNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const DatasetsNavigation: React.FC<DatasetsNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'All Datasets' },
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'mixed', label: 'Mixed Media' }
  ];

  return <NavigationTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />;
};

export default DatasetsNavigation;
