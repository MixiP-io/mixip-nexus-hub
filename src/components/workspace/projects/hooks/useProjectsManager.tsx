
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  filterAndSortProjects
} from '../../batch-uploader/utils/services/projectService';
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';

interface UseProjectsManagerResult {
  projects: ProjectData[];
  isLoading: boolean;
  error: string | null;
  createNewProject: (name: string, options?: any) => void;
  updateProjectDetails: (projectId: string, updates: Partial<ProjectData>) => void;
  deleteSelectedProject: (projectId: string) => void;
  refreshProjects: () => void;
  searchProjects: (searchTerm: string) => void;
  
  // Additional state properties and functions needed by ProjectGrid
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  createProjectOpen: boolean;
  setCreateProjectOpen: (open: boolean) => void;
  createSubfolderOpen: boolean;
  setCreateSubfolderOpen: (open: boolean) => void;
  selectedProjectId: string | null;
  selectedFolderId: string | null;
  setCoverImageOpen: boolean;
  setSetCoverImageOpen: (open: boolean) => void;
  projectForCoverImage: string | null;
  projectAssets: any[];
  editProjectOpen: boolean;
  setEditProjectOpen: (open: boolean) => void;
  projectToEdit: ProjectData | null;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  projectToDelete: string | null;
  projectToDeleteName: string;
  handleCreateProject: (name: string) => void;
  handleProjectClick: (projectId: string) => void;
  handleDeleteProject: (projectId: string) => void;
  confirmDeleteProject: () => void;
  handleEditProject: (projectId: string) => void;
  handleAddSubfolder: (projectId: string) => void;
  handleFolderCreated: () => void;
  handleSetCoverImage: (projectId: string) => void;
  handleProjectUpdated: (projectId: string, updates: Partial<ProjectData>) => void;
  loadProjects: () => void;
}

export const useProjectsManager = (): UseProjectsManagerResult => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Additional state needed by ProjectGrid
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createSubfolderOpen, setCreateSubfolderOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [setCoverImageOpen, setSetCoverImageOpen] = useState(false);
  const [projectForCoverImage, setProjectForCoverImage] = useState<string | null>(null);
  const [projectAssets, setProjectAssets] = useState<any[]>([]);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [projectToDeleteName, setProjectToDeleteName] = useState('');

  // Fetch projects from service
  const fetchProjects = useCallback(() => {
    try {
      setIsLoading(true);
      const loadedProjects = getProjects();
      setProjects(loadedProjects);
      setFilteredProjects(loadedProjects);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Search/filter projects
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProjects(projects);
    } else {
      // Filter projects by name (case-insensitive)
      const filtered = filterAndSortProjects({
        name: searchTerm
      });
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  // Update search query and term together
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const refreshProjects = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  const loadProjects = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createNewProject = useCallback((name: string, options?: any) => {
    try {
      const newProject = createProject(name, options);
      toast.success(`Project "${name}" created successfully`);
      refreshProjects(); // Refresh the project list
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("Failed to create project");
    }
  }, [refreshProjects]);

  const updateProjectDetails = useCallback((projectId: string, updates: Partial<ProjectData>) => {
    try {
      const success = updateProject(projectId, updates);
      if (success) {
        toast.success("Project updated successfully");
        refreshProjects(); // Refresh to show updated project
      } else {
        toast.error("Failed to update project");
      }
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Failed to update project");
    }
  }, [refreshProjects]);

  const deleteSelectedProject = useCallback((projectId: string) => {
    try {
      const success = deleteProject(projectId);
      if (success) {
        toast.success("Project deleted successfully");
        refreshProjects(); // Refresh the project list
      } else {
        toast.error("Failed to delete project");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project");
    }
  }, [refreshProjects]);

  const searchProjects = useCallback((term: string) => {
    setSearchTerm(term);
    setSearchQuery(term);
  }, []);

  // Additional handler functions needed by ProjectGrid
  const handleCreateProject = useCallback((name: string) => {
    createNewProject(name);
    setCreateProjectOpen(false);
  }, [createNewProject]);

  const handleProjectClick = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, []);

  const handleDeleteProject = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToDelete(projectId);
      setProjectToDeleteName(project.name || "Untitled Project");
      setDeleteDialogOpen(true);
    }
  }, [projects]);

  const confirmDeleteProject = useCallback(() => {
    if (projectToDelete) {
      deleteSelectedProject(projectToDelete);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  }, [projectToDelete, deleteSelectedProject]);

  const handleEditProject = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToEdit(project);
      setEditProjectOpen(true);
    }
  }, [projects]);

  const handleAddSubfolder = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setCreateSubfolderOpen(true);
  }, []);

  const handleFolderCreated = useCallback(() => {
    setCreateSubfolderOpen(false);
    refreshProjects();
  }, [refreshProjects]);

  const handleSetCoverImage = useCallback((projectId: string) => {
    setProjectForCoverImage(projectId);
    // Ideally we would load the actual project assets here
    setProjectAssets([]);
    setSetCoverImageOpen(true);
  }, []);

  const handleProjectUpdated = useCallback((projectId: string, updates: Partial<ProjectData>) => {
    updateProjectDetails(projectId, updates);
    setEditProjectOpen(false);
  }, [updateProjectDetails]);

  return {
    projects: filteredProjects, // Return filtered projects
    isLoading,
    error,
    createNewProject,
    updateProjectDetails,
    deleteSelectedProject,
    refreshProjects,
    searchProjects,
    
    // Additional properties and functions
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
};
