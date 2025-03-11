
export type FileStatus = 'pending' | 'uploading' | 'complete' | 'error';

export interface FileUpload {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  thumbnailUrl?: string;
  error?: string;
}

export interface UploadStatus {
  isUploading: boolean;
  progress: number;
  filesComplete: number;
  totalFiles: number;
  currentSpeed: string;
  timeRemaining: string;
  error?: string;
}

export interface UploadSource {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  description: string;
}

export interface SourceSelectorProps {
  sources: UploadSource[];
  selectedSource: UploadSource;
  onSourceSelect: (source: UploadSource) => void;
}

export interface UploadHeaderProps {
  files: FileUpload[];
  uploadStatus: UploadStatus;
}

export interface FileGridProps {
  files: FileUpload[];
  onRemoveFile: (id: string) => void;
  isUploading: boolean;
}

export interface UploadProgressProps {
  uploadStatus: UploadStatus;
  onStartUpload: () => void;
  onReset: () => void;
}

export interface FileCardProps {
  file: FileUpload;
  onRemove: (id: string) => void;
  isUploading: boolean;
}
