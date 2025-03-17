
/**
 * Utility functions for project operations
 */
import { projects } from './data/store/projectState';
import { logProjects as logProjectsToConsole } from './data/store/storageSync';

/**
 * Get a project by its ID
 * @param projectId - ID of the project to retrieve
 * @returns The project object or null if not found
 */
export const getProjectById = (projectId: string) => {
  if (!projectId) return null;
  return projects.find(project => project.id === projectId) || null;
};

/**
 * Log all projects to the console for debugging
 */
export const logProjects = () => {
  return logProjectsToConsole();
};
