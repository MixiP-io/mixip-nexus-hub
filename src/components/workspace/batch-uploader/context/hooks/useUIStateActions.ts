
import { useCallback } from 'react';
import { toast } from 'sonner';
import { UploaderState } from '../types';
import { UploadSource } from '../../types';
import { getProjectById } from '../../utils/projectUtils';

/**
 * Hook for UI state actions and navigation
 */
export const useUIStateActions = (state: UploaderState, dispatch: React.Dispatch<any>) => {
  // UI State Actions
  const setActiveView = useCallback((view: 'source' | 'metadata' | 'project') => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  }, [dispatch]);
  
  const setActiveSource = useCallback((source: UploadSource) => {
    dispatch({ type: 'SET_ACTIVE_SOURCE', payload: source });
  }, [dispatch]);
  
  const setTags = useCallback((tags: string[]) => {
    dispatch({ type: 'SET_TAGS', payload: tags });
  }, [dispatch]);
  
  const setSelectedLicense = useCallback((license: string) => {
    dispatch({ type: 'SET_LICENSE', payload: license });
  }, [dispatch]);
  
  const setUsageRights = useCallback((rights: Record<string, boolean>) => {
    dispatch({ type: 'SET_USAGE_RIGHTS', payload: rights });
  }, [dispatch]);
  
  const setSelectedProject = useCallback((projectId: string) => {
    if (!projectId) {
      dispatch({ 
        type: 'SELECT_PROJECT', 
        payload: { projectId: '', projectName: '' } 
      });
      return;
    }
    
    const project = getProjectById(projectId);
    if (project) {
      dispatch({ 
        type: 'SELECT_PROJECT', 
        payload: { projectId, projectName: project.name } 
      });
    } else {
      console.error(`Project not found: ${projectId}`);
      toast.error("Project not found");
    }
  }, [dispatch]);
  
  const setSelectedFolder = useCallback((folderId: string) => {
    dispatch({ type: 'SET_SELECTED_FOLDER', payload: folderId });
  }, [dispatch]);

  return {
    setActiveView,
    setActiveSource,
    setTags,
    setSelectedLicense,
    setUsageRights,
    setSelectedProject,
    setSelectedFolder
  };
};
