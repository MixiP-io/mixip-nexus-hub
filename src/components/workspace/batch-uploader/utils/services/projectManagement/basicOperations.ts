
import { toast } from 'sonner';
import { ProjectData } from '../../types/projectTypes';
import { projects, updateProjects } from '../../data/projectStore';

/**
 * Get all projects
 * @returns Array of projects
 */
export const getProjects = (): ProjectData[] => {
  console.log(`Getting all projects, count: ${projects.length}`);
  
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
  const project = projects.find(p => p.id === projectId);
  if (project) {
    console.log(`Found project in memory: ${project.name}`);
    return project;
  }
  
  console.log(`Project not found: ${projectId}`);
  return null;
};

/**
 * Create a new project
 * @param name - Name of the project
 * @param description - Optional description
 * @returns The newly created project
 */
export const createProject = (name: string, description?: string): ProjectData => {
  console.log(`Creating new project: ${name}`);
  
  const newProject: ProjectData = {
    id: `project-${Date.now()}`,
    name,
    description: description || '',
    assets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user1', // In a real app, this would be the current user's ID
    subfolders: []
  };
  
  // Create a deep copy of the projects array with the new project added
  const updatedProjects = [...projects, newProject];
  
  // Update both in-memory and localStorage
  updateProjects(updatedProjects);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
  toast.success(`Project "${name}" created successfully`);
  console.log(`Project created: ${newProject.id}`);
  
  return newProject;
};

/**
 * Delete a project
 * @param projectId - ID of the project to delete
 * @returns Boolean indicating success
 */
export const deleteProject = (projectId: string): boolean => {
  console.log(`Deleting project: ${projectId}`);
  
  // First get the current projects from localStorage
  const localProjectsStr = localStorage.getItem('projects');
  let currentProjects = projects;
  
  if (localProjectsStr) {
    try {
      currentProjects = JSON.parse(localProjectsStr);
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
    }
  }
  
  const projectIndex = currentProjects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    console.log(`Project not found: ${projectId}`);
    return false;
  }
  
  // Create a deep copy without the deleted project
  const updatedProjects = currentProjects.filter(p => p.id !== projectId);
  
  // Update both in-memory and localStorage
  updateProjects(updatedProjects);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
  console.log(`Project deleted: ${projectId}`);
  return true;
};

/**
 * Update a project's properties
 * @param projectId - ID of the project to update
 * @param updates - Object containing the properties to update
 * @returns Boolean indicating success
 */
export const updateProject = (projectId: string, updates: Partial<ProjectData>): boolean => {
  console.log(`Updating project: ${projectId}`, updates);
  
  // First get the current projects from localStorage
  const localProjectsStr = localStorage.getItem('projects');
  let currentProjects = [...projects]; // Create a copy of the in-memory projects
  
  if (localProjectsStr) {
    try {
      currentProjects = JSON.parse(localProjectsStr);
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
    }
  }
  
  const projectIndex = currentProjects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    console.log(`Project not found for update: ${projectId}`);
    return false;
  }
  
  // Create a deep copy with the updates applied
  const updatedProjects = [...currentProjects];
  updatedProjects[projectIndex] = {
    ...updatedProjects[projectIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  // Update both in-memory and localStorage
  updateProjects(updatedProjects);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
  console.log(`Project updated: ${projectId}`);
  return true;
};
