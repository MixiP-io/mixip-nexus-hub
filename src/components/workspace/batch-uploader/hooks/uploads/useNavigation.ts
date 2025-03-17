
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Hook for managing navigation to project views
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  
  // Navigate to project view with optional folder using direct navigation
  const navigateToProject = useCallback((projectId: string, folderId?: string) => {
    console.log(`[CRITICAL] Navigating to project: ${projectId}, folder: ${folderId || 'root'}`);
    
    if (!projectId) {
      console.error("Cannot navigate: No project ID provided");
      return;
    }
    
    // Show toast notification
    toast.info(folderId && folderId !== 'root' 
      ? `Viewing assets in folder for project ${projectId}` 
      : `Viewing assets for project ${projectId}`);
    
    // Use setTimeout to ensure toast shows before navigation
    setTimeout(() => {
      try {
        // Build URL with query parameters and absolute path
        const origin = window.location.origin;
        let path = `/dashboard/workspace`;
        let query = `?tab=assets&project=${projectId}`;
        
        // Add folder parameter if provided and not root
        if (folderId && folderId !== 'root') {
          query += `&folder=${folderId}`;
          console.log(`Adding folder parameter: ${folderId}`);
        }
        
        const fullUrl = `${origin}${path}${query}`;
        console.log(`[CRITICAL] Navigating to URL: ${fullUrl}`);
        
        // Use direct browser navigation for more reliable page transitions
        window.location.href = fullUrl;
      } catch (err) {
        console.error('[CRITICAL] Navigation error:', err);
        toast.error('Failed to navigate to project assets');
        
        // Fallback to React Router navigation
        let url = `/dashboard/workspace?tab=assets&project=${projectId}`;
        if (folderId && folderId !== 'root') {
          url += `&folder=${folderId}`;
        }
        navigate(url);
      }
    }, 100);
  }, [navigate]);
  
  return {
    navigateToProject
  };
};
