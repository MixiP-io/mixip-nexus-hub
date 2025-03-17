
import React from 'react';
import AssetsEmptyState from './AssetsEmptyState';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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
  // Handle direct navigation to uploader via button click
  const navigateToUploader = () => {
    console.log('[CRITICAL] Manual navigation to uploader triggered');
    if (selectedProjectId) {
      // Create direct URL to uploader tab with project and folder context
      const baseUrl = window.location.origin;
      const uploaderPath = `/dashboard/workspace`;
      const queryParams = `?tab=uploader&project=${selectedProjectId}&folder=${currentFolderId}`;
      const fullUrl = `${baseUrl}${uploaderPath}${queryParams}`;
      
      console.log('[CRITICAL] Direct navigation to:', fullUrl);
      toast.info(`Opening uploader to add files...`);
      
      // Force browser navigation - bypassing React Router entirely
      window.location.href = fullUrl;
    } else {
      console.error('[CRITICAL] Cannot navigate: No project selected');
      toast.error('Unable to open uploader - no project selected');
    }
  };

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
        <div className="flex gap-4 mt-4">
          <Button 
            onClick={navigateToUploader}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium"
          >
            Upload Files Now (Direct)
          </Button>
          <Button 
            onClick={handleBatchUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Upload Files (Router)
          </Button>
        </div>
      </div>
      <AssetsEmptyState handleBatchUpload={navigateToUploader} />
    </div>
  );
};

export default AssetsEmptyStateView;
