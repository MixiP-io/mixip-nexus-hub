import { useCallback } from 'react';
import { toast } from 'sonner';
import { getProjectById, updateProject } from '../../batch-uploader/utils/services/projectService';
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';

export interface UseProjectEventHandlersProps {
  projects: ProjectData[];
  setSelectedProjectId: (id: string | null) => void;
  setCreateProjectOpen: (open: boolean) => void;
  setCreateSubfolderOpen: (open: boolean) => void;
  setProjectToDelete: (id: string | null) => void;
  setProjectToDeleteName: (name: string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setProjectToEdit: (project: ProjectData | null) => void;
  setEditProjectOpen: (open: boolean) => void;
  setProjectForCoverImage: (id: string | null) => void;
  setSetCoverImageOpen: (open: boolean) => void;
  refreshProjects: () => void;
  createNewProject: (name: string) => void;
  deleteSelectedProject: (id: string) => void;
  projectToDeleteName: string;
}

export interface UseProjectEventHandlersResult {
  handleCreateProject: (name: string) => void;
  handleProjectClick: (projectId: string) => void;
  handleDeleteProject: (projectId: string) => void;
  confirmDeleteProject: () => void;
  handleEditProject: (projectId: string) => void;
  handleAddSubfolder: (projectId: string) => void;
  handleFolderCreated: () => void;
  handleSetCoverImage: (projectId: string) => void;
  handleProjectUpdated: (projectId: string, updates: Partial<ProjectData>) => void;
  searchProjects: (term: string) => void;
}

export const useProjectEventHandlers = ({
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
  projectToDeleteName
}: UseProjectEventHandlersProps): UseProjectEventHandlersResult => {
  
  const handleCreateProject = useCallback((name: string) => {
    createNewProject(name);
    setCreateProjectOpen(false);
  }, [createNewProject, setCreateProjectOpen]);

  const handleProjectClick = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, [setSelectedProjectId]);

  const handleDeleteProject = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToDelete(projectId);
      setProjectToDeleteName(project.name || "Untitled Project");
      setDeleteDialogOpen(true);
    }
  }, [projects, setProjectToDelete, setProjectToDeleteName, setDeleteDialogOpen]);

  const confirmDeleteProject = useCallback(() => {
    const projectToDelete = projects.find(p => 
      p.id === projects.find(p => p.name === projectToDeleteName)?.id
    )?.id;
    
    setProjectToDelete(null);
    
    if (projectToDelete) {
      deleteSelectedProject(projectToDelete);
    }
    
    setDeleteDialogOpen(false);
  }, [projects, projectToDeleteName, deleteSelectedProject, setProjectToDelete, setDeleteDialogOpen]);

  const handleEditProject = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      console.log('Setting project for edit:', project.name);
      setProjectToEdit(project);
      setEditProjectOpen(true);
    } else {
      console.error('Project not found for edit:', projectId);
      toast.error('Error: Project not found');
    }
  }, [projects, setProjectToEdit, setEditProjectOpen]);

  const handleAddSubfolder = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setCreateSubfolderOpen(true);
  }, [setSelectedProjectId, setCreateSubfolderOpen]);

  const handleFolderCreated = useCallback(() => {
    setCreateSubfolderOpen(false);
    refreshProjects();
  }, [setCreateSubfolderOpen, refreshProjects]);

  const handleSetCoverImage = useCallback((projectId: string) => {
    setProjectForCoverImage(projectId);
    setSetCoverImageOpen(true);
  }, [setProjectForCoverImage, setSetCoverImageOpen]);

  const handleProjectUpdated = useCallback((projectId: string, updates: Partial<ProjectData>) => {
    console.log('Handling project update:', projectId, updates);
    
    try {
      const success = updateProject(projectId, updates);
      if (success) {
        toast.success('Project updated successfully');
        setEditProjectOpen(false);
        setTimeout(() => {
          refreshProjects();
        }, 100);
      } else {
        toast.error('Failed to update project');
      }
    } catch (err) {
      console.error('Error updating project:', err);
      toast.error('An error occurred while updating the project');
    }
  }, [refreshProjects, setEditProjectOpen]);

  const searchProjects = useCallback((term: string) => {
    console.log('Searching for projects:', term);
  }, []);

  return {
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
  };
};
