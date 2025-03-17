
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Hook to handle folder navigation
 */
export const useFolderNavigation = (selectedProjectId: string | null, initialFolderId?: string | null) => {
  const navigate = useNavigate();
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialFolderId || 'root');
  
  // Update current folder when initialFolderId changes
  useEffect(() => {
    if (initialFolderId && initialFolderId !== currentFolderId) {
      console.log('[useFolderNavigation] Setting current folder to initial value:', initialFolderId);
      setCurrentFolderId(initialFolderId);
    }
  }, [initialFolderId, currentFolderId]);

  // Handle folder change with notification
  const handleFolderChange = (folderId: string, folderName?: string) => {
    console.log('[useFolderNavigation] Changing folder to:', folderId, folderName);
    setCurrentFolderId(folderId);
    
    // Show toast when changing folders
    if (folderName) {
      toast.info(`Viewing folder: ${folderName}`);
    } else if (folderId === 'root') {
      toast.info('Viewing root folder');
    }
    
    // Update URL if needed
    if (selectedProjectId) {
      navigate(`/dashboard/workspace?tab=assets&project=${selectedProjectId}&folder=${folderId}`);
    }
  };

  // Handle batch upload - immediately redirect to uploader with current folder context
  const handleBatchUpload = () => {
    // Pass current folder ID to the uploader
    if (selectedProjectId) {
      console.log('[CRITICAL] Redirecting to uploader with project:', selectedProjectId, 'folder:', currentFolderId);
      
      // Use direct navigation instead of setTimeout to ensure it happens immediately
      try {
        console.log('[CRITICAL] Executing navigation to uploader');
        navigate(`/dashboard/workspace?tab=uploader&project=${selectedProjectId}&folder=${currentFolderId}`);
        toast.info(`Switched to uploader to add assets to ${currentFolderId === 'root' ? 'project' : 'folder'}`);
      } catch (error) {
        console.error('[CRITICAL] Navigation failed:', error);
        // Fallback approach with timeout
        setTimeout(() => {
          console.log('[CRITICAL] Trying fallback navigation');
          navigate(`/dashboard/workspace?tab=uploader&project=${selectedProjectId}&folder=${currentFolderId}`);
        }, 50);
      }
    } else {
      console.warn('[useFolderNavigation] Cannot redirect to uploader: No project selected');
      navigate('/dashboard/workspace?tab=uploader');
      toast.info('Please select a project first');
    }
  };

  return {
    currentFolderId,
    setCurrentFolderId,
    handleFolderChange,
    handleBatchUpload
  };
};
