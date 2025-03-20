
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to load and manage assets within a folder
 */
export const useFolderAssets = () => {
  const [folderAssets, setFolderAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load folder assets from Supabase
  const loadFolderAssets = useCallback(async (
    projectId: string | null, 
    folderId: string,
    showToasts = true
  ) => {
    if (!projectId) {
      setFolderAssets([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[useFolderAssets] Loading assets for project: ${projectId}, folder: ${folderId}`);
      
      let query;
      if (folderId === 'root') {
        // Root folder assets don't have folder_id
        query = supabase
          .from('assets')
          .select('*')
          .eq('project_id', projectId)
          .is('folder_id', null);
      } else {
        // Subfolder assets have matching folder_id
        query = supabase
          .from('assets')
          .select('*')
          .eq('project_id', projectId)
          .eq('folder_id', folderId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('[useFolderAssets] Error loading assets:', error);
        setError(`Failed to load assets: ${error.message}`);
        if (showToasts) {
          toast.error('Failed to load folder assets');
        }
        setFolderAssets([]);
      } else {
        console.log(`[useFolderAssets] Loaded ${data.length} assets for folder ${folderId}`);
        
        // Debug the first few assets
        if (data.length > 0) {
          console.log('First few assets:', data.slice(0, 2));
        }
        
        setFolderAssets(data || []);
        
        if (data.length === 0 && showToasts) {
          toast.info('No assets found in this folder');
        }
      }
    } catch (err) {
      console.error('[useFolderAssets] Unexpected error:', err);
      setError('An unexpected error occurred');
      if (showToasts) {
        toast.error('Failed to load folder assets');
      }
      setFolderAssets([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    folderAssets,
    isLoading,
    error,
    loadFolderAssets,
    setFolderAssets
  };
};
