
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
  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }
    
    const newFiles: UploadFile[] = Array.from(selectedFiles).map(file => {
      // Create preview safely
      const preview = getFilePreview(file);
      
      return {
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
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} files added to upload queue`);
    
    // Debug log the first file's preview
    if (newFiles.length > 0 && newFiles[0].preview) {
      console.log(`Preview created for ${newFiles[0].name}: ${newFiles[0].preview.substring(0, 50)}...`);
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
