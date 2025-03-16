
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/dashboard/Header';
import CollapsibleTabs from '@/components/dashboard/CollapsibleTabs';
import ProjectGrid from '@/components/workspace/projects/ProjectGrid';
import AssetsManager from '@/components/workspace/assets/AssetsManager';
import CampaignGrid from '@/components/workspace/campaign-grid';
import AssignmentContent from '@/components/workspace/assignments/AssignmentContent';
import CollaboratorContent from '@/components/workspace/collaborators/CollaboratorContent';
import BatchUploader from '@/components/workspace/batch-uploader/BatchUploader';
import AnalyticsView from '@/components/workspace/analytics';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { getProjectById } from './batch-uploader/utils/projectUtils';

const CreativeContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('projects');
  const [action, setAction] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
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

    // Check if there's a project selection
    const projectParam = searchParams.get('project');
    if (projectParam) {
      console.log('Project selected:', projectParam);
      setSelectedProjectId(projectParam);
      
      // Debug the selected project
      const project = getProjectById(projectParam);
      if (project) {
        console.log('Project data loaded:', project.name);
        console.log('Project assets count:', project.assets?.length || 0);
        console.log('Project assets:', JSON.stringify(project.assets, null, 2));
      } else {
        console.log('Project not found:', projectParam);
        toast.error('Project not found or failed to load');
      }
    }
  }, [searchParams]);

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab, 'with selected project:', selectedProjectId);
    
    switch (activeTab) {
      case 'campaigns':
        return <CampaignGrid isCreating={action === 'new'} />;
      case 'assets':
        return <AssetsManager selectedProjectId={selectedProjectId} />;
      case 'assignments':
        return <AssignmentContent />;
      case 'collaborators':
        return <CollaboratorContent />;
      case 'uploader':
        return <BatchUploader />;
      case 'analytics':
        return <AnalyticsView />;
      case 'projects':
      default:
        return <ProjectGrid onProjectSelect={handleProjectSelect} />;
    }
  };

  const handleProjectSelect = (projectId: string) => {
    console.log('Project selected via handler:', projectId);
    setSelectedProjectId(projectId);
    
    // Debug the selected project
    const project = getProjectById(projectId);
    if (project) {
      console.log('Project data loaded via handler:', project.name);
      console.log('Project assets count:', project.assets?.length || 0);
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
