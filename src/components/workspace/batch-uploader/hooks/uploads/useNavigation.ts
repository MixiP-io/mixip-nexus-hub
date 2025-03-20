
import { useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook for handling navigation after uploads
 */
export const useNavigation = () => {
  const navigateToProject = useCallback((projectId: string, folderId: string = 'root') => {
    if (!projectId) {
      console.error('[useNavigation] Cannot navigate: Missing project ID');
      return;
    }
    
    console.log(`[CRITICAL] Navigating to project ${projectId}, folder: ${folderId}`);
    
    // Construct URL with both project and folder params
    const origin = window.location.origin;
    const url = `${origin}/dashboard/workspace?tab=assets&project=${projectId}&folder=${folderId}`;
    
    console.log(`[useNavigation] Redirecting to: ${url}`);
    
    // Navigate to the URL
    window.location.href = url;
  }, []);
  
  return {
    navigateToProject
  };
};
