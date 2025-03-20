
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { getProjectById } from '@/components/workspace/batch-uploader/utils/projectUtils';
import { ensureProjectDataIntegrity } from '@/components/workspace/batch-uploader/utils/data/projectStore';
import { syncProjectsWithLocalStorage } from '@/components/workspace/batch-uploader/utils/services/projectManagement/syncOperations';

/**
 * Hook to load project data with retry capability
 */
export const useProjectLoader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Function to load project with retries
  const loadProjectWithRetries = useCallback(async (projectId: string, maxRetries = 3) => {
    let retryCount = 0;
    let project = null;
    
    while (retryCount < maxRetries && !project) {
      try {
        console.log(`[useProjectLoader] Loading project from Supabase, attempt ${retryCount + 1}`);
        
        // First, try to get project from Supabase
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
          
        if (projectError) {
          console.error('[useProjectLoader] Error fetching project from Supabase:', projectError);
          
          // Fallback to localStorage if Supabase fails
          try {
            console.log('[useProjectLoader] Falling back to local storage');
            ensureProjectDataIntegrity();
            syncProjectsWithLocalStorage();
            project = getProjectById(projectId);
            
            if (project) {
              console.log(`[useProjectLoader] Found project in localStorage (attempt ${retryCount + 1}):`, project.name);
              break;
            }
          } catch (e) {
            console.error(`[useProjectLoader] Error reading from localStorage (attempt ${retryCount + 1}):`, e);
          }
        } else {
          console.log('[useProjectLoader] Successfully loaded project from Supabase:', projectData.name);
          project = projectData;
          
          // Now get project assets
          const { data: assets, error: assetsError } = await supabase
            .from('assets')
            .select('*')
            .eq('project_id', projectId)
            .is('folder_id', null);
            
          if (assetsError) {
            console.error('[useProjectLoader] Error fetching assets:', assetsError);
          } else {
            console.log(`[useProjectLoader] Loaded ${assets.length} root assets for project`);
            project.assets = assets;
          }
          
          // Get folders for the project
          const { data: folders, error: foldersError } = await supabase
            .from('project_folders')
            .select('*')
            .eq('project_id', projectId);
            
          if (foldersError) {
            console.error('[useProjectLoader] Error fetching folders:', foldersError);
            project.subfolders = [];
          } else {
            console.log(`[useProjectLoader] Loaded ${folders.length} folders for project`);
            
            // For each folder, get its assets
            const foldersWithAssets = await Promise.all(
              folders.map(async (folder) => {
                const { data: folderAssets, error: folderAssetsError } = await supabase
                  .from('assets')
                  .select('*')
                  .eq('project_id', projectId)
                  .eq('folder_id', folder.id);
                  
                if (folderAssetsError) {
                  console.error(`[useProjectLoader] Error fetching assets for folder ${folder.id}:`, folderAssetsError);
                  return { ...folder, assets: [] };
                }
                
                console.log(`[useProjectLoader] Folder ${folder.name} (${folder.id}) has ${folderAssets.length} assets`);
                return { ...folder, assets: folderAssets };
              })
            );
            
            project.subfolders = foldersWithAssets;
          }
          
          break;
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`[useProjectLoader] Retrying project load, attempt ${retryCount + 1} of ${maxRetries}`);
          // Wait before retrying
          await new Promise(r => setTimeout(r, 300 * retryCount));
        }
      } catch (error) {
        console.error(`[useProjectLoader] Error in loadProjectWithRetries (attempt ${retryCount + 1}):`, error);
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(r => setTimeout(r, 300 * retryCount));
        }
      }
    }
    
    return project;
  }, []);

  return { 
    loadProjectWithRetries,
    isLoading,
    setIsLoading
  };
};
