
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AssetsTabs: React.FC = () => {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList>
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
