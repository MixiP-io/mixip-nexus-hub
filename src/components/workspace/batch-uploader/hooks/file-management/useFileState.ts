
import { useState } from 'react';
import { UploadFile, FileStatus } from '../../types';

/**
 * Hook for managing the state of files in the uploader
 */
export const useFileState = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  
  return {
    files,
    setFiles,
    overallProgress,
    setOverallProgress
  };
};
