
import { useCallback } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { getProjectById } from '../../utils/projectUtils';
import { useFileValidation } from './useFileValidation';
import { useUploadValidation } from './useUploadValidation';

/**
 * Hook for preparing uploads
 */
export const useUploadPreparation = () => {
  const { validateUploadParams } = useUploadValidation();
  const { validateFiles } = useFileValidation();
  
  const prepareUpload = useCallback((
    files: UploadFile[],
    licenseType: string,
    projectId: string,
    folderId: string = 'root'
  ): boolean => {
    // Validate files and upload parameters
    if (!validateFiles(files)) {
      return false;
    }
    
    if (!validateUploadParams(files, licenseType, projectId)) {
      return false;
    }
    
    console.log(`Preparing upload to project: ${projectId}, folder: ${folderId}, license: ${licenseType}`);
    
    // Get project name for logs
    const project = getProjectById(projectId);
    if (project) {
      console.log(`Project before upload: ${project.name} with ${project.assets?.length || 0} assets`);
    } else {
      console.error(`Project not found during preparation: ${projectId}`);
      toast.error('Project not found. Please select a different project.');
      return false;
    }
    
    return true;
  }, [validateUploadParams, validateFiles]);
  
  return {
    prepareUpload
  };
};
