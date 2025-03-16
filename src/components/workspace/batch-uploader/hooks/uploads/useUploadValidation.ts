
import { toast } from 'sonner';
import { getProjectById } from '../../utils/projectUtils';

/**
 * Hook for validating upload parameters
 */
export const useUploadValidation = () => {
  const validateUploadParams = (
    files: any[], 
    licenseType: string,
    projectId: string
  ): boolean => {
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
    
    // Validate project exists
    const project = getProjectById(projectId);
    if (!project) {
      console.error(`Project not found: ${projectId}`);
      toast.error(`Project not found: ${projectId}`);
      return false;
    }
    
    console.log('Project validation passed:', project.name);
    return true;
  };
  
  return {
    validateUploadParams
  };
};
