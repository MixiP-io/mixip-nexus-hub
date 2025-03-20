
import { UploadFile, FileStatus, UploadSource } from '../types';

export interface UploaderState {
  // File state
  files: UploadFile[];
  overallProgress: number;
  isUploading: boolean;
  uploadComplete: boolean;
  uploadResults: UploadResults | null;
  
  // Navigation state
  selectedProject: string | null;
  selectedProjectName: string | null;
  selectedFolder: string;
  
  // Metadata state
  tags: string[];
  selectedLicense: string;
  usageRights: Record<string, boolean>;
  
  // UI state
  activeView: 'source' | 'metadata' | 'project';
  activeSource: UploadSource;
}

export interface UploadResults {
  success: boolean;
  count: number;
  projectId: string;
  projectName: string;
  folderId: string;
  location?: string;
}

export type UploaderAction =
  | { type: 'ADD_FILES'; payload: File[] }
  | { type: 'REMOVE_FILE'; payload: string }
  | { type: 'CLEAR_FILES' }
  | { type: 'UPDATE_FILE_PROGRESS'; payload: { fileId: string; progress: number } }
  | { type: 'UPDATE_FILE_STATUS'; payload: { fileId: string; status: FileStatus; errorMessage?: string } }
  | { type: 'SET_OVERALL_PROGRESS'; payload: number }
  | { type: 'SET_IS_UPLOADING'; payload: boolean }
  | { type: 'SET_UPLOAD_COMPLETE'; payload: boolean }
  | { type: 'SET_UPLOAD_RESULTS'; payload: UploadResults | null }
  | { type: 'SELECT_PROJECT'; payload: { projectId: string; projectName: string } }
  | { type: 'SET_SELECTED_FOLDER'; payload: string }
  | { type: 'SET_TAGS'; payload: string[] }
  | { type: 'SET_LICENSE'; payload: string }
  | { type: 'SET_USAGE_RIGHTS'; payload: Record<string, boolean> }
  | { type: 'SET_ACTIVE_VIEW'; payload: 'source' | 'metadata' | 'project' }
  | { type: 'SET_ACTIVE_SOURCE'; payload: UploadSource };
