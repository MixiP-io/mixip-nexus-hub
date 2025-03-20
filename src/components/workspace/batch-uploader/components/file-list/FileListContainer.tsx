
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
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
  
  // Trigger asset refresh in project when upload is complete
  useEffect(() => {
    if (uploadComplete && uploadResults?.success) {
      console.log('[FileListContainer] Upload complete, refreshing project assets in Supabase');
      
      // Trigger a Supabase refresh by updating the project timestamp
      const updateProjectTimestamp = async () => {
        try {
          const { error } = await supabase
            .from('projects')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', uploadResults.projectId);
            
          if (error) {
            console.error('[FileListContainer] Error updating project timestamp:', error);
          } else {
            console.log('[FileListContainer] Updated project timestamp to trigger UI refresh');
          }
        } catch (err) {
          console.error('[FileListContainer] Error triggering refresh:', err);
        }
      };
      
      updateProjectTimestamp();
    }
  }, [uploadComplete, uploadResults]);
  
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
