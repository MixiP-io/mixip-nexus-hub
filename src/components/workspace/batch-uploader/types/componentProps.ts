
import { ViewOption } from './viewOption';
import { UploadFile, UploadSource } from '../types';
import React, { ChangeEvent, RefObject } from 'react';

export interface FileCardProps {
  file: UploadFile;
  removeFile: (id: string) => void;
  isUploading: boolean;
  formatFileSize: (size: number) => string;
}

export interface FileGridProps {
  files: UploadFile[];
  removeFile: (id: string) => void;
  isUploading: boolean;
  formatFileSize: (size: number) => string;
}

export interface FileListHeaderProps {
  filesCount: number;
  totalSize: string;
  uploadedFiles: number;
  isUploading: boolean;
  clearAll: () => void;
  startUpload: () => void;
}

export interface OverallProgressProps {
  progress: number;
  isUploading: boolean;
}

export interface UploadCompleteProps {
  isOpen: boolean;
  onClose: () => void;
  fileCount: number;
  totalSize: string;
  projectId: string;
  projectName: string;
  navigateToProject: (projectId: string) => void;
}

export interface FilesListProps {
  files: UploadFile[];
  isUploading: boolean;
  overallProgress: number;
  formatFileSize: (size: number) => string;
  calculateTotalSize: () => number;
  removeFile: (id: string) => void;
  clearAll: () => void;
  startUpload: () => void;
  uploadComplete: boolean;
  setUploadComplete: (isComplete: boolean) => void;
  uploadResults: { success: boolean; count: number; projectId: string; projectName: string; } | null;
  selectedProject: string | null;
  selectedProjectName: string | null;
  navigateToProject: (projectId: string) => void;
}

export interface UploadAreaProps {
  handleFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

export interface UploaderTabsProps {
  activeView: 'source' | 'metadata' | 'project';
  setActiveView: (view: 'source' | 'metadata' | 'project') => void;
  activeSource: UploadSource;
  setActiveSource: (source: UploadSource) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  licenseType: string;
  setLicenseType: (license: string) => void;
  usageRights: Record<string, boolean>;
  setUsageRights: (rights: Record<string, boolean>) => void;
  selectedProject: string;
  setSelectedProject: (projectId: string) => void;
  selectedFolder: string;
  setSelectedFolder: (folderId: string) => void;
}

export interface SourceSelectionProps {
  activeSource: UploadSource;
  setActiveSource: (source: UploadSource) => void;
}

export interface MetadataSectionProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  licenseType: string;
  setLicenseType: (license: string) => void;
  usageRights: Record<string, boolean>;
  setUsageRights: (rights: Record<string, boolean>) => void;
}

export interface ProjectSectionProps {
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  selectedFolder: string | null;
  setSelectedFolder: (id: string | null) => void;
}
