
import { ProjectData } from '../../types/projectTypes';
import { updateProjects } from '../../data/projectStore';

/**
 * Get all projects
 * @returns Array of projects
 */
export const getProjects = (): ProjectData[] => {
  console.log(`Getting all projects`);
  
  // First check localStorage for any projects
  const localProjectsStr = localStorage.getItem('projects');
  if (localProjectsStr) {
    try {
      const localProjects = JSON.parse(localProjectsStr);
      console.log(`Found ${localProjects.length} projects in localStorage`);
      // Update the in-memory store with localStorage data
      updateProjects(localProjects);
      return localProjects;
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
    }
  }
  
  // If no projects in localStorage or error occurred, return in-memory projects
  // Import here to avoid circular dependency
  const { projects } = require('../../data/projectStore');
  return projects;
};

/**
 * Get a project by ID
 * @param projectId - ID of the project to get
 * @returns The project or null if not found
 */
export const getProjectById = (projectId: string): ProjectData | null => {
  console.log(`Getting project by ID: ${projectId}`);
  
  // First try to get from localStorage for most up-to-date data
  const localProjectsStr = localStorage.getItem('projects');
  if (localProjectsStr) {
    try {
      const localProjects = JSON.parse(localProjectsStr);
      const project = localProjects.find((p: ProjectData) => p.id === projectId);
      if (project) {
        console.log(`Found project in localStorage: ${project.name}`);
        return project;
      }
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
    }
  }
  
  // Fall back to in-memory store
  // Import here to avoid circular dependency
  const { projects } = require('../../data/projectStore');
  const project = projects.find(p => p.id === projectId);
  
  if (project) {
    console.log(`Found project in memory: ${project.name}`);
    return project;
  }
  
  console.log(`Project not found: ${projectId}`);
  return null;
};
