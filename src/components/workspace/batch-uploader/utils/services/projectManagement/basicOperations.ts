
import { toast } from 'sonner';
import { ProjectData, ProjectOwner, ProjectLicensing } from '../../types/projectTypes';
import { projects, updateProjects, currentUser } from '../../data/projectStore';

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
