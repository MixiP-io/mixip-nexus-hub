
import { toast } from 'sonner';
import { UploadFile, FileStatus } from '../../types';

/**
 * Hook for handling file upload execution
 */
export const executeFileUploads = async (
  files: UploadFile[],
  updateFileProgress: (fileId: string, progress: number) => void,
  updateFileStatus: (fileId: string, status: FileStatus, errorMessage?: string) => void,
  updateOverallProgress: () => void
) => {
  const completedFiles: UploadFile[] = [];
  let hasErrors = false;

  // Track how many files we've processed
  let processedCount = 0;

  // Process files one by one
  for (const file of files) {
    // Only process queued files
    if (file.status !== 'queued') {
      console.log(`Skipping file ${file.name} with status ${file.status}`);
      continue;
    }
    
    console.log(`Processing file: ${file.name} (${file.id})`);
    
    try {
      // Update the file progress (using actual progress if possible)
      let progressInterval: any;
      if (!file.file) {
        // If no file object (shouldn't happen), simulate progress
        progressInterval = simulateProgress(file.id, updateFileProgress);
      } else {
        // Start with initial progress
        updateFileProgress(file.id, 5);
        
        // Simulate incremental progress for more responsive UI
        progressInterval = simulateProgress(file.id, updateFileProgress, 5, 80);
      }
      
      // Mark as processing
      updateFileStatus(file.id, 'processing');
      console.log(`File ${file.name} is processing`);
      
      // Clear the progress interval
      clearInterval(progressInterval);
      updateFileProgress(file.id, 100);
      
      // Wait a short time for visual feedback that processing is complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mark as complete
      updateFileStatus(file.id, 'complete');
      console.log(`File ${file.name} is complete`);
      
      // Add to completed files - create a fresh copy to avoid reference issues
      const completedFile: UploadFile = { 
        ...file, 
        status: 'complete' as FileStatus, 
        progress: 100 
      };
      completedFiles.push(completedFile);
      processedCount++;
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      updateFileStatus(file.id, 'error', error instanceof Error ? error.message : 'Upload failed');
      hasErrors = true;
    }
    
    // Update overall progress after each file
    updateOverallProgress();
  }

  console.log(`Completed processing ${processedCount}/${files.length} files. Completed files: ${completedFiles.length}`);
  
  if (completedFiles.length === 0 && files.length > 0) {
    console.error("No files were successfully processed");
    toast.error("No files were processed successfully. Please try again.");
  }

  return { completedFiles, hasErrors };
};

// Helper function to simulate file upload progress
function simulateProgress(
  fileId: string, 
  updateProgress: (id: string, progress: number) => void,
  startAt: number = 0,
  endAt: number = 100
) {
  let progress = startAt;
  const interval = setInterval(() => {
    // Generate a random increment between 1 and 10
    const increment = Math.floor(Math.random() * 5) + 1;
    progress = Math.min(progress + increment, endAt);
    updateProgress(fileId, progress);
    
    if (progress >= endAt) {
      clearInterval(interval);
    }
  }, 200);
  
  return interval;
}
