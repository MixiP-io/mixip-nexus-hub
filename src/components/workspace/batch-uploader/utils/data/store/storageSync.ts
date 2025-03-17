
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
        return {
          __type: 'Date',
          iso: value.toISOString()
        };
      }
      // Handle File objects (can't be serialized)
      if (value instanceof File) {
        return null;
      }
      // Handle DataURLs for images
      if (typeof value === 'string' && key === 'preview' && value.startsWith('data:')) {
        return value; // Preserve data URLs
      }
      return value;
    });
  } catch (error) {
    console.error('Error stringifying data for localStorage:', error);
    return null;
  }
};

// Parse JSON with reviver to restore dates
const safeParse = (jsonString: string) => {
  try {
    return JSON.parse(jsonString, (key, value) => {
      // Restore Date objects
      if (value && typeof value === 'object' && value.__type === 'Date') {
        return new Date(value.iso);
      }
      return value;
    });
  } catch (error) {
    console.error('Error parsing data from localStorage:', error);
    return null;
  }
};

// Check if there's any data in localStorage
export const initializeFromLocalStorage = () => {
  try {
    console.log('Initializing from localStorage');
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const parsedProjects = safeParse(storedProjects);
      if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
        console.log('Successfully loaded projects from localStorage:', parsedProjects.length);
        updateProjects(parsedProjects);
        
        // Debug: Log the first project structure
        if (parsedProjects[0]) {
          console.log('First project structure:', {
            id: parsedProjects[0].id,
            name: parsedProjects[0].name,
            assetsCount: parsedProjects[0].assets?.length || 0,
            foldersCount: parsedProjects[0].subfolders?.length || 0
          });
          
          // Log all folders and their asset counts
          if (parsedProjects[0].subfolders && parsedProjects[0].subfolders.length > 0) {
            console.log('Folders in first project:');
            parsedProjects[0].subfolders.forEach((folder: any) => {
              console.log(`- Folder "${folder.name}": ${folder.assets?.length || 0} assets`);
            });
          }
        }
        
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
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// For debugging
export const logProjects = () => {
  console.log('Current projects:', JSON.stringify(projects, null, 2));
};
