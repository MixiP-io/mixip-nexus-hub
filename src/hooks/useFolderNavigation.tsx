
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to handle folder navigation with URL synchronization
 */
export const useFolderNavigation = (projectId: string | null) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [folderName, setFolderName] = useState<string>('Root');
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Initialize from URL params
  useEffect(() => {
    if (!projectId) return;
    
    const folderParam = searchParams.get('folder');
    if (folderParam) {
      console.log(`[useFolderNavigation] Initializing from URL parameter: folder=${folderParam}`);
      setCurrentFolderId(folderParam);
      // Fetch folder name from database if not root
      if (folderParam !== 'root') {
        fetchFolderName(folderParam, projectId);
      } else {
        setFolderName('Root');
      }
    } else {
      setCurrentFolderId('root');
      setFolderName('Root');
    }
  }, [projectId, searchParams]);
  
  // Fetch folder name from database
  const fetchFolderName = async (folderId: string, projectId: string) => {
    if (folderId === 'root') {
      setFolderName('Root');
      return;
    }
    
    try {
      console.log(`[useFolderNavigation] Fetching folder name for: ${folderId}`);
      const { data, error } = await supabase
        .from('project_folders')
        .select('name')
        .eq('id', folderId)
        .eq('project_id', projectId)
        .single();
        
      if (error) {
        console.error('[useFolderNavigation] Error fetching folder name:', error);
        setFolderName('Unknown Folder');
      } else if (data) {
        console.log(`[useFolderNavigation] Folder name fetched: ${data.name}`);
        setFolderName(data.name);
      }
    } catch (err) {
      console.error('[useFolderNavigation] Error:', err);
    }
  };
  
  // Handle folder navigation
  const navigateToFolder = useCallback((folderId: string, name?: string, updateUrl = true) => {
    if (isNavigating) return;
    setIsNavigating(true);
    
    console.log(`[useFolderNavigation] Navigating to folder: ${folderId} ${name ? `(${name})` : ''}`);
    
    // Update state
    setCurrentFolderId(folderId);
    
    // Update folder name
    if (name) {
      setFolderName(name);
    } else if (folderId === 'root') {
      setFolderName('Root');
    } else if (projectId) {
      // Fetch folder name if not provided
      fetchFolderName(folderId, projectId);
    }
    
    // Update URL if needed
    if (updateUrl && projectId) {
      const newParams = new URLSearchParams(searchParams);
      if (folderId === 'root') {
        newParams.delete('folder');
      } else {
        newParams.set('folder', folderId);
      }
      setSearchParams(newParams);
    }
    
    // Show toast notification
    if (folderId === 'root') {
      toast.info('Viewing root folder');
    } else {
      toast.info(`Viewing folder: ${name || folderId}`);
    }
    
    // Reset navigation lock
    setTimeout(() => setIsNavigating(false), 300);
  }, [projectId, searchParams, setSearchParams, isNavigating]);
  
  return {
    currentFolderId,
    folderName,
    navigateToFolder,
    setCurrentFolderId
  };
};
