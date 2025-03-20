
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
      // Get files as array
      const filesArray = Array.from(selectedFiles);
      console.log(`Processing ${filesArray.length} files`);
      
      // Add files to state immediately
      dispatch({ type: 'ADD_FILES', payload: filesArray });
      
      // Process each image file to generate previews
      for (const file of filesArray) {
        if (file.type.startsWith('image/')) {
          try {
            console.log(`Starting preview generation for: ${file.name}`);
            const preview = await getFilePreview(file);
            
            if (preview) {
              console.log(`Preview generated for ${file.name}, updating file`);
              
              // Find the matching file in state to update with preview
              const fileId = state.files.find(f => 
                f.file && f.file.name === file.name && f.file.size === file.size
              )?.id;
              
              if (fileId) {
                dispatch({ 
                  type: 'UPDATE_FILE_PREVIEW', 
                  payload: { fileId, preview } 
                });
              }
            }
          } catch (error) {
            console.error(`Error generating preview for ${file.name}:`, error);
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
