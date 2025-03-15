
import { useState } from 'react';
import { toast } from 'sonner';
import { UploadFile, FileStatus } from '../types';
import { getFilePreview } from '../utils/fileUtils';
import { calculateTotalProgress } from '../utils/uploadUtils';

export const useFileManager = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  
  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }
    
    const newFiles: UploadFile[] = Array.from(selectedFiles).map(file => {
      return {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'queued',
        source: 'computer',
        file: file,
        preview: getFilePreview(file)
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} files added to upload queue`);
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(file => file.id !== id);
    });
  };
  
  const clearAll = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
    setOverallProgress(0);
  };
  
  const updateFileProgress = (fileId: string, progress: number) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, progress, status: progress === 100 ? 'processing' : 'uploading' } 
          : f
      )
    );
    
    // Recalculate overall progress
    updateOverallProgress();
  };

  const updateFileStatus = (fileId: string, status: FileStatus) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, status } 
          : f
      )
    );
    
    // Recalculate overall progress
    updateOverallProgress();
  };
  
  const updateOverallProgress = () => {
    const newProgress = calculateTotalProgress(files);
    setOverallProgress(newProgress);
  };
  
  return {
    files,
    overallProgress,
    addFiles,
    removeFile,
    clearAll,
    updateFileProgress,
    updateFileStatus,
    updateOverallProgress
  };
};
