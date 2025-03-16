
/**
 * Local storage synchronization utilities
 */
import { projects, updateProjects } from './projectState';
import { ensureProjectDataIntegrity } from './projectIntegrity';

// Check if there's any data in localStorage
export const initializeFromLocalStorage = () => {
  try {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
        updateProjects(parsedProjects);
        console.log('Loaded projects from localStorage:', parsedProjects.length);
        
        // Ensure data integrity of loaded projects
        ensureProjectDataIntegrity();
      }
    }
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    // If localStorage is corrupted, use the default projects
    localStorage.removeItem('projects');
    // Re-initialize with default values and save to localStorage
    ensureProjectDataIntegrity();
  }
};

// For debugging
export const logProjects = () => {
  console.log('Current projects:', JSON.stringify(projects, null, 2));
};
