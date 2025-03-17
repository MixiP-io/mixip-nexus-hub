
import { useState } from 'react';
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { getFilePreview } from '../../utils/fileUtils';

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
      
      for (const file of Array.from(selectedFiles)) {
        // Generate preview asynchronously (returns data URL for images)
        const preview = await getFilePreview(file);
        
        newFiles.push({
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'queued',
          source: 'computer',
          file: file,
          preview: preview
        });
      }
      
      setFiles(prev => [...prev, ...newFiles]);
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
