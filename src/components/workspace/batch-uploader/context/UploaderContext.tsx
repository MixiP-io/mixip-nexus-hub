
import React, { createContext, useContext } from 'react';
import { UploadFile } from '../types';

interface UploaderContextType {
  // File state
  files: UploadFile[];
  isUploading: boolean;
  overallProgress: number;
  uploadComplete: boolean;
  uploadResults: any;
  
  // Actions
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (id: string) => void;
  clearAll: () => void;
  startUpload: () => void;
  setUploadComplete: (isComplete: boolean) => void;
  
  // Navigation
  navigateToProject: (projectId: string, folderId?: string) => void;
  
  // Project state
  selectedProject: string | null;
  selectedProjectName: string | null;
  selectedFolder: string;
  
  // Format utils
  formatFileSize: (bytes: number) => string;
  calculateTotalSize: () => number;
}

export const UploaderContext = createContext<UploaderContextType | undefined>(undefined);

export const useUploaderContext = () => {
  const context = useContext(UploaderContext);
  if (context === undefined) {
    throw new Error('useUploaderContext must be used within a UploaderProvider');
  }
  return context;
};
