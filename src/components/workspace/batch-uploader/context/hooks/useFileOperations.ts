
import { useCallback } from 'react';
import { toast } from 'sonner';
import { UploaderState } from '../types';
import { getFilePreview, generateUniqueId } from '../../utils/fileUtils';
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
      const newFileObjects: File[] = [];
      
      // Create file objects immediately
      for (const file of filesArray) {
        newFileObjects.push(file);
      }
      
      // Add files to state immediately
      dispatch({ type: 'ADD_FILES', payload: newFileObjects });
      
      // Process each file to create previews
      for (const file of filesArray) {
        if (file.type.startsWith('image/')) {
          try {
            console.log(`Starting preview generation for: ${file.name}`);
            // Generate preview for this file
            const preview = await getFilePreview(file);
            console.log(`Preview generation complete for: ${file.name}`);
            
            // Find the file in the state to update it with the preview
            const fileToUpdate = state.files.find(f => 
              f.file && f.file.name === file.name && f.file.size === file.size
            );
            
            if (fileToUpdate) {
              console.log(`Updating file with preview: ${fileToUpdate.name}`);
              // Update just this file with its preview
              dispatch({ 
                type: 'UPDATE_FILE_PREVIEW', 
                payload: { fileId: fileToUpdate.id, preview } 
              });
            }
          } catch (error) {
            console.error("Error generating preview:", error);
          }
        }
      }
      
      toast.success(`${filesArray.length} files added to upload queue`);
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
