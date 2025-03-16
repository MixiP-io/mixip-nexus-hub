
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, getProjectById, filterAndSortProjects } from '../batch-uploader/utils/projectUtils';
import SectionHeader from '../SectionHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ProjectToolbar from './ProjectToolbar';
import ProjectGridView from './ProjectGridView';
import ProjectListView from './ProjectListView';
import CreateProjectDialog from './CreateProjectDialog';
import CreateSubfolderDialog from './CreateSubfolderDialog';
import SetCoverImageDialog from './dialogs/SetCoverImageDialog';
import EditProjectDialog from './dialogs/EditProjectDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  
  // Edit project state
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);
  
  // Delete project confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [projectToDeleteName, setProjectToDeleteName] = useState<string>('');

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
    // Open delete confirmation dialog
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToDelete(projectId);
      setProjectToDeleteName(project.name);
      setDeleteDialogOpen(true);
    }
  };
  
  const confirmDeleteProject = () => {
    if (!projectToDelete) return;
    
    // Remove project from projects array
    const updatedProjects = projects.filter(p => p.id !== projectToDelete);
    
    // Update local state and localStorage
    const projectsJSON = JSON.stringify(updatedProjects);
    localStorage.setItem('projects', projectsJSON);
    
    // Reload projects
    loadProjects();
    
    // Close dialog and show toast
    setDeleteDialogOpen(false);
    toast.success(`Project "${projectToDeleteName}" deleted successfully`);
  };

  const handleEditProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Get project details
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToEdit(project);
      setEditProjectOpen(true);
    }
  };
  
  const handleAddSubfolder = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Open the subfolder dialog
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
  
  const handleProjectUpdated = () => {
    // Reload projects after updating
    loadProjects();
    setEditProjectOpen(false);
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
          onAddSubfolder={handleAddSubfolder}
          onDeleteProject={handleDeleteProject}
          onCreateProject={() => setCreateProjectOpen(true)}
          onSetCoverImage={handleSetCoverImage}
        />
      ) : (
        <ProjectListView 
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
          onEditProject={handleEditProject}
          onAddSubfolder={handleAddSubfolder}
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
      
      {/* Dialog for editing project */}
      {projectToEdit && (
        <EditProjectDialog
          isOpen={editProjectOpen}
          setIsOpen={setEditProjectOpen}
          project={projectToEdit}
          onUpdateProject={handleProjectUpdated}
        />
      )}
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to delete "{projectToDeleteName}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProject}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectGrid;
