
import React, { useEffect } from 'react';
import FileListHeader from './FileListHeader';
import OverallProgress from './OverallProgress';
import FileGrid from './FileGrid';
import UploadCompleteDialog from './UploadCompleteDialog';
import { UploadFile } from '../../types';
import { UploadResults } from '../../context/types';

interface FileListContainerProps {
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
  uploadResults: UploadResults | null;
  selectedProject: string | null;
  selectedProjectName: string | null;
  navigateToProject: (projectId: string, folderId?: string) => void;
}

const FileListContainer: React.FC<FileListContainerProps> = ({
  files,
  isUploading,
  overallProgress,
  formatFileSize,
  calculateTotalSize,
  removeFile,
  clearAll,
  startUpload,
  uploadComplete,
  setUploadComplete,
  uploadResults,
  selectedProject,
  selectedProjectName,
  navigateToProject
}) => {
  const totalSize = formatFileSize(calculateTotalSize());
  const uploadedFiles = files.filter(f => f.status === 'complete').length;
  
  useEffect(() => {
    console.log("FileListContainer render state:", { 
      uploadComplete, 
      uploadResults,
      selectedProject, 
      selectedProjectName,
      filesCount: files.length,
      completedFiles: files.filter(f => f.status === 'complete').length
    });
  }, [uploadComplete, uploadResults, selectedProject, selectedProjectName, files]);
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <FileListHeader 
        filesCount={files.length}
        totalSize={totalSize}
        uploadedFiles={uploadedFiles}
        isUploading={isUploading}
        clearAll={clearAll}
        startUpload={startUpload}
      />
      
      <OverallProgress 
        progress={overallProgress}
        isUploading={isUploading || uploadComplete}
      />
      
      <FileGrid 
        files={files}
        removeFile={removeFile}
        isUploading={isUploading}
        formatFileSize={formatFileSize}
      />

      {uploadComplete && uploadResults && (
        <UploadCompleteDialog 
          isOpen={uploadComplete}
          onClose={() => setUploadComplete(false)}
          fileCount={uploadResults.count}
          totalSize={totalSize}
          projectId={uploadResults.projectId}
          projectName={uploadResults.projectName}
          success={uploadResults.success}
          navigateToProject={navigateToProject}
          folderId={uploadResults.folderId}
        />
      )}
    </div>
  );
};

export default FileListContainer;
