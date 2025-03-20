
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useProjectLoader } from './project-assets/useProjectLoader';
import { useFolderAssets } from './project-assets/useFolderAssets';
import { useAssetInfo } from './project-assets/useAssetInfo';

/**
 * Main hook to load and manage project assets
 * Composes smaller, more focused hooks
 */
export const useProjectAssets = (selectedProjectId: string | null, currentFolderId: string) => {
  const [projectData, setProjectData] = useState<any | null>(null);
  const { loadProjectWithRetries, isLoading, setIsLoading } = useProjectLoader();
  const { folderAssets, reloadFolderAssets } = useFolderAssets();
  const { currentFolderAssets, hasAssetsInFolders, foldersWithAssets } = useAssetInfo(
    projectData, 
    currentFolderId, 
    folderAssets
  );
  
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
          // After project is loaded, fetch current folder assets directly
          reloadFolderAssets(selectedProjectId, currentFolderId);
        });
    } else {
      console.log('[useProjectAssets] No project selected');
      setProjectData(null);
      setIsLoading(false);
    }
  }, [selectedProjectId, currentFolderId, loadProjectWithRetries, reloadFolderAssets, setIsLoading]);

  // Reload folder assets when folder changes
  useEffect(() => {
    if (selectedProjectId) {
      reloadFolderAssets(selectedProjectId, currentFolderId);
    }
  }, [selectedProjectId, currentFolderId, reloadFolderAssets]);

  return {
    projectData,
    currentFolderAssets,
    hasAssetsInFolders,
    foldersWithAssets,
    isLoading,
    reloadFolderAssets
  };
};
