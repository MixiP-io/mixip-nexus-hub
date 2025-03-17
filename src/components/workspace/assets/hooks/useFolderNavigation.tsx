
import { useState, useEffect, useCallback } from 'react';
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

  // Handle batch upload using hard navigation without React Router
  const handleBatchUpload = useCallback(() => {
    if (!selectedProjectId) {
      console.warn('[useFolderNavigation] Cannot redirect to uploader: No project selected');
      toast.info('Please select a project first');
      return;
    }

    console.log('[CRITICAL] Force redirecting to uploader with project:', selectedProjectId, 'folder:', currentFolderId);
    
    // Show toast notification that we're redirecting
    toast.info('Opening uploader for file uploads...');
    
    // Use setTimeout to ensure toast is shown before navigation
    setTimeout(() => {
      try {
        // Construct absolute URL to ensure we're not affected by relative path issues
        const origin = window.location.origin;
        const path = `/dashboard/workspace`;
        const query = `?tab=uploader&project=${selectedProjectId}&folder=${currentFolderId}`;
        const fullUrl = `${origin}${path}${query}`;
        
        console.log('[CRITICAL] Navigating with hard reload to:', fullUrl);
        
        // Use direct browser navigation - completely bypassing React Router
        window.location.href = fullUrl;
      } catch (err) {
        console.error('[CRITICAL] Navigation error:', err);
        toast.error('Failed to open uploader tab');
      }
    }, 100);
  }, [selectedProjectId, currentFolderId]);

  return {
    currentFolderId,
    setCurrentFolderId,
    handleFolderChange,
    handleBatchUpload
  };
};
