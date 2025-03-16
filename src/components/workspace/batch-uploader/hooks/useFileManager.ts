
import { useFileState } from './file-management/useFileState';
import { useFileOperations } from './file-management/useFileOperations';
import { useProgressTracking } from './file-management/useProgressTracking';

/**
 * Hook for managing file uploads, including file state, operations and progress tracking
 */
export const useFileManager = () => {
  // File state management
  const { 
    files, 
    setFiles, 
    overallProgress, 
    setOverallProgress,
    successfulUploads,
    updateSuccessfulUploads
  } = useFileState();
  
  // File operations like adding and removing files
  const { addFiles, removeFile, clearAll } = useFileOperations(files, setFiles);
  
  // Progress tracking for files
  const { updateFileProgress, updateFileStatus, updateOverallProgress } = useProgressTracking(
    files, 
    setFiles, 
    setOverallProgress
  );
  
  return {
    // File state
    files,
    overallProgress,
    successfulUploads,
    updateSuccessfulUploads,
    
    // File operations
    addFiles,
    removeFile,
    clearAll,
    
    // Progress tracking
    updateFileProgress,
    updateFileStatus,
    updateOverallProgress
  };
};
