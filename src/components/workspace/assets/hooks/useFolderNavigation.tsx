
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useBatchUploadModalStore } from '../../batch-uploader/stores/batchUploadModalStore';
import { supabase } from '@/integrations/supabase/client';

export const useFolderNavigation = (
  selectedProjectId: string | null,
  initialFolderId?: string | null
) => {
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialFolderId || 'root');
  const openBatchUploadModal = useBatchUploadModalStore(state => state.openModal);
  
  // Sync with batch upload modal store
  useEffect(() => {
    if (initialFolderId && initialFolderId !== currentFolderId) {
      console.log(`[useFolderNavigation] Initializing with folder ID: ${initialFolderId}`);
      setCurrentFolderId(initialFolderId);
    }
  }, [initialFolderId, currentFolderId]);
  
  // Handle folder navigation
  const handleFolderChange = useCallback(async (folderId: string, folderName?: string) => {
    console.log(`[useFolderNavigation] Changing folder to ${folderId} ${folderName ? `(${folderName})` : ''}`);
    
    // Update state
    setCurrentFolderId(folderId);
    
    // Verify folder exists in database if not root
    if (selectedProjectId && folderId !== 'root') {
      try {
        const { data, error } = await supabase
          .from('project_folders')
          .select('id, name')
          .eq('id', folderId)
          .eq('project_id', selectedProjectId)
          .single();
          
        if (error) {
          console.error('[useFolderNavigation] Error verifying folder:', error);
        } else if (data) {
          console.log(`[useFolderNavigation] Verified folder in database: ${data.name} (${data.id})`);
          folderName = data.name;
        }
      } catch (err) {
        console.error('[useFolderNavigation] Database verification error:', err);
      }
    }
    
    // Show toast notification for folder navigation
    if (folderName && folderId !== 'root') {
      toast.info(`Viewing folder: ${folderName}`);
    } else if (folderId === 'root') {
      toast.info('Viewing root folder');
    }
  }, [selectedProjectId]);
  
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
