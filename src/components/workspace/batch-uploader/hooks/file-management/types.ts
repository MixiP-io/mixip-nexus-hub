
import { UploadFile, FileStatus } from '../../types';

export interface FileStateProps {
  files: UploadFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  overallProgress: number;
  setOverallProgress: React.Dispatch<React.SetStateAction<number>>;
}

export interface FileOperationsProps {
  files: UploadFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

export interface ProgressTrackingProps {
  files: UploadFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setOverallProgress: React.Dispatch<React.SetStateAction<number>>;
}
