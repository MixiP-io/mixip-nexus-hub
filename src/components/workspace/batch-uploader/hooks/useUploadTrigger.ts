
import { useEffect } from 'react';

export const useUploadTrigger = (
  triggerFileInput: boolean,
  selectedProject: string | null,
  filesLength: number,
  isUploading: boolean,
  openFileInput: () => void,
  setTriggerFileInput: (value: boolean) => void
) => {
  // Automatically trigger file input when arriving from empty folder view
  useEffect(() => {
    if (triggerFileInput && selectedProject && !filesLength && !isUploading) {
      console.log('[CRITICAL] Auto-triggering file selection from empty project navigation');
      // Add slight delay to ensure UI is ready
      setTimeout(() => {
        openFileInput();
        setTriggerFileInput(false); // Reset flag after triggering
      }, 800);
    }
  }, [triggerFileInput, selectedProject, filesLength, isUploading, openFileInput, setTriggerFileInput]);
};
