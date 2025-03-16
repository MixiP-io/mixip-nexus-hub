
import { UploadFile, FileStatus } from '../../types';
import { calculateTotalProgress } from '../../utils/uploadUtils';
import { ProgressTrackingProps } from './types';

/**
 * Hook for tracking and updating file progress
 */
export const useProgressTracking = (
  files: UploadFile[],
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>,
  setOverallProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const updateFileProgress = (fileId: string, progress: number) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, progress, status: progress === 100 ? 'processing' : 'uploading' } 
          : f
      )
    );
    
    // Recalculate overall progress
    setTimeout(() => updateOverallProgress(), 0);
  };

  const updateFileStatus = (fileId: string, status: FileStatus, errorMessage?: string) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, status, errorMessage } 
          : f
      )
    );
    
    // Recalculate overall progress
    setTimeout(() => updateOverallProgress(), 0);
  };
  
  const updateOverallProgress = () => {
    setFiles(currentFiles => {
      const newProgress = calculateTotalProgress(currentFiles);
      setOverallProgress(newProgress);
      return currentFiles;
    });
  };
  
  return {
    updateFileProgress,
    updateFileStatus,
    updateOverallProgress
  };
};
