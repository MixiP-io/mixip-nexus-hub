
// File source types
export type UploadSource = 'computer' | 'url' | 'camera' | 'cloud' | 'clipboard';

// File status types
export type FileStatus = 'queued' | 'uploading' | 'processing' | 'complete' | 'error';

// File upload type
export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  source: UploadSource;
  file?: File;
  preview?: string | null;
  errorMessage?: string;
  storagePath?: string;
  storageUrl?: string;
}

// Component Props
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
  setUploadComplete: (isComplete: boolean) => void;
  uploadResults: any;
  selectedProject: string | null;
  selectedProjectName: string | null;
  navigateToProject: (projectId: string, folderId?: string) => void;
}

export interface FileCardProps {
  file: UploadFile;
  removeFile: (id: string) => void;
  isUploading: boolean;
  formatFileSize: (size: number) => string;
}
