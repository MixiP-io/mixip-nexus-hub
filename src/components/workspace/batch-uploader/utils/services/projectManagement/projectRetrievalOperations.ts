
import { ProjectData } from '../../types/projectTypes';
import { projects, updateProjects } from '../../data/projectStore';
import { saveProjectsToLocalStorage } from '../../data/store/storageSync';

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
      const localProjects = JSON.parse(localProjectsStr, (key, value) => {
        // Restore Date objects
        if (value && typeof value === 'object' && value.__type === 'Date') {
          return new Date(value.iso);
        }
        return value;
      });
      
      console.log(`Found ${localProjects.length} projects in localStorage`);
      
      // Update the in-memory store with localStorage data
      updateProjects(localProjects);
      
      // Save back to localStorage to ensure proper date serialization
      saveProjectsToLocalStorage();
      
      return localProjects;
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
    }
  }
  
  // If no projects in localStorage or error occurred, return in-memory projects
  return projects;
};

/**
 * Get a project by ID
 * @param projectId - ID of the project to get
 * @returns The project or null if not found
 */
export const getProjectById = (projectId: string): ProjectData | null => {
  if (!projectId) {
    console.error('getProjectById called with invalid ID:', projectId);
    return null;
  }
  
  console.log(`Getting project by ID: ${projectId}`);
  
  // First try to get from localStorage for most up-to-date data
  const localProjectsStr = localStorage.getItem('projects');
  if (localProjectsStr) {
    try {
      const localProjects = JSON.parse(localProjectsStr, (key, value) => {
        // Restore Date objects
        if (value && typeof value === 'object' && value.__type === 'Date') {
          return new Date(value.iso);
        }
        return value;
      });
      
      const project = localProjects.find((p: ProjectData) => p.id === projectId);
      if (project) {
        console.log(`Found project in localStorage: ${project.name}`);
        
        // Debug project structure
        console.log('Project structure from localStorage:', {
          id: project.id,
          rootAssets: project.assets?.length || 0,
          subfolders: project.subfolders?.length || 0
        });
        
        // Log all project folders and their assets for debugging
        if (project.subfolders && project.subfolders.length > 0) {
          console.log('--------------------------------');
          console.log('PROJECT FOLDERS FROM LOCALSTORAGE:');
          project.subfolders.forEach((folder: any) => {
            console.log(`- Folder "${folder.name}" (${folder.id}): ${folder.assets?.length || 0} assets`);
            
            // If folder has assets, list first 2 with their details
            if (folder.assets && folder.assets.length > 0) {
              folder.assets.slice(0, 2).forEach((asset: any, index: number) => {
                console.log(`  [Asset ${index + 1}] ID: ${asset.id}, Name: ${asset.name}, FolderId: ${asset.folderId || 'none'}`);
              });
            }
          });
          console.log('--------------------------------');
        }
        
        return project;
      }
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
    }
  }
  
  // Fall back to in-memory store
  const project = projects.find(p => p.id === projectId);
  
  if (project) {
    console.log(`Found project in memory: ${project.name}`);
    return project;
  }
  
  console.log(`Project not found: ${projectId}`);
  return null;
};
