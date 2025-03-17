
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { getProjectById } from '../../batch-uploader/utils/projectUtils';

/**
 * Hook to load and manage project assets
 */
export const useProjectAssets = (selectedProjectId: string | null, currentFolderId: string) => {
  const [projectData, setProjectData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load project data when selectedProjectId changes
  useEffect(() => {
    if (selectedProjectId) {
      console.log('[useProjectAssets] Fetching project data for ID:', selectedProjectId);
      setIsLoading(true);
      
      try {
        // Force direct read from localStorage for latest data
        let project = null;
        try {
          const projectsJson = localStorage.getItem('projects');
          if (projectsJson) {
            const projects = JSON.parse(projectsJson);
            project = projects.find((p: any) => p.id === selectedProjectId);
          }
        } catch (e) {
          console.error("Error reading from localStorage:", e);
        }
        
        // Fall back to getProjectById if localStorage failed
        if (!project) {
          console.log('[useProjectAssets] Falling back to getProjectById');
          project = getProjectById(selectedProjectId);
        }
        
        if (project) {
          console.log('[useProjectAssets] Project found:', project.name);
          
          // Make a deep copy to avoid reference issues
          setProjectData(JSON.parse(JSON.stringify(project)));
          
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
          toast.error('Project not found');
        }
      } catch (error) {
        console.error('[useProjectAssets] Error loading project:', error);
        toast.error('Failed to load project data');
        setProjectData(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('[useProjectAssets] No project selected');
      setProjectData(null);
      setIsLoading(false);
    }
  }, [selectedProjectId, currentFolderId]);

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
