
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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

  return (
    <Tabs 
      defaultValue="all" 
      className="mb-6" 
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <TabsList className="w-auto">
        <TabsTrigger value="all">All Assets</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="rights-cleared">Rights Cleared</TabsTrigger>
        <TabsTrigger value="rights-pending">Rights Pending</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AssetsTabs;
