
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { simulateFileUpload } from '../../utils/uploadUtils';

/**
 * Hook for handling file upload execution
 */
export const executeFileUploads = async (
  files: UploadFile[],
  updateFileProgress: (fileId: string, progress: number) => void,
  updateFileStatus: (fileId: string, status: any, errorMessage?: string) => void,
  updateOverallProgress: () => void
) => {
  const completedFiles: UploadFile[] = [];
  let hasErrors = false;

  // Process files one by one
  for (const file of files) {
    // Only process queued files
    if (file.status !== 'queued') {
      console.log(`Skipping file ${file.name} with status ${file.status}`);
      continue;
    }
    
    console.log(`Processing file: ${file.name}`);
    
    try {
      // Simulate upload - in a real app, replace with actual API calls
      await simulateFileUpload(file.id, updateFileProgress);
      
      // Mark as processing
      updateFileStatus(file.id, 'processing');
      console.log(`File ${file.name} is processing`);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mark as complete
      updateFileStatus(file.id, 'complete');
      console.log(`File ${file.name} is complete`);
      
      // Add to completed files
      completedFiles.push(file);
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      updateFileStatus(file.id, 'error', error instanceof Error ? error.message : 'Upload failed');
      hasErrors = true;
    }
    
    // Update overall progress after each file
    updateOverallProgress();
  }

  return { completedFiles, hasErrors };
};
