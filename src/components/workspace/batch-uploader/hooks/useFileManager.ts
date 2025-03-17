
import { useState, useEffect, useCallback } from 'react';
import { generateUniqueId } from '../utils/fileUtils';
import { UploadFile, FileStatus } from '../types';

export const useFileManager = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [overallProgress, setOverallProgress] = useState<number>(0);

  // Add files to the queue
  const addFiles = useCallback((newFiles: File[]) => {
    const filesToAdd = newFiles.map(file => {
      // Generate unique ID for each file
      const id = generateUniqueId();
      
      // Create preview URL for images
      let preview = null;
      if (file.type.startsWith('image/')) {
        // Create a data URL for the image (this will persist in localStorage)
        const reader = new FileReader();
        reader.onload = (e) => {
          // Update the file with the preview once it's ready
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.id === id ? { ...f, preview: e.target?.result as string } : f
            )
          );
        };
        reader.readAsDataURL(file);
      }
      
      console.log(`Adding file: ${file.name}, id: ${id}, type: ${file.type}`);
      
      // Return the new file object
      return {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'queued' as FileStatus,
        source: 'computer' as any,
        file,
        preview
      };
    });

    setFiles(prevFiles => [...prevFiles, ...filesToAdd]);
    
    // Debug info
    console.log(`Added ${filesToAdd.length} files, total: ${files.length + filesToAdd.length}`);
  }, [files.length]);

  // Remove a file from the queue
  const removeFile = useCallback((fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
  }, []);

  // Clear all files
  const clearAll = useCallback(() => {
    setFiles([]);
    setOverallProgress(0);
  }, []);

  // Update the progress of a specific file
  const updateFileProgress = useCallback((fileId: string, progress: number) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId ? { ...file, progress } : file
      )
    );
  }, []);

  // Update the status of a specific file
  const updateFileStatus = useCallback((fileId: string, status: FileStatus, errorMessage?: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId ? { 
          ...file, 
          status,
          errorMessage
        } : file
      )
    );
  }, []);

  // Calculate and update the overall progress
  const updateOverallProgress = useCallback(() => {
    // Don't calculate if there are no files
    if (files.length === 0) {
      setOverallProgress(0);
      return;
    }

    // Calculate the average progress
    const totalProgress = files.reduce((sum, file) => sum + file.progress, 0);
    const avgProgress = totalProgress / files.length;
    setOverallProgress(avgProgress);
    
    console.log(`Overall progress updated to ${avgProgress.toFixed(2)}%`);
  }, [files]);

  // Update overall progress when files or their progress changes
  useEffect(() => {
    updateOverallProgress();
  }, [files, updateOverallProgress]);

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
