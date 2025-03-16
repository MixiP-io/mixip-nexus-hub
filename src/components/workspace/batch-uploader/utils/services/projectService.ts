
import { toast } from 'sonner';
import { ProjectData } from '../types/projectTypes';
import { projects, updateProjects, currentUser } from '../data/projectStore';

// Re-export functions from the split modules
export {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  syncProjectsWithLocalStorage,
  persistProjectsToLocalStorage
} from './projectManagement/basicOperations';

export {
  updateProjectOwnership,
  updateProjectLicensing
} from './projectManagement/updateOperations';

export {
  filterAndSortProjects
} from './projectManagement/filterSortOperations';
