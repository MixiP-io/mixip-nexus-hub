
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to manage folder assets
 */
export const useFolderAssets = () => {
  const [folderAssets, setFolderAssets] = useState<any[]>([]);

  // Load current folder assets directly from Supabase
  const reloadFolderAssets = useCallback(async (selectedProjectId: string | null, currentFolderId: string) => {
    if (!selectedProjectId) return;
    
    try {
      console.log(`[useFolderAssets] Directly loading assets for folder: ${currentFolderId}`);
      
      if (currentFolderId === 'root') {
        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .eq('project_id', selectedProjectId)
          .is('folder_id', null);
          
        if (error) {
          console.error('[useFolderAssets] Error loading root assets:', error);
        } else {
          console.log(`[useFolderAssets] Loaded ${data.length} root assets directly`);
          setFolderAssets(data);
        }
      } else {
        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .eq('project_id', selectedProjectId)
          .eq('folder_id', currentFolderId);
          
        if (error) {
          console.error(`[useFolderAssets] Error loading folder assets for ${currentFolderId}:`, error);
        } else {
          console.log(`[useFolderAssets] Loaded ${data.length} assets for folder ${currentFolderId} directly`);
          setFolderAssets(data);
        }
      }
    } catch (err) {
      console.error('[useFolderAssets] Error in reloadFolderAssets:', err);
    }
  }, []);

  return {
    folderAssets,
    setFolderAssets,
    reloadFolderAssets
  };
};
