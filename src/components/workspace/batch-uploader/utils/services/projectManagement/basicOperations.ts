
/**
 * Basic project operations
 * This file re-exports operations from more specific files
 */

// Re-export all operations
export { 
  getProjects,
  getProjectById 
} from './projectRetrievalOperations';

export { 
  createProject 
} from './projectCreateOperations';

export { 
  updateProject 
} from './projectUpdateOperations';

export { 
  deleteProject 
} from './projectDeleteOperations';

export {
  syncProjectsWithLocalStorage,
  persistProjectsToLocalStorage
} from './syncOperations';
