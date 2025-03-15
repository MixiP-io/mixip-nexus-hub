
import { toast } from 'sonner';
import { ProjectAsset } from '../types/projectTypes';
import { projects } from '../data/projectStore';

/**
 * Find and validate a project by ID
 * @param projectId - ID of the project to find
 * @returns Object containing project index and project data, or null if not found
 */
export const findProject = (projectId: string): { projectIndex: number, project: any } | null => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return null;
  }
  
  return { projectIndex, project: projects[projectIndex] };
};

/**
 * Update a project's cover image if it doesn't have one yet
 * @param projectIndex - Index of the project in the projects array
 * @param assets - Assets to check for potential cover images
 * @param projectsCopy - Deep copy of the projects array
 * @returns Boolean indicating if a cover image was set
 */
export const updateProjectCoverIfNeeded = (
  projectIndex: number, 
  assets: ProjectAsset[],
  projectsCopy: typeof projects
): boolean => {
  // If this is the first asset being added to the project, set it as the cover image
  const shouldUpdateCoverImage = (
    projectsCopy[projectIndex].assets.length === 0 && 
    !projectsCopy[projectIndex].coverImage &&
    assets.some(asset => asset.preview)
  );
  
  if (shouldUpdateCoverImage) {
    const firstImageAsset = assets.find(asset => asset.preview);
    if (firstImageAsset) {
      projectsCopy[projectIndex].coverImage = firstImageAsset.preview;
      return true;
    }
  }
  
  return false;
};

/**
 * Find an asset in a project recursively
 * @param project - Project to search in
 * @param assetId - ID of the asset to find
 * @returns The found asset or null if not found
 */
export const findAssetInProject = (
  project: typeof projects[number], 
  assetId: string
): ProjectAsset | null => {
  // Check project root assets
  const rootAsset = project.assets.find(a => a.id === assetId);
  if (rootAsset) {
    return rootAsset;
  }
  
  // Search in subfolders recursively
  const findInFolders = (folders: typeof project.subfolders): ProjectAsset | null => {
    for (const folder of folders) {
      const folderAsset = folder.assets.find(a => a.id === assetId);
      if (folderAsset) {
        return folderAsset;
      }
      
      if (folder.subfolders.length > 0) {
        const nestedAsset = findInFolders(folder.subfolders);
        if (nestedAsset) {
          return nestedAsset;
        }
      }
    }
    return null;
  };
  
  return findInFolders(project.subfolders);
};
