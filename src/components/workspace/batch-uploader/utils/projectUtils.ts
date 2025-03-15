
/**
 * Project utilities index file
 * Re-exports all project-related functions and types
 */

// Re-export types
export type { 
  ProjectData, 
  ProjectOwner, 
  ProjectLicensing, 
  ProjectFolder, 
  ProjectAsset 
} from './types/projectTypes';

// Re-export project functions
export { 
  getProjects,
  getProjectById,
  createProject,
  updateProjectOwnership,
  updateProjectLicensing
} from './services/projectService';

// Re-export folder functions
export {
  createSubfolder,
  getAllFoldersForProject
} from './services/folderService';

// Re-export asset functions
export {
  addFilesToProject
} from './services/assetService';

// Re-export debugging functions
export { logProjects } from './data/projectStore';
