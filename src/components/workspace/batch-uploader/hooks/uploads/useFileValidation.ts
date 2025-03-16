
import { toast } from 'sonner';
import { UploadFile } from '../../types';

/**
 * Hook for file validation logic
 */
export const useFileValidation = () => {
  const validateFiles = (files: UploadFile[]): boolean => {
    if (!files || files.length === 0) {
      toast.error('Please add files to upload');
      return false;
    }
    
    // Add more file validation checks as needed
    return true;
  };
  
  return {
    validateFiles
  };
};
