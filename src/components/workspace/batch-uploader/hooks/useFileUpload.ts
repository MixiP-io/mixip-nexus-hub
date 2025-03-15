
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { UploadFile, UploadSource, FileStatus } from '../types';
import { getFilePreview } from '../utils/fileUtils';
import { addFilesToProject } from '../utils/projectUtils';

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
        source: 'computer',
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
  
  const updateFileProgress = (fileId: string, progress: number) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, progress, status: progress === 100 ? 'processing' : 'uploading' } 
          : f
      )
    );
    
    // Recalculate overall progress whenever a file's progress changes
    calculateOverallProgress();
  };

  const updateFileStatus = (fileId: string, status: FileStatus) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, status } 
          : f
      )
    );
    
    // Also recalculate overall progress when status changes
    calculateOverallProgress();
  };
  
  // Calculate and update the overall progress based on all files
  const calculateOverallProgress = () => {
    if (files.length === 0) {
      setOverallProgress(0);
      return;
    }
    
    const totalProgress = files.reduce((sum, file) => {
      // Count completed files as 100% progress
      if (file.status === 'complete') {
        return sum + 100;
      }
      // Use the actual progress for uploading files
      return sum + file.progress;
    }, 0);
    
    const averageProgress = totalProgress / files.length;
    setOverallProgress(averageProgress);
  };
  
  const startUpload = async (licenseType: string, selectedProject: string) => {
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return;
    }
    
    if (!licenseType) {
      toast.error("Please select a license type");
      return;
    }
    
    if (!selectedProject) {
      toast.error("Please select a project to upload");
      return;
    }
    
    setIsUploading(true);
    setOverallProgress(0); // Reset progress at start
    
    try {
      // Process files one by one
      for (const file of files) {
        // Only process queued files
        if (file.status !== 'queued') continue;
        
        // Simulate upload - in a real app, replace with actual API calls
        await simulateFileUpload(file.id, updateFileProgress);
        
        // Mark as processing
        updateFileStatus(file.id, 'processing');
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mark as complete
        updateFileStatus(file.id, 'complete');
      }
      
      // Add files to project
      await addFilesToProject(selectedProject, files);
      
      toast.success(`All files uploaded successfully to project!`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('There was a problem with the upload');
    } finally {
      // Ensure overall progress is 100% at the end
      setOverallProgress(100);
      setIsUploading(false);
    }
  };
  
  const calculateTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  // Simulates uploading a file with realistic progress
  const simulateFileUpload = (fileId: string, progressCallback: (id: string, progress: number) => void): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        // Realistic progress simulation - faster at start, slower at end
        const increment = (100 - progress) / 10;
        progress += Math.min(increment, 10);
        
        if (progress >= 99.5) {
          clearInterval(interval);
          progressCallback(fileId, 100);
          resolve();
        } else {
          progressCallback(fileId, progress);
        }
      }, 200);
    });
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
