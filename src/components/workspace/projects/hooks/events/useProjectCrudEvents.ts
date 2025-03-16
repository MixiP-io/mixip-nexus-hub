
import { useCallback } from 'react';
import { toast } from 'sonner';
import { ProjectData } from '../../../batch-uploader/utils/types/projectTypes';

interface UseProjectCrudEventsProps {
  projects: ProjectData[];
  setCreateProjectOpen: (open: boolean) => void;
  setSelectedProjectId: (id: string | null) => void;
  setProjectToDelete: (id: string | null) => void;
  setProjectToDeleteName: (name: string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  createNewProject: (name: string) => void;
  deleteSelectedProject: (projectId: string) => void;
  projectToDeleteName: string;
}

export const useProjectCrudEvents = ({
  projects,
  setCreateProjectOpen,
  setSelectedProjectId,
  setProjectToDelete,
  setProjectToDeleteName,
  setDeleteDialogOpen,
  createNewProject,
  deleteSelectedProject,
  projectToDeleteName
}: UseProjectCrudEventsProps) => {
  
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
    // Find the project ID based on the name we stored
    const projectId = projects.find(p => p.name === projectToDeleteName)?.id;
    
    // Clear the project to delete state
    setProjectToDelete(null);
    
    // Only attempt to delete if we found a valid project ID
    if (projectId) {
      deleteSelectedProject(projectId);
    }
    
    // Close the dialog
    setDeleteDialogOpen(false);
  }, [projects, projectToDeleteName, deleteSelectedProject, setProjectToDelete, setDeleteDialogOpen]);

  return {
    handleCreateProject,
    handleProjectClick,
    handleDeleteProject,
    confirmDeleteProject
  };
};
