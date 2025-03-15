
import { UploadFile, UploadSource, FileStatus } from '../types';
import { ViewOption } from './viewOption';

/**
 * Props for the FilesList component
 */
export interface FilesListProps {
  files: UploadFile[];
  isUploading: boolean;
  overallProgress: number;
  formatFileSize: (bytes: number) => string;
  calculateTotalSize: () => number;
  removeFile: (id: string) => void;
  clearAll: () => void;
  startUpload: () => void;
  uploadComplete: boolean;
  setUploadComplete: (value: boolean) => void;
  selectedProject: string;
  selectedProjectName: string | undefined;
  navigateToProject: (projectId: string) => void;
}

/**
 * Props for the FileCard component
 */
export interface FileCardProps {
  file: UploadFile;
  removeFile: (id: string) => void;
  isUploading: boolean;
  formatFileSize: (bytes: number) => string;
}

/**
 * Props for the MetadataSection component
 */
export interface MetadataSectionProps {
  tags: string;
  setTags: (tags: string) => void;
  licenseType: string;
  setLicenseType: (licenseType: string) => void;
  usageRights: string;
  setUsageRights: (usageRights: string) => void;
}

/**
 * Props for the ProjectSection component
 */
export interface ProjectSectionProps {
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
}

/**
 * Props for the SourceSelection component
 */
export interface SourceSelectionProps {
  activeSource: UploadSource;
  setActiveSource: (source: UploadSource) => void;
}

/**
 * Props for the UploaderTabs component
 */
export interface UploaderTabsProps {
  activeView: ViewOption;
  setActiveView: (view: ViewOption) => void;
}

/**
 * Props for the UploadArea component
 */
export interface UploadAreaProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: (e?: React.MouseEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}
