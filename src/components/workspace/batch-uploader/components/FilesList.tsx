
import React from 'react';
import FileListHeader from './file-list/FileListHeader';
import OverallProgress from './file-list/OverallProgress';
import FileGrid from './file-list/FileGrid';
import { FilesListProps } from '../types/componentProps';

const FilesList: React.FC<FilesListProps> = ({
  files,
  isUploading,
  overallProgress,
  formatFileSize,
  calculateTotalSize,
  removeFile,
  clearAll,
  startUpload
}) => {
  const totalSize = formatFileSize(calculateTotalSize());
  const uploadedFiles = files.filter(f => f.status === 'complete').length;
  
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
        isUploading={isUploading}
      />
      
      <FileGrid 
        files={files}
        removeFile={removeFile}
        isUploading={isUploading}
        formatFileSize={formatFileSize}
      />
    </div>
  );
};

export default FilesList;
