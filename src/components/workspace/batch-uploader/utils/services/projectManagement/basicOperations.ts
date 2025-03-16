
import { toast } from 'sonner';
import { ProjectData, ProjectOwner, ProjectLicensing } from '../../types/projectTypes';
import { projects, updateProjects, currentUser } from '../../data/projectStore';

// Get all projects
export const getProjects = (): ProjectData[] => {
  // Try to get projects from localStorage first
  const projectsJSON = localStorage.getItem('projects');
  if (projectsJSON) {
    try {
      const parsedProjects = JSON.parse(projectsJSON);
      // Update the in-memory projects
      updateProjects(parsedProjects);
      return parsedProjects;
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
    }
  }
  
  // If no projects in localStorage or error parsing, use the in-memory projects
  return [...projects];
};

// Get a project by ID
export const getProjectById = (id: string): ProjectData | undefined => {
  const allProjects = getProjects();
  return allProjects.find(project => project.id === id);
};

// Create a new project
export const createProject = (
  name: string,
  options?: {
    description?: string,
    tags?: string[],
    owners?: ProjectOwner[],
    licensing?: ProjectLicensing,
    parentId?: string
  }
): ProjectData => {
  // Default owner is current user with 100%
  const defaultOwners = [
    { 
      userId: currentUser.id, 
      name: currentUser.name, 
      email: currentUser.email, 
      royaltyPercentage: 100 
    }
  ];

  // Default licensing is standard with basic rights
  const defaultLicensing = {
    type: 'standard',
    usageRights: {
      primaryCampaign: true,
      secondaryBrand: false,
      extendedMarketing: false,
      derivativeWorks: false,
      merchandising: false,
      publicity: false,
      socialMedia: true,
      aiTraining: false
    }
  };

  const newProject: ProjectData = {
    id: `project-${Date.now()}`,
    name,
    description: options?.description,
    tags: options?.tags,
    assets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: currentUser.id,
    owners: options?.owners || defaultOwners,
    licensing: options?.licensing || defaultLicensing,
    subfolders: [],
    parentId: options?.parentId
  };
  
  // Get existing projects from localStorage
  const existingProjects = getProjects();
  const updatedProjects = [...existingProjects, newProject];
  
  // Update in-memory projects
  updateProjects(updatedProjects);
  
  // Also store in localStorage for persistence
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
  return newProject;
};

// Delete a project
export const deleteProject = (id: string): boolean => {
  // Get existing projects
  const existingProjects = getProjects();
  
  // Filter out the project to delete
  const updatedProjects = existingProjects.filter(project => project.id !== id);
  
  // If the length is the same, no project was found to delete
  if (updatedProjects.length === existingProjects.length) {
    return false;
  }
  
  // Update in-memory projects
  updateProjects(updatedProjects);
  
  // Also update localStorage
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
  return true;
};

// Update a project
export const updateProject = (
  id: string,
  updates: Partial<ProjectData>
): boolean => {
  // Get existing projects
  const existingProjects = getProjects();
  
  // Find the project to update
  const projectIndex = existingProjects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) {
    return false;
  }
  
  // Update the project
  const updatedProjects = [...existingProjects];
  updatedProjects[projectIndex] = {
    ...updatedProjects[projectIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  // Update in-memory projects
  updateProjects(updatedProjects);
  
  // Also update localStorage
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
  return true;
};
