
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  return (
    <div className="border-b border-gray-800 bg-[#1A1F2C] pb-1">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="bg-transparent h-12">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={`px-6 py-2 text-base font-medium ${
                activeTab === tab.id 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-white hover:text-gray-300'
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DatasetsNavigation;
