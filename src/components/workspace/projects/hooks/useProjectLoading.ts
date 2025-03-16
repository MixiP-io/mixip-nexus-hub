
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  getProjects,
  filterAndSortProjects
} from '../../batch-uploader/utils/services/projectService';
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';

export interface UseProjectLoadingResult {
  projects: ProjectData[];
  isLoading: boolean;
  error: string | null;
  loadProjects: () => void;
  refreshProjects: () => void;
}

export const useProjectLoading = (searchTerm: string): UseProjectLoadingResult => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from service
  const fetchProjects = useCallback(() => {
    try {
      setIsLoading(true);
      const loadedProjects = getProjects();
      setProjects(loadedProjects);
      
      // Filter projects by search term if provided
      if (searchTerm && searchTerm.trim() !== '') {
        const filtered = filterAndSortProjects({
          name: searchTerm
        });
        setFilteredProjects(filtered);
      } else {
        setFilteredProjects(loadedProjects);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  // Initial load
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects when search term changes
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

  // Alias for refreshProjects for better semantics in some contexts
  const loadProjects = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects: filteredProjects,
    isLoading,
    error,
    loadProjects,
    refreshProjects
  };
};
