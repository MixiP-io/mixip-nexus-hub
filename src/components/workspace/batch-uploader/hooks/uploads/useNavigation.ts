
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Hook for managing navigation to project views
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  
  // Navigate to project view
  const navigateToProject = useCallback((projectId: string) => {
    console.log(`Navigating to project: ${projectId}`);
    
    if (!projectId) {
      console.error("Cannot navigate: No project ID provided");
      return;
    }
    
    // Build URL with query parameters
    let url = `/dashboard/workspace?tab=assets&project=${projectId}`;
    
    // Use react-router's navigate for better state handling
    navigate(url);
    
    // Add a small delay and then show a toast to guide the user
    setTimeout(() => {
      console.log("Navigation to project assets complete");
      toast.info(`Now viewing assets for project ${projectId}`);
    }, 300);
  }, [navigate]);
  
  return {
    navigateToProject
  };
};
