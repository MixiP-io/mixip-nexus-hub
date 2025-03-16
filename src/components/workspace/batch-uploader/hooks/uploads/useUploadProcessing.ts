
import { validateProject } from './useProjectValidation';
import { executeFileUploads } from './useUploadExecution';

/**
 * Hook for handling the core upload processing logic
 */
export const useUploadProcessing = () => {
  // Core upload process
  const processUploadFiles = async (
    files: any[],
    projectId: string,
    updateFileProgress: (fileId: string, progress: number) => void,
    updateFileStatus: (fileId: string, status: any, errorMessage?: string) => void,
    updateOverallProgress: () => void
  ) => {
    // Validate project
    if (!validateProject(projectId)) {
      return { completedFiles: [], hasErrors: true };
    }
    
    console.log(`Processing ${files.length} files for upload`);
    updateOverallProgress(); // Calculate initial progress
    
    // Execute file uploads
    const { completedFiles, hasErrors } = await executeFileUploads(
      files, 
      updateFileProgress, 
      updateFileStatus, 
      updateOverallProgress
    );
    
    console.log(`Completed files: ${completedFiles.length}, hasErrors: ${hasErrors}`);
    
    return { completedFiles, hasErrors };
  };
  
  return {
    processUploadFiles
  };
};
