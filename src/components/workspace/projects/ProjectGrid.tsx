
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../batch-uploader/utils/projectUtils';
import { setProjectCoverImage } from '../batch-uploader/utils/services/assetService';
import SectionHeader from '../SectionHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import ProjectToolbar from './ProjectToolbar';
import ProjectGridView from './ProjectGridView';
import ProjectListView from './ProjectListView';
import CreateProjectDialog from './CreateProjectDialog';
import CreateSubfolderDialog from './CreateSubfolderDialog';

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
    onProjectSelect(projectId);
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
  
  const handleCoverImageSelected = (assetId: string) => {
    if (projectForCoverImage) {
      const success = setProjectCoverImage(projectForCoverImage, assetId);
      
      if (success) {
        toast.success('Cover image set successfully');
        loadProjects();
      }
    }
    
    setSetCoverImageOpen(false);
    setProjectForCoverImage(null);
    setProjectAssets([]);
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
      <Dialog open={setCoverImageOpen} onOpenChange={setSetCoverImageOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Set Project Cover Image</DialogTitle>
            <DialogDescription className="text-gray-300">
              Select an image to use as the cover for your project.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-2">
            {projectAssets.length > 0 ? (
              projectAssets.map((asset: any) => (
                <div 
                  key={asset.id} 
                  className="relative bg-gray-700 rounded-md overflow-hidden h-32 cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
                  onClick={() => handleCoverImageSelected(asset.id)}
                >
                  <img 
                    src={asset.preview} 
                    alt={asset.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs truncate">
                    {asset.name}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center p-4">
                No images available to set as cover
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectGrid;
