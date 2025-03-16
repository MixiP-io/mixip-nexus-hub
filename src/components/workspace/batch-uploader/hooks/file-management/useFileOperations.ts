
import { toast } from 'sonner';
import { UploadFile } from '../../types';
import { getFilePreview, revokeFilePreview } from '../../utils/fileUtils';

/**
 * Hook for file operations like adding and removing files
 */
export const useFileOperations = (
  files: UploadFile[],
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
) => {
  const addFiles = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }
    
    try {
      // Process files one by one and generate previews
      const newFiles: UploadFile[] = [];
      
      for (const file of Array.from(selectedFiles)) {
        try {
          // Create preview safely - getFilePreview returns a Promise for data URLs
          const preview = await getFilePreview(file);
          
          const newFile: UploadFile = {
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            status: 'queued',
            source: 'computer',
            file: file,
            preview: preview
          };
          
          newFiles.push(newFile);
          
          // Debug log the preview
          if (preview) {
            const previewType = preview.startsWith('data:') ? 'data URL' : 'blob URL';
            console.log(`Preview created for ${file.name}: ${previewType} (${preview.substring(0, 50)}...)`);
          } else {
            console.log(`No preview created for ${file.name}`);
          }
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          // Continue with the next file even if this one fails
        }
      }
      
      if (newFiles.length > 0) {
        setFiles(prev => [...prev, ...newFiles]);
        toast.success(`${newFiles.length} files added to upload queue`);
      } else {
        toast.error("No files could be processed");
      }
    } catch (error) {
      console.error("Error adding files:", error);
      toast.error("Failed to add files");
    }
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        // Clean up the preview URL to prevent memory leaks
        revokeFilePreview(file.preview);
      }
      return prev.filter(file => file.id !== id);
    });
  };
  
  const clearAll = () => {
    // Clean up all preview URLs
    files.forEach(file => {
      if (file.preview) {
        revokeFilePreview(file.preview);
      }
    });
    setFiles([]);
  };
  
  return {
    addFiles,
    removeFile,
    clearAll
  };
};
