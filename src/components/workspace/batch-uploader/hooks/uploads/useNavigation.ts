
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

/**
 * Hook for handling navigation after upload
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  /**
   * Navigate to project assets view
   * @param projectId - ID of the project to navigate to
   * @param folderId - Optional ID of the folder to navigate to
   */
  const navigateToProject = useCallback((projectId: string, folderId: string = 'root') => {
    if (!projectId) {
      console.error("[useNavigation] No project ID provided for navigation");
      toast.error("Unable to navigate: Project ID is missing");
      return;
    }
    
    console.log(`[useNavigation] Navigating to project ${projectId}, folder: ${folderId || 'root'}`);
    
    // Build the URL with the folder ID
    let url = `/dashboard/workspace?project=${projectId}`;
    
    // Add folder ID if it's not root
    if (folderId && folderId !== 'root') {
      url += `&folder=${folderId}`;
    }
    
    // Navigate to the assets view with the project ID and folder ID
    navigate(url);
    
    // Show success toast
    if (folderId && folderId !== 'root') {
      toast.success(`Navigating to folder in project ${projectId}`);
    } else {
      toast.success(`Navigating to project ${projectId}`);
    }
  }, [navigate]);

  return { navigateToProject };
};
