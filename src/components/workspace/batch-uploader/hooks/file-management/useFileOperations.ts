
import { useState } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { getFilePreview, generateUniqueId } from '../../utils/fileUtils';

/**
 * Hook for file operations like adding and removing files
 */
export const useFileOperations = (
  files: UploadFile[],
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
) => {
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);

  const addFiles = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }
    
    setIsProcessingFiles(true);
    
    try {
      const filesArray = Array.from(selectedFiles);
      console.log(`Processing ${filesArray.length} files`);
      
      // Create file objects with basic info
      const newFiles: UploadFile[] = filesArray.map(file => ({
        id: generateUniqueId(),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'queued',
        source: 'computer',
        file: file,
        preview: null
      }));
      
      // Add files to state
      setFiles(prev => [...prev, ...newFiles]);
      
      // Process previews separately
      for (const file of filesArray) {
        try {
          // Only process images
          if (file.type.startsWith('image/')) {
            const preview = await getFilePreview(file);
            
            if (preview) {
              // Find the file in our state and update its preview
              setFiles(prevFiles => 
                prevFiles.map(f => 
                  f.file && f.file.name === file.name && f.file.size === file.size 
                    ? { ...f, preview } 
                    : f
                )
              );
            }
          }
        } catch (error) {
          console.error(`Error generating preview for ${file.name}:`, error);
        }
      }
      
      toast.success(`${newFiles.length} files added to upload queue`);
      
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Error processing files");
    } finally {
      setIsProcessingFiles(false);
    }
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => {
      return prev.filter(file => file.id !== id);
    });
  };
  
  const clearAll = () => {
    setFiles([]);
  };
  
  return {
    addFiles,
    removeFile,
    clearAll,
    isProcessingFiles
  };
};
