
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  createProject,
  updateProject,
  deleteProject
} from '../../batch-uploader/utils/services/projectService';
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';

export interface UseProjectActionsResult {
  // Project CRUD operations
  createNewProject: (name: string, options?: any) => void;
  updateProjectDetails: (projectId: string, updates: Partial<ProjectData>) => void;
  deleteSelectedProject: (projectId: string) => void;
  
  // Project selection state
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedFolderId: string | null;
  setSelectedFolderId: (id: string | null) => void;
  
  // Refresh function to be called after operations
  refreshProjects: () => void;
}

export const useProjectActions = (refreshProjects: () => void): UseProjectActionsResult => {
  // Selection state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  
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
      if (!projectId) {
        toast.error("Invalid project ID");
        return;
      }
      
      console.log("Updating project with details:", updates);
      const success = updateProject(projectId, updates);
      
      if (success) {
        toast.success("Project updated successfully");
        // Add a small delay before refreshing to ensure state updates complete
        setTimeout(() => {
          refreshProjects(); // Refresh to show updated project
        }, 100);
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
      if (!projectId) {
        toast.error("Invalid project ID");
        return;
      }
      
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

  return {
    createNewProject,
    updateProjectDetails,
    deleteSelectedProject,
    selectedProjectId,
    setSelectedProjectId,
    selectedFolderId,
    setSelectedFolderId,
    refreshProjects
  };
};
