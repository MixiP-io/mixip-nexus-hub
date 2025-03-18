
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useBatchUploadModalStore } from '../../batch-uploader/stores/batchUploadModalStore';

export const useFolderNavigation = (
  selectedProjectId: string | null,
  initialFolderId?: string | null
) => {
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialFolderId || 'root');
  const openBatchUploadModal = useBatchUploadModalStore(state => state.openModal);
  
  // Handle folder navigation
  const handleFolderChange = useCallback((folderId: string, folderName?: string) => {
    console.log(`[useFolderNavigation] Changing folder to ${folderId} ${folderName ? `(${folderName})` : ''}`);
    
    // Update state
    setCurrentFolderId(folderId);
    
    // Show toast notification for folder navigation
    if (folderName && folderId !== 'root') {
      toast.info(`Viewing folder: ${folderName}`);
    } else if (folderId === 'root') {
      toast.info('Viewing root folder');
    }
  }, []);
  
  // Trigger batch upload for current folder/project
  const handleBatchUpload = useCallback(() => {
    if (!selectedProjectId) {
      toast.error('Please select a project first');
      return;
    }
    
    console.log(`[useFolderNavigation] Opening batch upload for project ${selectedProjectId}, folder ${currentFolderId}`);
    
    // Open the batch upload modal, passing the current folder ID
    openBatchUploadModal(selectedProjectId, currentFolderId);
  }, [selectedProjectId, currentFolderId, openBatchUploadModal]);
  
  return {
    currentFolderId,
    setCurrentFolderId,
    handleFolderChange,
    handleBatchUpload
  };
};
