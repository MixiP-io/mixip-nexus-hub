
import { ProjectData } from '../../types/projectTypes';
import { updateProjects } from '../../data/projectStore';

/**
 * Synchronizes in-memory projects with localStorage
 * @returns Array of synchronized projects
 */
export const syncProjectsWithLocalStorage = (): ProjectData[] => {
  console.log('Synchronizing projects with localStorage');
  
  try {
    const localProjectsStr = localStorage.getItem('projects');
    if (localProjectsStr) {
      const localProjects = JSON.parse(localProjectsStr);
      updateProjects(localProjects);
      return localProjects;
    }
  } catch (error) {
    console.error('Error synchronizing with localStorage:', error);
  }
  
  // If no localStorage data or error, return current in-memory projects
  const { projects } = require('../../data/projectStore');
  return projects;
};

/**
 * Persists current projects to localStorage
 */
export const persistProjectsToLocalStorage = (projectsToSave: ProjectData[]): void => {
  console.log(`Persisting ${projectsToSave.length} projects to localStorage`);
  
  try {
    localStorage.setItem('projects', JSON.stringify(projectsToSave));
  } catch (error) {
    console.error('Error persisting projects to localStorage:', error);
  }
};
