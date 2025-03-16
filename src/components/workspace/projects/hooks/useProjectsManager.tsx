
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
}

export const useProjectsManager = (): UseProjectsManagerResult => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const refreshProjects = useCallback(() => {
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
  }, []);

  return {
    projects: filteredProjects, // Return filtered projects
    isLoading,
    error,
    createNewProject,
    updateProjectDetails,
    deleteSelectedProject,
    refreshProjects,
    searchProjects,
  };
};
