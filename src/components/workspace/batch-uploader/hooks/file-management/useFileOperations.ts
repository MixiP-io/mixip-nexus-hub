
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
    
    // Show loading toast
    const loadingToast = toast.loading(`Processing ${selectedFiles.length} files...`);
    
    try {
      // Process files one by one and generate previews
      const newFiles: UploadFile[] = [];
      let successCount = 0;
      
      // Convert FileList to array for easier handling
      const filesArray = Array.from(selectedFiles);
      
      // Process files in parallel with a limit
      const BATCH_SIZE = 3; // Process 3 files at a time
      for (let i = 0; i < filesArray.length; i += BATCH_SIZE) {
        const batch = filesArray.slice(i, i + BATCH_SIZE);
        
        // Process batch in parallel
        const batchResults = await Promise.all(
          batch.map(async (file) => {
            try {
              // Upload to Supabase and get the public URL
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
              
              // Debug log the preview
              if (preview) {
                console.log(`Preview created for ${file.name}: ${preview.substring(0, 50)}...`);
                successCount++;
                return newFile;
              } else {
                console.log(`No preview created for ${file.name}`);
                return null;
              }
            } catch (error) {
              console.error(`Error processing file ${file.name}:`, error);
              return null;
            }
          })
        );
        
        // Filter out nulls (failed uploads)
        const validFiles = batchResults.filter(Boolean) as UploadFile[];
        newFiles.push(...validFiles);
        
        // Update loading toast
        toast.loading(`Processed ${newFiles.length}/${selectedFiles.length} files...`, {
          id: loadingToast
        });
      }
      
      if (newFiles.length > 0) {
        setFiles(prev => [...prev, ...newFiles]);
        toast.success(`${newFiles.length} files added to upload queue`, {
          id: loadingToast
        });
      } else {
        toast.error("No files could be processed", {
          id: loadingToast
        });
      }
    } catch (error) {
      console.error("Error adding files:", error);
      toast.error(`Failed to add files: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        id: loadingToast
      });
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
