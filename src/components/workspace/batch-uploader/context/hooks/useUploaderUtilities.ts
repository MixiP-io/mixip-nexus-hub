
import { useCallback } from 'react';
import { formatFileSize } from '../../utils/formatUtils';
import { calculateTotalSize } from '../../utils/uploadUtils';
import { UploaderState } from '../types';

/**
 * Hook for utility functions used in the uploader
 */
export const useUploaderUtilities = (state: UploaderState) => {
  // Utility functions
  const calculateStateTotalSize = useCallback(() => {
    return calculateTotalSize(state.files);
  }, [state.files]);

  return {
    formatFileSize,
    calculateTotalSize: calculateStateTotalSize
  };
};
