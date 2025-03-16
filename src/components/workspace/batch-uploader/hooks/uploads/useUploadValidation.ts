
import { toast } from 'sonner';
import { getProjectById } from '../../utils/projectUtils';
import { ensureProjectDataIntegrity } from '../../utils/data/projectStore';

/**
 * Hook for validating upload parameters
 */
export const useUploadValidation = () => {
  const validateUploadParams = (
    files: any[], 
    licenseType: string,
    projectId: string
  ): boolean => {
    console.log(`Validating upload params: files=${files.length}, license=${licenseType}, projectId=${projectId}`);
    
    // Basic validations
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return false;
    }
    
    if (!licenseType) {
      toast.error("Please select a license type");
      return false;
    }
    
    if (!projectId) {
      toast.error("Please select a project to upload");
      return false;
    }
    
    // Force data integrity check before validation
    ensureProjectDataIntegrity();
    
    // Validate project exists - get fresh project data
    const project = getProjectById(projectId);
    if (!project) {
      console.error(`Project not found: ${projectId}`);
      toast.error(`Project not found: ${projectId}`);
      return false;
    }
    
    // Validate project structure explicitly
    if (!project.assets) {
      console.error(`Project ${projectId} assets array is missing completely`);
      toast.error("Project structure is invalid. Please try a different project.");
      return false;
    }
    
    // Validate project assets array exists and is an array
    if (!Array.isArray(project.assets)) {
      console.error(`Project ${projectId} assets array is not an array`);
      toast.error("Project structure is invalid. Please try a different project.");
      return false;
    }
    
    // Validate project subfolders array exists
    if (!Array.isArray(project.subfolders)) {
      console.error(`Project ${projectId} subfolders array is not initialized properly`);
      toast.error("Project structure is invalid. Please try a different project.");
      return false;
    }
    
    console.log('Project validation passed:', project.name);
    console.log('Project structure:', {
      id: project.id,
      name: project.name,
      assetsLength: project.assets.length,
      subfolderLength: project.subfolders.length
    });
    
    return true;
  };
  
  return {
    validateUploadParams
  };
};
