
import { toast } from 'sonner';
import { getProjectById, ensureProjectDataIntegrity } from '../../utils/data/projectStore';

/**
 * Validates project before upload
 * @returns true if project is valid, false otherwise
 */
export const validateProject = (projectId: string): boolean => {
  // First ensure project data integrity
  ensureProjectDataIntegrity();
  
  // Double-check project exists before proceeding
  const projectExists = getProjectById(projectId);
  if (!projectExists) {
    console.error(`Project ${projectId} not found before starting upload`);
    toast.error(`Project ${projectId} not found before starting upload`);
    return false;
  }

  return true;
};
