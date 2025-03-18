import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { getProjectById } from '../../batch-uploader/utils/projectUtils';
import { ensureProjectDataIntegrity } from '../../batch-uploader/utils/data/projectStore';
import { syncProjectsWithLocalStorage } from '../../batch-uploader/utils/services/projectManagement/syncOperations';

/**
 * Hook to load and manage project assets
 */
export const useProjectAssets = (selectedProjectId: string | null, currentFolderId: string) => {
  const [projectData, setProjectData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Function to load project with retries
  const loadProjectWithRetries = useCallback(async (projectId: string, maxRetries = 3) => {
    let retryCount = 0;
    let project = null;
    
    while (retryCount < maxRetries && !project) {
      try {
        console.log(`[useProjectAssets] Loading project from Supabase, attempt ${retryCount + 1}`);
        
        // First, try to get project from Supabase
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
          
        if (projectError) {
          console.error('[useProjectAssets] Error fetching project from Supabase:', projectError);
          
          // Fallback to localStorage if Supabase fails
          try {
            console.log('[useProjectAssets] Falling back to local storage');
            ensureProjectDataIntegrity();
            syncProjectsWithLocalStorage();
            project = getProjectById(projectId);
            
            if (project) {
              console.log(`[useProjectAssets] Found project in localStorage (attempt ${retryCount + 1}):`, project.name);
              break;
            }
          } catch (e) {
            console.error(`[useProjectAssets] Error reading from localStorage (attempt ${retryCount + 1}):`, e);
          }
        } else {
          console.log('[useProjectAssets] Successfully loaded project from Supabase:', projectData.name);
          project = projectData;
          
          // Now get project assets
          const { data: assets, error: assetsError } = await supabase
            .from('assets')
            .select('*')
            .eq('project_id', projectId)
            .is('folder_id', null);
            
          if (assetsError) {
            console.error('[useProjectAssets] Error fetching assets:', assetsError);
          } else {
            console.log(`[useProjectAssets] Loaded ${assets.length} root assets for project`);
            project.assets = assets;
          }
          
          // Get folders for the project
          const { data: folders, error: foldersError } = await supabase
            .from('project_folders')
            .select('*')
            .eq('project_id', projectId);
            
          if (foldersError) {
            console.error('[useProjectAssets] Error fetching folders:', foldersError);
            project.subfolders = [];
          } else {
            console.log(`[useProjectAssets] Loaded ${folders.length} folders for project`);
            
            // For each folder, get its assets
            const foldersWithAssets = await Promise.all(
              folders.map(async (folder) => {
                const { data: folderAssets, error: folderAssetsError } = await supabase
                  .from('assets')
                  .select('*')
                  .eq('project_id', projectId)
                  .eq('folder_id', folder.id);
                  
                if (folderAssetsError) {
                  console.error(`[useProjectAssets] Error fetching assets for folder ${folder.id}:`, folderAssetsError);
                  return { ...folder, assets: [] };
                }
                
                console.log(`[useProjectAssets] Folder ${folder.name} (${folder.id}) has ${folderAssets.length} assets`);
                return { ...folder, assets: folderAssets };
              })
            );
            
            project.subfolders = foldersWithAssets;
          }
          
          break;
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`[useProjectAssets] Retrying project load, attempt ${retryCount + 1} of ${maxRetries}`);
          // Wait before retrying
          await new Promise(r => setTimeout(r, 300 * retryCount));
        }
      } catch (error) {
        console.error(`[useProjectAssets] Error in loadProjectWithRetries (attempt ${retryCount + 1}):`, error);
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(r => setTimeout(r, 300 * retryCount));
        }
      }
    }
    
    return project;
  }, []);
  
  // Load project data when selectedProjectId changes
  useEffect(() => {
    if (selectedProjectId) {
      console.log('[useProjectAssets] Fetching project data for ID:', selectedProjectId);
      setIsLoading(true);
      
      loadProjectWithRetries(selectedProjectId)
        .then(project => {
          if (project) {
            console.log('[useProjectAssets] Project found:', project.name);
            
            // Make a deep copy to avoid reference issues
            const projectCopy = JSON.parse(JSON.stringify(project));
            setProjectData(projectCopy);
            
            // Debug asset counts
            console.log('[useProjectAssets] Root assets count:', project.assets?.length || 0);
            if (project.subfolders) {
              project.subfolders.forEach((folder: any) => {
                console.log(`[useProjectAssets] Folder "${folder.name}" assets:`, folder.assets?.length || 0);
                
                // Debug first few assets in each folder
                if (folder.assets && folder.assets.length > 0) {
                  console.log(`Sample assets in folder "${folder.name}":`, 
                    folder.assets.slice(0, 2).map((a: any) => ({ id: a.id, name: a.name }))
                  );
                }
              });
            }
            
            // If current folder ID is set but the folder doesn't exist, reset to root
            if (currentFolderId !== 'root' && project.subfolders) {
              const folderExists = project.subfolders.some((folder: any) => folder.id === currentFolderId);
              if (!folderExists) {
                console.log(`[useProjectAssets] Current folder ID ${currentFolderId} doesn't exist in project`);
              }
            }
          } else {
            console.log(`[useProjectAssets] Project not found for ID: ${selectedProjectId}`);
            setProjectData(null);
            toast.error('Project not found, please try refreshing the page');
          }
        })
        .catch(error => {
          console.error('[useProjectAssets] Error loading project:', error);
          toast.error('Failed to load project data, please try refreshing the page');
          setProjectData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log('[useProjectAssets] No project selected');
      setProjectData(null);
      setIsLoading(false);
    }
  }, [selectedProjectId, currentFolderId, loadProjectWithRetries]);

  // Get assets for the current folder
  const currentFolderAssets = useMemo(() => {
    if (!projectData) return [];
    
    console.log(`[useProjectAssets] Getting assets for current folder: ${currentFolderId}`);
    
    // If viewing root folder, return root assets
    if (currentFolderId === 'root') {
      console.log(`[useProjectAssets] Returning root assets: ${projectData.assets?.length || 0}`);
      return projectData.assets ? [...projectData.assets] : [];
    }
    
    // Otherwise, search for the specified folder
    if (projectData.subfolders && projectData.subfolders.length > 0) {
      const targetFolder = projectData.subfolders.find((folder: any) => folder.id === currentFolderId);
      
      if (targetFolder) {
        console.log(`[useProjectAssets] Found folder "${targetFolder.name}" with ${targetFolder.assets?.length || 0} assets`);
        
        if (targetFolder.assets && targetFolder.assets.length > 0) {
          // Debug the first few assets to make sure they're valid
          console.log('Sample assets from folder:', targetFolder.assets.slice(0, 2));
          return [...targetFolder.assets];
        } else {
          console.log('[useProjectAssets] Folder exists but has no assets');
          return [];
        }
      } else {
        console.log(`[useProjectAssets] No folder found with ID ${currentFolderId}`);
      }
    }
    
    console.log(`[useProjectAssets] Folder ${currentFolderId} not found, returning empty array`);
    return [];
  }, [projectData, currentFolderId]);
  
  // Determine if there are assets in any folders
  const folderAssetInfo = useMemo(() => {
    let hasAssetsInFolders = false;
    let foldersWithAssets: string[] = [];
    
    if (projectData?.subfolders && projectData.subfolders.length > 0) {
      projectData.subfolders.forEach((folder: any) => {
        if (folder.assets && folder.assets.length > 0) {
          hasAssetsInFolders = true;
          foldersWithAssets.push(folder.name);
        }
      });
    }
    
    return { hasAssetsInFolders, foldersWithAssets };
  }, [projectData]);

  return {
    projectData,
    currentFolderAssets,
    hasAssetsInFolders: folderAssetInfo.hasAssetsInFolders,
    foldersWithAssets: folderAssetInfo.foldersWithAssets,
    isLoading
  };
};
