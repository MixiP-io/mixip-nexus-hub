
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/dashboard/Header';
import CollapsibleTabs from '@/components/dashboard/CollapsibleTabs';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import CampaignGrid from '@/components/workspace/campaign-grid';
import AssignmentContent from '@/components/workspace/assignments/AssignmentContent';
import CollaboratorContent from '@/components/workspace/collaborators/CollaboratorContent';
import BatchUploader from '@/components/workspace/batch-uploader/BatchUploader';
import { Toaster } from 'sonner';

const CreativeContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('projects');
  const [action, setAction] = useState<string | null>(null);
  
  useEffect(() => {
    // Get the tab from URL params if available
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      console.log('Setting active tab to:', tabParam);
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
    console.log('Rendering content for tab:', activeTab);
    
    switch (activeTab) {
      case 'campaigns':
        return <CampaignGrid isCreating={action === 'new'} />;
      case 'assets':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Assets</h2>
            <p className="text-gray-400">Manage your digital assets and resources</p>
            <div className="mt-6 p-8 text-center bg-gray-800 rounded-xl">
              <p className="text-gray-400">Asset management coming soon</p>
            </div>
          </div>
        );
      case 'assignments':
        return <AssignmentContent />;
      case 'collaborators':
        return <CollaboratorContent />;
      case 'uploader':
        console.log('Rendering BatchUploader component');
        return <BatchUploader />;
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
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default CreativeContent;
