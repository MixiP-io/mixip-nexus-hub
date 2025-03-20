
import React, { createContext, useContext } from 'react';
import { UploaderState } from './types';
import { useUploaderCore } from './hooks/useUploaderCore';
import { useFileOperations } from './hooks/useFileOperations';
import { useUploadProcess } from './hooks/useUploadProcess';
import { useUIStateActions } from './hooks/useUIStateActions';
import { useUploaderUtilities } from './hooks/useUploaderUtilities';
import { UploadFile, FileStatus, UploadSource } from '../types';

// Combined interface of all hooks
interface UploaderContextValue extends UploaderState {
  // Actions
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (id: string) => void;
  clearAll: () => void;
  startUpload: () => void;
  setUploadComplete: (isComplete: boolean) => void;
  navigateToProject: (projectId: string, folderId?: string) => void;
  updateFileProgress: (fileId: string, progress: number) => void;
  updateFileStatus: (fileId: string, status: FileStatus, errorMessage?: string) => void;
  
  // UI actions
  setActiveView: (view: 'source' | 'metadata' | 'project') => void;
  setActiveSource: (source: UploadSource) => void;
  setTags: (tags: string[]) => void;
  setSelectedLicense: (license: string) => void;
  setUsageRights: (rights: Record<string, boolean>) => void;
  setSelectedProject: (projectId: string) => void;
  setSelectedFolder: (folderId: string) => void;
  
  // Utility functions
  formatFileSize: (bytes: number) => string;
  calculateTotalSize: () => number;
  
  // Refs
  fileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileInput: () => void;
}

export const UploaderContext = createContext<UploaderContextValue | undefined>(undefined);

export const UploaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our core hook to get state and dispatch
  const { state, dispatch, fileInputRef, triggerFileInput, navigateToProject, setUploadComplete } = useUploaderCore();
  
  // Use our feature hooks
  const { handleFileSelect, removeFile, clearAll, updateFileProgress, updateFileStatus } = useFileOperations(state, dispatch);
  const { startUpload } = useUploadProcess(state, dispatch, updateFileProgress, updateFileStatus);
  const { setActiveView, setActiveSource, setTags, setSelectedLicense, setUsageRights, setSelectedProject, setSelectedFolder } = useUIStateActions(state, dispatch);
  const { formatFileSize, calculateTotalSize } = useUploaderUtilities(state);
  
  // Combine all values into the context
  const contextValue: UploaderContextValue = {
    ...state,
    handleFileSelect,
    removeFile,
    clearAll,
    startUpload,
    setUploadComplete,
    navigateToProject,
    updateFileProgress,
    updateFileStatus,
    setActiveView,
    setActiveSource,
    setTags,
    setSelectedLicense,
    setUsageRights,
    setSelectedProject,
    setSelectedFolder,
    formatFileSize,
    calculateTotalSize,
    fileInputRef,
    triggerFileInput
  };
  
  return (
    <UploaderContext.Provider value={contextValue}>
      {children}
    </UploaderContext.Provider>
  );
};

export const useUploaderContext = () => {
  const context = useContext(UploaderContext);
  if (context === undefined) {
    throw new Error('useUploaderContext must be used within a UploaderProvider');
  }
  return context;
};
