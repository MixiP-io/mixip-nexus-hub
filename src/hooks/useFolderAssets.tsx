
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to load and manage assets within a folder with real-time updates
 */
export const useFolderAssets = () => {
  const [folderAssets, setFolderAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

  // Force reload assets
  const forceReload = useCallback(() => {
    console.log('[useFolderAssets] Forcing reload of assets');
    setRefreshTrigger(Date.now());
  }, []);

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
          toast({
            title: "Failed to load folder assets",
            description: error.message,
            variant: "destructive"
          });
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
          toast({
            title: "No assets found",
            description: "No assets found in this folder",
            variant: "default"
          });
        }
      }
    } catch (err) {
      console.error('[useFolderAssets] Unexpected error:', err);
      setError('An unexpected error occurred');
      if (showToasts) {
        toast({
          title: "Failed to load folder assets",
          description: "An unexpected error occurred",
          variant: "destructive"
        });
      }
      setFolderAssets([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up real-time subscription for assets changes
  useEffect(() => {
    const setupRealtimeSubscription = (projectId: string | null) => {
      if (!projectId) return null;
      
      console.log(`[useFolderAssets] Setting up realtime subscription for project ${projectId}`);
      
      const channel = supabase
        .channel(`assets-changes-${projectId}`)
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'assets',
            filter: `project_id=eq.${projectId}`
          }, 
          (payload) => {
            console.log('[useFolderAssets] Received asset change:', payload);
            forceReload();
          }
        )
        .subscribe();
        
      return channel;
    };
    
    // Clean up subscription on unmount
    return () => {
      // Cleanup will be performed in the next useEffect that depends on projectId
    };
  }, [forceReload]);

  return {
    folderAssets,
    isLoading,
    error,
    loadFolderAssets,
    setFolderAssets,
    forceReload
  };
};
