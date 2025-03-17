
import React, { useEffect } from 'react';
import AssetsEmptyState from './AssetsEmptyState';
import { toast } from 'sonner';

interface AssetsEmptyStateViewProps {
  hasAssetsInFolders: boolean;
  currentFolderId: string;
  projectName: string;
  foldersWithAssets: string[];
  handleBatchUpload: () => void;
  selectedProjectId: string | null;
}

const AssetsEmptyStateView: React.FC<AssetsEmptyStateViewProps> = ({
  hasAssetsInFolders,
  currentFolderId,
  projectName,
  foldersWithAssets,
  handleBatchUpload,
  selectedProjectId
}) => {
  // Automatically redirect to uploader when viewing an empty folder
  useEffect(() => {
    if (selectedProjectId && currentFolderId) {
      console.log('[CRITICAL] Empty folder detected, preparing to redirect to uploader');
      console.log('[CRITICAL] Selected project:', selectedProjectId);
      console.log('[CRITICAL] Current folder:', currentFolderId);
      
      // Immediate redirect for empty folders
      // No timeout to ensure it happens right away
      handleBatchUpload();
      toast.info(`Redirecting to uploader to add files to ${currentFolderId === 'root' ? 'project' : 'folder'}`);
    }
  }, [selectedProjectId, currentFolderId, handleBatchUpload]);

  return (
    <div>
      {hasAssetsInFolders && currentFolderId === 'root' && (
        <div className="bg-blue-500/20 border border-blue-500/30 text-blue-200 p-4 rounded-lg mb-4">
          <p className="font-medium">Assets found in folders:</p>
          <p className="mt-1">This project has assets in the following folders: {foldersWithAssets.join(', ')}</p>
          <p className="mt-2">Check each folder to view its assets.</p>
        </div>
      )}
      
      <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 p-4 rounded-lg mb-4">
        <p>No assets found in {currentFolderId === 'root' ? `project "${projectName}"` : `folder "${currentFolderId}"`}.</p>
        {currentFolderId !== 'root' && (
          <p className="mt-2">Try uploading files directly to this folder from the uploader tab.</p>
        )}
      </div>
      <AssetsEmptyState handleBatchUpload={handleBatchUpload} />
    </div>
  );
};

export default AssetsEmptyStateView;
