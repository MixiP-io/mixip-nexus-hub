
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
      
      // Create basic file objects first (without previews)
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
      
      // Add files to state immediately
      setFiles(prev => [...prev, ...newFiles]);
      
      // Then process image previews separately
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const fileObj = newFiles[i];
        
        if (file.type.startsWith('image/')) {
          try {
            console.log(`Starting preview generation for: ${file.name}`);
            const preview = await getFilePreview(file);
            
            if (preview) {
              console.log(`Preview generated for ${file.name}, updating state`);
              // Update just this file with its preview
              setFiles(prevFiles => 
                prevFiles.map(f => 
                  f.id === fileObj.id ? { ...f, preview } : f
                )
              );
            }
          } catch (error) {
            console.error(`Error generating preview for ${file.name}:`, error);
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
