
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  getProjects, 
  getProjectById, 
  deleteProject,
  filterAndSortProjects 
} from '../../batch-uploader/utils/services/projectService';

export function useProjectsManager() {
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
    
    // Delete the project
    const success = deleteProject(projectToDelete);
    
    if (success) {
      // Reload projects
      loadProjects();
      
      // Close dialog and show toast
      setDeleteDialogOpen(false);
      toast.success(`Project "${projectToDeleteName}" deleted successfully`);
    } else {
      toast.error(`Failed to delete project "${projectToDeleteName}"`);
    }
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

  const filteredProjects = searchQuery 
    ? filterAndSortProjects(projects, { searchQuery })
    : projects;

  return {
    projects: filteredProjects,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    createProjectOpen,
    setCreateProjectOpen,
    createSubfolderOpen,
    setCreateSubfolderOpen,
    selectedProjectId,
    selectedFolderId,
    setCoverImageOpen,
    setSetCoverImageOpen,
    projectForCoverImage,
    projectAssets,
    editProjectOpen,
    setEditProjectOpen,
    projectToEdit,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    projectToDeleteName,
    handleCreateProject,
    handleProjectClick,
    handleDeleteProject,
    confirmDeleteProject,
    handleEditProject,
    handleAddSubfolder,
    handleFolderCreated,
    handleSetCoverImage,
    handleProjectUpdated,
    loadProjects
  };
}
