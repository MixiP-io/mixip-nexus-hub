
import { useState, useEffect } from 'react';
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';
import { useProjectLoading } from './useProjectLoading';
import { useProjectActions } from './useProjectActions';
import { useDialogState } from './useDialogState';
import { useProjectEventHandlers } from './useProjectEventHandlers';
import { useViewSettings } from './useViewSettings';

export interface UseProjectsManagerResult {
  // Project data
  projects: ProjectData[];
  isLoading: boolean;
  error: string | null;
  
  // Core CRUD operations
  createNewProject: (name: string, options?: any) => void;
  updateProjectDetails: (projectId: string, updates: Partial<ProjectData>) => void;
  deleteSelectedProject: (projectId: string) => void;
  refreshProjects: () => void;
  searchProjects: (searchTerm: string) => void;
  
  // View settings
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Dialog states
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
  
  // Event handlers
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
  // View settings (search & grid/list)
  const { 
    searchQuery, 
    setSearchQuery,
    viewMode,
    setViewMode
  } = useViewSettings();
  
  // Project loading and filtering
  const { 
    projects, 
    isLoading, 
    error, 
    refreshProjects,
    loadProjects
  } = useProjectLoading(searchQuery);
  
  // Project CRUD operations and selection state
  const { 
    createNewProject,
    updateProjectDetails,
    deleteSelectedProject,
    selectedProjectId,
    setSelectedProjectId,
    selectedFolderId,
    setSelectedFolderId
  } = useProjectActions(refreshProjects);
  
  // Dialog state management
  const {
    createProjectOpen,
    setCreateProjectOpen,
    createSubfolderOpen,
    setCreateSubfolderOpen,
    setCoverImageOpen,
    setSetCoverImageOpen,
    projectForCoverImage,
    setProjectForCoverImage,
    projectAssets,
    setProjectAssets,
    editProjectOpen,
    setEditProjectOpen,
    projectToEdit,
    setProjectToEdit,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    setProjectToDelete,
    projectToDeleteName,
    setProjectToDeleteName
  } = useDialogState();
  
  // Event handlers for UI interactions
  const {
    handleCreateProject,
    handleProjectClick,
    handleDeleteProject,
    confirmDeleteProject,
    handleEditProject,
    handleAddSubfolder,
    handleFolderCreated,
    handleSetCoverImage,
    handleProjectUpdated,
    searchProjects
  } = useProjectEventHandlers({
    projects,
    setSelectedProjectId,
    setCreateProjectOpen,
    setCreateSubfolderOpen,
    setProjectToDelete,
    setProjectToDeleteName,
    setDeleteDialogOpen,
    setProjectToEdit,
    setEditProjectOpen,
    setProjectForCoverImage,
    setSetCoverImageOpen,
    refreshProjects,
    createNewProject,
    deleteSelectedProject,
    projectToDeleteName  // Add this missing prop
  });

  return {
    // Project data
    projects,
    isLoading,
    error,
    
    // Core CRUD operations
    createNewProject,
    updateProjectDetails,
    deleteSelectedProject,
    refreshProjects,
    searchProjects,
    
    // View settings
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    
    // Dialog states
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
    
    // Event handlers
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
