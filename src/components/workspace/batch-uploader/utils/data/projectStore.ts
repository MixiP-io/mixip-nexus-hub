
/**
 * Project store entry point
 * Re-exports all functionality from the sub-modules
 */

// Re-export state management
export { 
  projects, 
  updateProjects, 
  currentUser 
} from './store/projectState';

// Re-export data integrity utilities
export { 
  ensureProjectDataIntegrity, 
  validateFolderStructure as ensureFolderIntegrity 
} from './store/projectIntegrity';

// Re-export storage sync utilities
export { 
  saveProjectsToLocalStorage,
  loadProjectsFromLocalStorage,
  logProjects
} from './store/storageSync';

// Re-export default values
export { 
  defaultLicensing 
} from './store/defaultValues';

// Import storage functions
import { initializeFromLocalStorage } from './store/storageSync';
import { ensureProjectDataIntegrity } from './store/projectIntegrity';

// Run initialization
initializeFromLocalStorage();

// Run integrity check on startup
ensureProjectDataIntegrity();
