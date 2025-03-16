
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('projects');
  const [action, setAction] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>('root');
  const [projectExists, setProjectExists] = useState<boolean>(true);
  
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
      console.log('Project selected from URL:', projectParam);
      
      // Get folder parameter if available
      const folderParam = searchParams.get('folder');
      
      // Check if project exists
      const project = getProjectById(projectParam);
      
      if (project) {
        console.log('Project data loaded from URL:', project.name);
        setSelectedProjectId(projectParam);
        
        if (folderParam) {
          console.log('Folder selected from URL:', folderParam);
          setSelectedFolderId(folderParam);
        } else {
          setSelectedFolderId('root');
        }
        
        setProjectExists(true);
      } else {
        console.log('Project not found:', projectParam);
        // If project doesn't exist, clear the selection and go back to projects tab
        setSelectedProjectId(null);
        setProjectExists(false);
        
        if (activeTab === 'assets') {
          // Redirect to projects tab if currently in assets and project doesn't exist
          searchParams.delete('project');
          searchParams.delete('folder');
          searchParams.set('tab', 'projects');
          setSearchParams(searchParams);
          setActiveTab('projects');
          toast.error('Project not found or was deleted');
        }
      }
    } else {
      // No project selected in URL
      setSelectedProjectId(null);
    }
    
    // If switching to assets tab without a project, show a message
    if (tabParam === 'assets' && !projectParam && !selectedProjectId) {
      toast.info('Please select a project to view assets');
    }
  }, [searchParams, setSearchParams]);

  // Handle project selection and navigate to assets tab
  const handleProjectSelect = (projectId: string) => {
    console.log('Project selected via handler:', projectId);
    
    // Verify the project exists before selection
    const project = getProjectById(projectId);
    if (!project) {
      console.error("Attempted to select non-existent project:", projectId);
      toast.error("The selected project could not be found");
      return;
    }
    
    // Set the project ID in state
    setSelectedProjectId(projectId);
    setSelectedFolderId('root'); // Reset to root folder when changing projects
    setProjectExists(true);
    
    // Update URL and switch to assets tab
    searchParams.set('project', projectId);
    searchParams.delete('folder'); // Remove any folder parameter
    searchParams.set('tab', 'assets');
    setSearchParams(searchParams);
    setActiveTab('assets');
    
    // Debug the selected project
    console.log('Project data loaded via handler:', project.name);
    console.log('Project assets count:', project.assets?.length || 0);
    
    // Show a toast to confirm the project selection
    toast.success(`Viewing project: ${project.name}`);
  };

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab, 'with selected project:', selectedProjectId, 'folder:', selectedFolderId);
    
    // If we're on the assets tab but the project doesn't exist, show project grid
    if (activeTab === 'assets' && !projectExists) {
      return <ProjectGrid onProjectSelect={handleProjectSelect} />;
    }
    
    switch (activeTab) {
      case 'campaigns':
        return <CampaignGrid isCreating={action === 'new'} />;
      case 'assets':
        return <AssetsManager 
                 selectedProjectId={selectedProjectId} 
                 selectedFolderId={selectedFolderId} 
               />;
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
