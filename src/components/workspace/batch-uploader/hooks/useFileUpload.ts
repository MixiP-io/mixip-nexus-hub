
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { UploadFile, UploadSource } from '../types';
import { getFilePreview } from '../utils/fileUtils';

export const useFileUpload = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const triggerFileInput = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("Triggering file input click");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File selection triggered", event.target.files);
    const selectedFiles = event.target.files;
    
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
        source: 'local',
        file: file,
        preview: getFilePreview(file)
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
    if (event.target) {
      event.target.value = '';
    }
    
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
  };
  
  const startUpload = (licenseType: string, selectedProject: string) => {
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return;
    }
    
    if (!licenseType) {
      toast.error("Please select a license type");
      return;
    }
    
    if (!selectedProject) {
      toast.error("Please select a project to upload to");
      return;
    }
    
    setIsUploading(true);
    
    const uploadPromises = files.map((file) => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'uploading', progress: 0 } 
              : f
          )
        );
        
        const interval = setInterval(() => {
          if (progress >= 100) {
            clearInterval(interval);
            
            setFiles(prev => 
              prev.map(f => 
                f.id === file.id 
                  ? { ...f, status: 'processing', progress: 100 } 
                  : f
              )
            );
            
            setTimeout(() => {
              setFiles(prev => 
                prev.map(f => 
                  f.id === file.id 
                    ? { ...f, status: 'complete', progress: 100 } 
                    : f
                )
              );
              resolve();
            }, 1000);
            
          } else {
            progress += Math.random() * 10;
            progress = Math.min(progress, 98);
            
            setFiles(prev => 
              prev.map(f => 
                f.id === file.id 
                  ? { ...f, progress } 
                  : f
              )
            );
          }
        }, 300 + Math.random() * 300);
      });
    });
    
    const intervalId = setInterval(() => {
      const currentProgress = files.reduce((sum, file) => sum + file.progress, 0) / files.length;
      setOverallProgress(currentProgress);
    }, 200);
    
    Promise.all(uploadPromises).then(() => {
      clearInterval(intervalId);
      setOverallProgress(100);
      setIsUploading(false);
      toast.success("All files uploaded successfully!");
    });
  };
  
  const calculateTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  return {
    files,
    isUploading,
    overallProgress,
    fileInputRef,
    triggerFileInput,
    handleFileSelect,
    removeFile,
    clearAll,
    startUpload,
    calculateTotalSize
  };
};
