
import { toast } from 'sonner';
import { ProjectAsset } from '../../types/projectTypes';
import { projects, updateProjects } from '../../data/projectStore';
import { findProject, findAssetInProject } from '../projectOperationUtils';

/**
 * Set a project's cover image
 * @param projectId - ID of the project to update
 * @param assetId - ID of the asset to use as cover image
 * @returns Boolean indicating if the cover image was set
 */
export const setProjectCoverImage = (projectId: string, assetId: string): boolean => {
  const projectData = findProject(projectId);
  
  if (!projectData) {
    return false;
  }
  
  const { projectIndex, project } = projectData;
  
  // Find the asset in the project
  const targetAsset = findAssetInProject(project, assetId);
  
  if (!targetAsset) {
    toast.error(`Asset not found in project`);
    return false;
  }
  
  // Update the project with the new cover image
  const updatedProjects = [...projects];
  updatedProjects[projectIndex].coverImage = targetAsset.preview;
  updatedProjects[projectIndex].updatedAt = new Date();
  
  updateProjects(updatedProjects);
  toast.success(`Project cover image updated`);
  
  return true;
};
