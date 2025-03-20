
import { useReducer, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { UploaderState } from '../types';
import { initialState, uploaderReducer } from '../uploaderReducer';
import { getProjectById } from '../../utils/projectUtils';

/**
 * Core hook that sets up the reducer and provides basic state management
 */
export const useUploaderCore = () => {
  const [state, dispatch] = useReducer(uploaderReducer, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle files reset when component unmounts
  useEffect(() => {
    if (state.files.length === 0) {
      dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: false });
    }
    
    return () => {
      dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: false });
    };
  }, [state.files.length]);
  
  // File Input Handlers
  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  // Navigation
  const navigateToProject = useCallback((projectId: string, folderId?: string) => {
    const targetLocation = folderId && folderId !== 'root'
      ? `/dashboard/workspace/projects/${projectId}/folder/${folderId}`
      : `/dashboard/workspace/projects/${projectId}`;
    
    window.location.href = targetLocation;
  }, []);
  
  // Basic state setters
  const setUploadComplete = useCallback((isComplete: boolean) => {
    dispatch({ type: 'SET_UPLOAD_COMPLETE', payload: isComplete });
  }, []);

  return {
    state,
    dispatch,
    fileInputRef,
    triggerFileInput,
    navigateToProject,
    setUploadComplete
  };
};
