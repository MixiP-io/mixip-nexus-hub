
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

// Re-export asset utility functions
export {
  convertFilesToAssets
} from './services/assetConversionUtils';

export {
  findProject,
  updateProjectCoverIfNeeded,
  findAssetInProject
} from './services/projectOperationUtils';

export {
  addAssetsToFolder
} from './services/folderOperationUtils';

// Re-export debugging and data integrity functions
export { 
  logProjects,
  ensureProjectDataIntegrity,
  projects,
  updateProjects,
  currentUser,
  ensureFolderIntegrity,
  initializeFromLocalStorage,
  defaultLicensing
} from './data/projectStore';
