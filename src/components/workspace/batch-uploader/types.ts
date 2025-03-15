
export type UploadSource = 'computer' | 'phone' | 'moby' | 'dropbox' | 'google-drive' | 'box' | 'icloud' | 'local';

export type FileStatus = 'queued' | 'uploading' | 'processing' | 'complete' | 'error';

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  source: UploadSource;
  file?: File;
  preview?: string;
}
