
import React, { useEffect } from 'react';
import FileListHeader from './file-list/FileListHeader';
import OverallProgress from './file-list/OverallProgress';
import FileGrid from './file-list/FileGrid';
import UploadComplete from './file-list/UploadComplete';
import { FilesListProps } from '../types/componentProps';
import { toast } from 'sonner';

const FilesList: React.FC<FilesListProps> = ({
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
  selectedProject,
  selectedProjectName,
  navigateToProject
}) => {
  const totalSize = formatFileSize(calculateTotalSize());
  const uploadedFiles = files.filter(f => f.status === 'complete').length;
  
  // Add effect to log state changes for debugging
  useEffect(() => {
    console.log("FilesList render state:", { 
      uploadComplete, 
      selectedProject, 
      selectedProjectName,
      uploadedFiles,
      filesCount: files.length
    });
    
    // Show a toast notification when upload completes
    if (uploadComplete && selectedProject && uploadedFiles > 0) {
      console.log("Upload complete detected in FilesList, showing toast");
    }
  }, [uploadComplete, selectedProject, selectedProjectName, uploadedFiles, files.length]);
  
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
      
      {/* Always show progress bar, regardless of upload state */}
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

      {/* Show upload complete dialog when upload is complete and we have a project */}
      {uploadComplete && selectedProject && (
        <UploadComplete 
          isOpen={uploadComplete}
          onClose={() => {
            console.log("Closing upload complete dialog");
            setUploadComplete(false);
          }}
          fileCount={uploadedFiles}
          totalSize={totalSize}
          projectId={selectedProject}
          projectName={selectedProjectName || "Project"}
          navigateToProject={navigateToProject}
        />
      )}
    </div>
  );
};

export default FilesList;
