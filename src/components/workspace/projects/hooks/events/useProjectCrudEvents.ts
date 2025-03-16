
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
  projectToDelete: string | null;
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
  projectToDeleteName,
  projectToDelete
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
    try {
      // Find the project ID to delete - first try using projectToDelete directly
      let projectId = projectToDelete;
      
      // If that's not available, try finding by name
      if (!projectId) {
        projectId = projects.find(p => p.name === projectToDeleteName)?.id;
      }
      
      if (projectId) {
        // Clear the selected project ID before deletion
        setSelectedProjectId(null);
        
        // Delete the project
        deleteSelectedProject(projectId);
        toast.success(`Project "${projectToDeleteName}" deleted successfully`);
      } else {
        toast.error("Project not found");
      }
      
      // Clear the project to delete state
      setProjectToDelete(null);
      
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
      
      // Clear the state even on error to prevent UI from being stuck
      setProjectToDelete(null);
    }
  }, [projects, projectToDeleteName, projectToDelete, deleteSelectedProject, setProjectToDelete, setSelectedProjectId]);

  return {
    handleCreateProject,
    handleProjectClick,
    handleDeleteProject,
    confirmDeleteProject
  };
};
