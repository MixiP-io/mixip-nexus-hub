
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

  // Handle batch upload - Forces a hard page reload to navigate to uploader
  const handleBatchUpload = useCallback(() => {
    if (!selectedProjectId) {
      console.warn('[useFolderNavigation] Cannot redirect to uploader: No project selected');
      navigate('/dashboard/workspace?tab=uploader');
      toast.info('Please select a project first');
      return;
    }

    console.log('[CRITICAL] Force redirecting to uploader with project:', selectedProjectId, 'folder:', currentFolderId);
    
    // Construct the URL for the uploader
    const baseUrl = window.location.origin;
    const uploaderPath = `/dashboard/workspace`;
    const queryParams = `?tab=uploader&project=${selectedProjectId}&folder=${currentFolderId}`;
    const fullUrl = `${baseUrl}${uploaderPath}${queryParams}`;
    
    console.log('[CRITICAL] Navigating with hard reload to:', fullUrl);
    
    // Show toast to provide feedback that something is happening
    toast.info(`Opening uploader to add assets...`);

    // Force browser to load the URL directly, bypassing React Router
    window.location.href = fullUrl;
  }, [selectedProjectId, currentFolderId, navigate]);

  return {
    currentFolderId,
    setCurrentFolderId,
    handleFolderChange,
    handleBatchUpload
  };
};
