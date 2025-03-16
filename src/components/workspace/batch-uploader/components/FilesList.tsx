
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
  uploadResults,
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
      uploadResults,
      selectedProject, 
      selectedProjectName,
      uploadedFiles,
      filesCount: files.length
    });
    
    // Show a toast notification when upload completes
    if (uploadComplete && uploadResults) {
      console.log("Upload complete detected in FilesList, showing toast");
      if (uploadResults.success) {
        const folderInfo = uploadResults.folderId && uploadResults.folderId !== 'root' 
          ? ` in folder "${uploadResults.folderId}"` 
          : '';
        toast.success(`Upload complete! ${uploadResults.count} files added to ${uploadResults.projectName}${folderInfo}`);
      } else {
        toast.error(`Upload failed! No files were added to ${uploadResults.projectName}`);
      }
    }
  }, [uploadComplete, uploadResults, selectedProject, selectedProjectName, uploadedFiles, files.length]);
  
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

      {/* Show upload complete dialog when upload is complete and we have results */}
      {uploadComplete && uploadResults && (
        <UploadComplete 
          isOpen={uploadComplete}
          onClose={() => {
            console.log("Closing upload complete dialog");
            setUploadComplete(false);
          }}
          fileCount={uploadResults.count}
          totalSize={totalSize}
          projectId={uploadResults.projectId || ""}
          projectName={uploadResults.projectName || ""}
          success={uploadResults.success}
          navigateToProject={navigateToProject}
          folderId={uploadResults.folderId}
        />
      )}
    </div>
  );
};

export default FilesList;
