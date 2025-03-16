
import { useState } from 'react';
import { UploadFile, FileStatus } from '../../types';

/**
 * Hook for managing the state of files in the uploader
 */
export const useFileState = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [successfulUploads, setSuccessfulUploads] = useState(0);
  
  const updateSuccessfulUploads = () => {
    const completedFiles = files.filter(file => file.status === 'complete').length;
    setSuccessfulUploads(completedFiles);
    return completedFiles;
  };
  
  return {
    files,
    setFiles,
    overallProgress,
    setOverallProgress,
    successfulUploads,
    updateSuccessfulUploads
  };
};
