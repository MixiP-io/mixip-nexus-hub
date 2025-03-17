
import { ProjectData } from '../../types/projectTypes';
import { projects, updateProjects } from '../../data/projectStore';
import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from '../../data/store/storageSync';

/**
 * Synchronizes in-memory projects with localStorage
 * @returns Array of synchronized projects
 */
export const syncProjectsWithLocalStorage = (): ProjectData[] => {
  console.log('Synchronizing projects with localStorage');
  
  try {
    // Try to load projects from localStorage first
    const localProjects = loadProjectsFromLocalStorage();
    
    if (localProjects && Array.isArray(localProjects) && localProjects.length > 0) {
      console.log(`Loaded ${localProjects.length} projects from localStorage`);
      updateProjects(localProjects);
      return localProjects;
    } else {
      console.log('No valid projects found in localStorage, using memory state');
    }
  } catch (error) {
    console.error('Error synchronizing with localStorage:', error);
  }
  
  // If no localStorage data or error, return current in-memory projects
  return projects;
};

/**
 * Persists current projects to localStorage
 */
export const persistProjectsToLocalStorage = (): void => {
  console.log(`Persisting ${projects.length} projects to localStorage`);
  
  try {
    saveProjectsToLocalStorage();
  } catch (error) {
    console.error('Error persisting projects to localStorage:', error);
    // Try again with a more direct approach as a backup
    try {
      localStorage.setItem('projects', JSON.stringify(projects, (key, value) => {
        if (value instanceof Date) {
          return {
            __type: 'Date',
            iso: value.toISOString()
          };
        }
        return value;
      }));
      console.log('Successfully saved projects using backup method');
    } catch (backupError) {
      console.error('Backup save also failed:', backupError);
    }
  }
};
