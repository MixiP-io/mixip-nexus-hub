
/**
 * Local storage synchronization utilities
 */
import { projects, updateProjects } from './projectState';
import { ensureProjectDataIntegrity } from './projectIntegrity';

// Helper to safely serialize data for localStorage
const safeStringify = (data: any) => {
  try {
    // Replace Date objects with ISO strings for proper storage and retrieval
    return JSON.stringify(data, (key, value) => {
      // Handle Date objects
      if (value instanceof Date) {
        return value.toISOString();
      }
      // Handle File objects (can't be serialized)
      if (value instanceof File) {
        return null;
      }
      // Handle DataURLs and other preview types
      if (typeof value === 'string' && key === 'preview') {
        // Store data URLs directly - they're designed to be serialized
        if (value.startsWith('data:')) {
          return value;
        }
        // For blob URLs, add a marker to indicate they need regeneration
        else if (value.startsWith('blob:')) {
          console.log(`Storing blob URL reference: ${value.substring(0, 30)}...`);
          return value;
        }
        return value;
      }
      return value;
    });
  } catch (error) {
    console.error('Error stringifying data for localStorage:', error);
    return null;
  }
};

// Check if there's any data in localStorage
export const initializeFromLocalStorage = () => {
  try {
    const storedProjects = localStorage.getItem('projects');
    console.log('Initializing from localStorage, data found:', !!storedProjects);
    
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

// Save projects to localStorage with proper serialization
export const saveProjectsToLocalStorage = () => {
  try {
    const serialized = safeStringify(projects);
    if (serialized) {
      localStorage.setItem('projects', serialized);
      console.log(`Saved ${projects.length} projects to localStorage`);
      
      // Check size used in localStorage (for debugging)
      const usedSpace = new Blob([serialized]).size;
      const usedSpaceMB = (usedSpace / (1024 * 1024)).toFixed(2);
      console.log(`localStorage usage: ${usedSpaceMB} MB`);
      
      // Warn if getting close to localStorage limits (typically 5MB)
      if (usedSpace > 4 * 1024 * 1024) {
        console.warn('WARNING: localStorage usage approaching limit (4+ MB used)');
      }
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// For debugging
export const logProjects = () => {
  console.log('Current projects:', JSON.stringify(projects, null, 2));
};
