
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook for managing navigation to project views
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  
  // Navigate to project view
  const navigateToProject = useCallback((projectId: string) => {
    console.log(`Navigating to project: ${projectId}`);
    
    // Use react-router's navigate for better state handling
    navigate(`/dashboard/workspace?tab=assets&project=${projectId}`);
  }, [navigate]);
  
  return {
    navigateToProject
  };
};
