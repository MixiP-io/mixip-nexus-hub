
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to manage folder assets with automatic refresh capability
 */
export const useFolderAssets = () => {
  const [folderAssets, setFolderAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Force refresh of assets
  const forceRefresh = useCallback(() => {
    setLastRefresh(Date.now());
  }, []);

  // Load current folder assets directly from Supabase
  const reloadFolderAssets = useCallback(async (
    selectedProjectId: string | null, 
    currentFolderId: string,
    showToasts = true
  ) => {
    if (!selectedProjectId) {
      console.log('[useFolderAssets] No project ID provided, clearing assets');
      setFolderAssets([]);
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log(`[useFolderAssets] Loading assets for project: ${selectedProjectId}, folder: ${currentFolderId}`);
      
      if (currentFolderId === 'root') {
        // Root folder assets don't have folder_id
        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .eq('project_id', selectedProjectId)
          .is('folder_id', null);
          
        if (error) {
          console.error('[useFolderAssets] Error loading root assets:', error);
          if (showToasts) {
            toast.error('Failed to load folder assets');
          }
          setFolderAssets([]);
        } else {
          console.log(`[useFolderAssets] Loaded ${data.length} root assets directly from Supabase`);
          
          if (data.length > 0) {
            console.log('First few assets:', data.slice(0, 2));
          }
          
          setFolderAssets(data || []);
        }
      } else {
        // Subfolder assets have matching folder_id
        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .eq('project_id', selectedProjectId)
          .eq('folder_id', currentFolderId);
          
        if (error) {
          console.error(`[useFolderAssets] Error loading folder assets for ${currentFolderId}:`, error);
          if (showToasts) {
            toast.error('Failed to load folder assets');
          }
          setFolderAssets([]);
        } else {
          console.log(`[useFolderAssets] Loaded ${data.length} assets for folder ${currentFolderId} directly from Supabase`);
          
          if (data.length > 0) {
            console.log('First few assets:', data.slice(0, 2));
          }
          
          setFolderAssets(data || []);
        }
      }
    } catch (err) {
      console.error('[useFolderAssets] Unexpected error in reloadFolderAssets:', err);
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
    setFolderAssets,
    reloadFolderAssets,
    isLoading,
    forceRefresh,
    lastRefresh
  };
};
