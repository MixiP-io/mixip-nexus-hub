
import { useCallback } from 'react';
import { toast } from 'sonner';
import { UploaderState } from '../types';
import { getFilePreview } from '../../utils/fileUtils';
import { UploadFile, FileStatus } from '../../types';

/**
 * Hook for file-related operations (adding, removing, updating files)
 */
export const useFileOperations = (state: UploaderState, dispatch: React.Dispatch<any>) => {
  // Handle file selection from input
  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }
    
    try {
      // Process files before dispatching to generate previews
      const filesArray = Array.from(selectedFiles);
      
      // Process each file to create previews
      const processedFiles: File[] = [];
      
      for (const file of filesArray) {
        processedFiles.push(file);
        
        // Generate preview asynchronously
        if (file.type.startsWith('image/')) {
          try {
            const preview = await getFilePreview(file);
            // Once preview is ready, update the file in state
            const newFiles = state.files.map(f => {
              if (f.file === file) {
                return { ...f, preview };
              }
              return f;
            });
            if (newFiles.some(f => f.file === file)) {
              dispatch({ type: 'ADD_FILES', payload: [] }); // Dummy dispatch to trigger update
            }
          } catch (error) {
            console.error("Error generating preview:", error);
          }
        }
      }
      
      dispatch({ type: 'ADD_FILES', payload: processedFiles });
      toast.success(`${processedFiles.length} files added to upload queue`);
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Error processing files");
    } finally {
      // Reset the input value to allow selecting the same file again
      if (event.target) {
        event.target.value = '';
      }
    }
  }, [state.files, dispatch]);
  
  // File Management Actions
  const removeFile = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FILE', payload: id });
  }, [dispatch]);
  
  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_FILES' });
  }, [dispatch]);
  
  const updateFileProgress = useCallback((fileId: string, progress: number) => {
    dispatch({ 
      type: 'UPDATE_FILE_PROGRESS', 
      payload: { fileId, progress } 
    });
  }, [dispatch]);
  
  const updateFileStatus = useCallback((fileId: string, status: FileStatus, errorMessage?: string) => {
    dispatch({ 
      type: 'UPDATE_FILE_STATUS', 
      payload: { fileId, status, errorMessage } 
    });
  }, [dispatch]);

  return {
    handleFileSelect,
    removeFile,
    clearAll,
    updateFileProgress,
    updateFileStatus
  };
};
