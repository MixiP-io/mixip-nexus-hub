
import { toast } from 'sonner';
import { ProjectData, ProjectOwner, ProjectLicensing } from '../types/projectTypes';
import { projects, updateProjects, currentUser } from '../data/projectStore';

// Get all projects
export const getProjects = (): ProjectData[] => {
  return [...projects];
};

// Get a project by ID
export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find(project => project.id === id);
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
  
  const updatedProjects = [...projects, newProject];
  updateProjects(updatedProjects);
  
  return newProject;
};

// Update ownership percentages
export const updateProjectOwnership = (
  projectId: string, 
  owners: ProjectOwner[]
): boolean => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return false;
  }
  
  // Validate that percentages add up to 100
  const totalPercentage = owners.reduce((sum, owner) => sum + owner.royaltyPercentage, 0);
  if (totalPercentage !== 100) {
    toast.error('Royalty percentages must add up to 100%');
    return false;
  }
  
  // Update the project with new owners
  const updatedProjects = [...projects];
  updatedProjects[projectIndex].owners = owners;
  updatedProjects[projectIndex].updatedAt = new Date();
  
  updateProjects(updatedProjects);
  return true;
};

// Update licensing and usage rights
export const updateProjectLicensing = (
  projectId: string, 
  licensing: ProjectLicensing
): boolean => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return false;
  }
  
  // Update the project with new licensing
  const updatedProjects = [...projects];
  updatedProjects[projectIndex].licensing = licensing;
  updatedProjects[projectIndex].updatedAt = new Date();
  
  updateProjects(updatedProjects);
  return true;
};

// Filter and sort projects by various criteria
export const filterAndSortProjects = (
  filterOptions?: {
    name?: string;
    tags?: string[];
    createdBy?: string;
    createdAfter?: Date;
    createdBefore?: Date;
    updatedAfter?: Date;
    updatedBefore?: Date;
  },
  sortOptions?: {
    sortBy: 'name' | 'createdAt' | 'updatedAt';
    sortOrder: 'asc' | 'desc';
  }
): ProjectData[] => {
  // Start with a copy of all projects
  let filteredProjects = [...projects];
  
  // Apply filters if provided
  if (filterOptions) {
    // Filter by name (case-insensitive partial match)
    if (filterOptions.name) {
      const searchTerm = filterOptions.name.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by tags (must match at least one)
    if (filterOptions.tags && filterOptions.tags.length > 0) {
      filteredProjects = filteredProjects.filter(project => 
        project.tags && project.tags.some(tag => 
          filterOptions.tags?.includes(tag)
        )
      );
    }
    
    // Filter by creator
    if (filterOptions.createdBy) {
      filteredProjects = filteredProjects.filter(project => 
        project.createdBy === filterOptions.createdBy
      );
    }
    
    // Filter by creation date range
    if (filterOptions.createdAfter) {
      filteredProjects = filteredProjects.filter(project => 
        project.createdAt >= filterOptions.createdAfter!
      );
    }
    
    if (filterOptions.createdBefore) {
      filteredProjects = filteredProjects.filter(project => 
        project.createdAt <= filterOptions.createdBefore!
      );
    }
    
    // Filter by last updated date range
    if (filterOptions.updatedAfter) {
      filteredProjects = filteredProjects.filter(project => 
        project.updatedAt >= filterOptions.updatedAfter!
      );
    }
    
    if (filterOptions.updatedBefore) {
      filteredProjects = filteredProjects.filter(project => 
        project.updatedAt <= filterOptions.updatedBefore!
      );
    }
  }
  
  // Apply sorting if provided
  if (sortOptions) {
    filteredProjects.sort((a, b) => {
      let comparison = 0;
      
      // Sort by the specified field
      switch (sortOptions.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'updatedAt':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
      }
      
      // Apply sort order
      return sortOptions.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
  
  return filteredProjects;
};
