
import { toast } from 'sonner';
import { ProjectOwner, ProjectLicensing } from '../../types/projectTypes';
import { projects, updateProjects } from '../../data/projectStore';

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
