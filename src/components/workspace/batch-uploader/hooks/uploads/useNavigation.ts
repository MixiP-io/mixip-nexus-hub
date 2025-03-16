
import { useCallback } from 'react';

/**
 * Hook for managing navigation to project views
 */
export const useNavigation = () => {
  // Navigate to project view
  const navigateToProject = useCallback((projectId: string) => {
    // In a real app, this would navigate to the project page
    console.log(`Navigating to project: ${projectId}`);
    
    // Force window navigation to ensure fresh load
    window.location.href = `/dashboard/workspace?tab=assets&project=${projectId}`;
  }, []);
  
  return {
    navigateToProject
  };
};
