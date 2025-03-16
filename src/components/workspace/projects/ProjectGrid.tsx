
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../batch-uploader/utils/projectUtils';
import SectionHeader from '../SectionHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ProjectToolbar from './ProjectToolbar';
import ProjectGridView from './ProjectGridView';
import ProjectListView from './ProjectListView';
import CreateProjectDialog from './CreateProjectDialog';
import CreateSubfolderDialog from './CreateSubfolderDialog';
import SetCoverImageDialog from './dialogs/SetCoverImageDialog';

interface ProjectGridProps {
  onProjectSelect: (projectId: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectSelect }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createSubfolderOpen, setCreateSubfolderOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(undefined);
  
  // Cover image state
  const [setCoverImageOpen, setSetCoverImageOpen] = useState(false);
  const [projectForCoverImage, setProjectForCoverImage] = useState<string | null>(null);
  const [projectAssets, setProjectAssets] = useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const projectsData = getProjects();
    setProjects(projectsData);
  };

  const handleCreateProject = (name: string) => {
    // Project creation is handled in the dialog component
    // After creation, we reload the projects
    loadProjects();
    setCreateProjectOpen(false);
  };

  const handleProjectClick = (projectId: string) => {
    console.log(`Project clicked: ${projectId}`);
    // Call the onProjectSelect callback to set the selected project
    onProjectSelect(projectId);
    
    // Navigate directly to the assets view for this project
    navigate(`/dashboard/workspace?tab=assets&project=${projectId}`);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real implementation, this would call an API to delete the project
    console.log(`Delete project: ${projectId}`);
    // Then reload projects
    loadProjects();
  };

  const handleEditProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In this implementation, we open the subfolder dialog
    setSelectedProjectId(projectId);
    setCreateSubfolderOpen(true);
  };
  
  const handleFolderCreated = () => {
    // Reload projects after folder creation
    loadProjects();
    setCreateSubfolderOpen(false);
  };
  
  const handleSetCoverImage = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      toast.error('Project not found');
      return;
    }
    
    if (!project.assets || project.assets.length === 0) {
      toast.error('Project has no assets to set as cover image');
      return;
    }
    
    // Set project and assets for the dialog
    setProjectForCoverImage(projectId);
    setProjectAssets(project.assets.filter((asset: any) => asset.preview));
    setSetCoverImageOpen(true);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header with search and actions */}
      <div className="mb-6">
        <SectionHeader 
          title="Projects" 
          description="Organize and manage your creative projects"
        />
        
        <ProjectToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onCreateProject={() => setCreateProjectOpen(true)}
        />
      </div>

      {/* Filter tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="cleared">Rights Cleared</TabsTrigger>
          <TabsTrigger value="pending">Rights Pending</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Project Views */}
      {viewMode === 'grid' ? (
        <ProjectGridView 
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          onCreateProject={() => setCreateProjectOpen(true)}
          onSetCoverImage={handleSetCoverImage}
        />
      ) : (
        <ProjectListView 
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      <CreateProjectDialog
        isOpen={createProjectOpen}
        setIsOpen={setCreateProjectOpen}
        onCreateProject={handleCreateProject}
      />
      
      {selectedProjectId && (
        <CreateSubfolderDialog
          isOpen={createSubfolderOpen}
          setIsOpen={setCreateSubfolderOpen}
          projectId={selectedProjectId}
          parentFolderId={selectedFolderId}
          onFolderCreated={handleFolderCreated}
        />
      )}
      
      {/* Dialog for setting cover image */}
      <SetCoverImageDialog
        isOpen={setCoverImageOpen}
        setIsOpen={setSetCoverImageOpen}
        projectId={projectForCoverImage}
        projectAssets={projectAssets}
        onSuccess={loadProjects}
      />
    </div>
  );
};

export default ProjectGrid;
