
/**
 * Utility functions for project operations
 */
import { projects } from './data/store/projectState';
import { logProjects as logProjectsToConsole } from './data/store/storageSync';

// Re-export types from projectTypes.ts
export type { 
  ProjectData, 
  ProjectOwner, 
  ProjectLicensing, 
  ProjectFolder, 
  ProjectAsset 
} from './types/projectTypes';

// Re-export from projectService
export { 
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  updateProjectOwnership,
  updateProjectLicensing,
  filterAndSortProjects
} from './services/projectService';

// Re-export folder functions
export {
  createSubfolder,
  getAllFoldersForProject
} from './services/folderService';

// Re-export asset functions
export {
  addFilesToProject,
  setProjectCoverImage
} from './services/assetService';

/**
 * Get a project by its ID
 * @param projectId - ID of the project to retrieve
 * @returns The project object or null if not found
 */
export const getProjectById = (projectId: string) => {
  if (!projectId) return null;
  return projects.find(project => project.id === projectId) || null;
};

/**
 * Log all projects to the console for debugging
 */
export const logProjects = () => {
  return logProjectsToConsole();
};
