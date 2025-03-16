
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
      // First ensure we have a valid projectId to delete
      if (projectToDelete) {
        console.log("Starting project deletion process for ID:", projectToDelete);
        
        // Always clear the selected project ID before deletion to prevent UI issues
        setSelectedProjectId(null);
        
        // Delete the project
        deleteSelectedProject(projectToDelete);
        toast.success(`Project "${projectToDeleteName}" deleted successfully`);
      } else {
        console.error("No project ID to delete:", { projectToDelete, projectToDeleteName });
        toast.error("Project not found");
      }
      
      // Clear the project to delete state
      setProjectToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
      
      // Clear the state even on error to prevent UI from being stuck
      setProjectToDelete(null);
      setSelectedProjectId(null);
    }
  }, [projectToDeleteName, projectToDelete, deleteSelectedProject, setProjectToDelete, setSelectedProjectId]);

  return {
    handleCreateProject,
    handleProjectClick,
    handleDeleteProject,
    confirmDeleteProject
  };
};
