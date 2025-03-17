
import React, { useCallback } from 'react';
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
  // Handle direct navigation to uploader via button click with forced page refresh
  const navigateToUploader = useCallback(() => {
    console.log('[CRITICAL] Manual navigation to uploader triggered');
    
    if (!selectedProjectId) {
      console.error('[CRITICAL] Cannot navigate: No project selected');
      toast.error('Unable to open uploader - no project selected');
      return;
    }
    
    // Show toast notification
    toast.info(`Opening uploader to add assets...`);
    
    // Use setTimeout to ensure toast shows before navigation
    setTimeout(() => {
      try {
        // Create direct URL to uploader tab with project and folder context
        const origin = window.location.origin; 
        const path = `/dashboard/workspace`;
        const query = `?tab=uploader&project=${selectedProjectId}&folder=${currentFolderId}`;
        const fullUrl = `${origin}${path}${query}`;
        
        console.log('[CRITICAL] Direct navigation to:', fullUrl);
        
        // Force full page reload by setting location directly
        window.location.href = fullUrl;
      } catch (err) {
        console.error('[CRITICAL] Navigation failed:', err);
        toast.error('Failed to open uploader. Please try again.');
      }
    }, 100);
  }, [selectedProjectId, currentFolderId]);

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
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button 
            onClick={navigateToUploader}
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            Add Assets Now
          </Button>
        </div>
      </div>
      <AssetsEmptyState handleBatchUpload={navigateToUploader} />
    </div>
  );
};

export default AssetsEmptyStateView;
