
import React, { useEffect, useRef } from 'react';
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
  // Use ref to track if we've already redirected
  const hasRedirected = useRef(false);
  
  // Automatically redirect to uploader when viewing an empty folder
  useEffect(() => {
    if (selectedProjectId && currentFolderId && !hasRedirected.current) {
      console.log('[CRITICAL] Empty folder detected, preparing to redirect to uploader');
      console.log('[CRITICAL] Selected project:', selectedProjectId);
      console.log('[CRITICAL] Current folder:', currentFolderId);
      
      // Mark that we've handled the redirect to prevent duplicate calls
      hasRedirected.current = true;
      
      // Manual button click for more reliable event handling
      const redirectToUploader = () => {
        console.log('[CRITICAL] Now executing handleBatchUpload');
        handleBatchUpload();
        toast.info(`Redirecting to uploader to add files to ${currentFolderId === 'root' ? 'project' : 'folder'}`);
      };
      
      // Immediate redirect attempt
      redirectToUploader();
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
        <Button 
          onClick={handleBatchUpload}
          className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Add Files Now
        </Button>
      </div>
      <AssetsEmptyState handleBatchUpload={handleBatchUpload} />
    </div>
  );
};

export default AssetsEmptyStateView;
