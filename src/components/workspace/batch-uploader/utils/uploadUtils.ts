
import { UploadFile, FileStatus } from '../types';

// Simulates uploading a file with realistic progress
export const simulateFileUpload = (fileId: string, progressCallback: (id: string, progress: number) => void): Promise<void> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      // Realistic progress simulation - faster at start, slower at end
      const increment = Math.max(1, (100 - progress) / 10);
      progress += increment;
      
      if (progress >= 99.5) {
        clearInterval(interval);
        progressCallback(fileId, 100);
        resolve();
      } else {
        progressCallback(fileId, progress);
      }
    }, 200);
  });
};

// Calculates the overall progress based on all files
export const calculateTotalProgress = (files: UploadFile[]): number => {
  if (files.length === 0) {
    return 0;
  }
  
  let completedFiles = 0;
  let totalProgress = 0;
  
  files.forEach(file => {
    if (file.status === 'complete') {
      completedFiles++;
      totalProgress += 100;
    } else if (file.status === 'processing') {
      totalProgress += 100; // Count processing as complete for progress bar
    } else if (file.status === 'uploading') {
      totalProgress += file.progress;
    }
    // Queued files contribute 0 to progress
  });
  
  return Math.round(totalProgress / files.length);
};

// Calculate total file size
export const calculateTotalSize = (files: UploadFile[]): number => {
  return files.reduce((total, file) => total + file.size, 0);
};
