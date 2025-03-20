
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
      // Process files one by one to generate previews
      const newFiles: UploadFile[] = [];
      const filesArray = Array.from(selectedFiles);
      
      // Create file objects immediately with null previews
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const fileId = generateUniqueId();
        
        newFiles.push({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'queued',
          source: 'computer',
          file: file,
          preview: null
        });
      }
      
      // Add files to state immediately
      setFiles(prev => [...prev, ...newFiles]);
      
      // Then generate previews asynchronously and update state as they complete
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const fileId = newFiles[i].id;
        
        if (file.type.startsWith('image/')) {
          try {
            // Generate preview for this file
            const preview = await getFilePreview(file);
            
            // Update the file with its preview
            setFiles(prevFiles => 
              prevFiles.map(f => 
                f.id === fileId ? { ...f, preview } : f
              )
            );
          } catch (error) {
            console.error("Error generating preview for file:", file.name, error);
          }
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
      // No need to revoke object URLs since we're using data URLs now
      return prev.filter(file => file.id !== id);
    });
  };
  
  const clearAll = () => {
    // No need to revoke object URLs since we're using data URLs now
    setFiles([]);
  };
  
  return {
    addFiles,
    removeFile,
    clearAll,
    isProcessingFiles
  };
};
