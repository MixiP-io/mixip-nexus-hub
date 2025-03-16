
import { toast } from 'sonner';
import { ProjectData } from '../../types/projectTypes';
import { projects, updateProjects, currentUser } from '../../data/projectStore';

/**
 * Create a new project
 * @param name - Name of the project
 * @param options - Optional project properties
 * @returns The newly created project
 */
export const createProject = (name: string, options?: Partial<Omit<ProjectData, 'id' | 'createdAt' | 'updatedAt'>>): ProjectData => {
  console.log(`Creating new project: ${name}`);
  
  const newProject: ProjectData = {
    id: `project-${Date.now()}`,
    name,
    description: options?.description || '',
    tags: options?.tags || [],
    assets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: currentUser.id,
    owners: options?.owners || [
      {
        userId: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        royaltyPercentage: 100
      }
    ],
    licensing: options?.licensing || {
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
    },
    subfolders: [],
    parentId: options?.parentId
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
