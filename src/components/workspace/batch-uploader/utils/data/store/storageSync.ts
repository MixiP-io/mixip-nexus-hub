
/**
 * Utilities for synchronizing project data with localStorage
 */
import { projects } from './projectState';

/**
 * Save projects to localStorage with proper serialization of dates
 */
export const saveProjectsToLocalStorage = () => {
  try {
    console.log(`Saving ${projects.length} projects to localStorage`);
    
    // Use a custom replacer to handle Date objects
    const projectsJson = JSON.stringify(projects, (key, value) => {
      if (value instanceof Date) {
        return {
          __type: 'Date',
          iso: value.toISOString()
        };
      }
      return value;
    });
    
    localStorage.setItem('projects', projectsJson);
    console.log(`Successfully saved ${projects.length} projects to localStorage`);
    
    // Verify storage worked correctly
    const storedSize = localStorage.getItem('projects')?.length || 0;
    console.log(`Stored data size: ${(storedSize / 1024).toFixed(2)} KB`);
    
    // Check for potential localStorage limits
    if (storedSize > 4 * 1024 * 1024) {
      console.warn('WARNING: localStorage data is nearing the 5MB limit!');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
    
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded! Consider reducing the data size or implementing a different storage solution.');
    }
    
    return false;
  }
};

/**
 * Load projects from localStorage with proper deserialization of dates
 */
export const loadProjectsFromLocalStorage = () => {
  try {
    const projectsJson = localStorage.getItem('projects');
    
    if (!projectsJson) {
      console.log('No projects found in localStorage');
      return null;
    }
    
    // Use a reviver function to reconstruct Date objects
    const loadedProjects = JSON.parse(projectsJson, (key, value) => {
      if (value && typeof value === 'object' && value.__type === 'Date') {
        return new Date(value.iso);
      }
      return value;
    });
    
    console.log(`Loaded ${loadedProjects.length} projects from localStorage`);
    return loadedProjects;
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    return null;
  }
};
