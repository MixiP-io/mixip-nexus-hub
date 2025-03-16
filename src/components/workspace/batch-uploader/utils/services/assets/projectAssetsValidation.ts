
import { toast } from 'sonner';
import { ProjectAsset } from '../../types/projectTypes';
import { findProject } from '../projectOperationUtils';
import { ensureProjectDataIntegrity } from '../../data/projectStore';

/**
 * Validates project and prepares it for asset addition
 * @param projectId - ID of the project to validate
 * @returns Object containing validation result and project data if successful
 */
export const validateProjectForAssets = (projectId: string): { 
  isValid: boolean;
  projectIndex?: number;
  project?: any;
} => {
  console.log(`[projectAssetsValidation] Validating project: ${projectId}`);
  
  // Force an integrity check before proceeding
  ensureProjectDataIntegrity();
  
  // Find the project
  const projectData = findProject(projectId);
  if (!projectData) {
    console.error(`[projectAssetsValidation] Project not found: ${projectId}`);
    toast.error(`Project not found: ${projectId}`);
    return { isValid: false };
  }
  
  const { projectIndex, project } = projectData;
  console.log(`[projectAssetsValidation] Project found at index ${projectIndex}: ${project.name}`);
  
  return { 
    isValid: true,
    projectIndex,
    project
  };
};

/**
 * Ensures project is properly structured for asset addition
 * @param updatedProjects - Array of projects
 * @param projectIndex - Index of the project to validate
 * @returns The validated and structured projects array
 */
export const ensureProjectStructure = (updatedProjects: any[], projectIndex: number): any[] => {
  // Ensure project is properly structured before proceeding
  if (!updatedProjects[projectIndex]) {
    console.error('[projectAssetsValidation] Project index is invalid');
    toast.error('Internal error: Project not found at index');
    throw new Error('Project index is invalid');
  }
  
  // Double-check that arrays are properly initialized
  if (!Array.isArray(updatedProjects[projectIndex].assets)) {
    console.log('[projectAssetsValidation] Initializing assets array for project');
    updatedProjects[projectIndex].assets = [];
  }
  
  if (!Array.isArray(updatedProjects[projectIndex].subfolders)) {
    console.log('[projectAssetsValidation] Initializing subfolders array for project');
    updatedProjects[projectIndex].subfolders = [];
  }
  
  return updatedProjects;
};
