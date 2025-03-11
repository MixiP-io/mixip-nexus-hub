
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/dashboard/Header';
import CollapsibleTabs from '@/components/dashboard/CollapsibleTabs';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import CampaignGrid from '@/components/workspace/CampaignGrid';

const CreativeContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('projects');
  const [action, setAction] = useState<string | null>(null);
  
  useEffect(() => {
    // Get the tab from URL params if available
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Check if there's an action to perform
    const actionParam = searchParams.get('action');
    if (actionParam) {
      setAction(actionParam);
    } else {
      setAction(null);
    }
  }, [searchParams]);

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return <CampaignGrid isCreating={action === 'new'} />;
      case 'projects':
      default:
        return <ProjectGrid />;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <CollapsibleTabs />
      {renderContent()}
    </div>
  );
};

export default CreativeContent;
