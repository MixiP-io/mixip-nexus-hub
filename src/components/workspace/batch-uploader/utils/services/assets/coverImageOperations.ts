
import { ProjectAsset } from '../../types/projectTypes';

/**
 * Updates project cover image if needed
 * @param projectIndex - Index of the project to update
 * @param assets - Assets that might be used as cover
 * @param updatedProjects - Array of projects to update
 * @returns The updated projects array
 */
export const updateProjectCoverIfNeeded = (
  projectIndex: number,
  assets: ProjectAsset[],
  updatedProjects: any[]
): any[] => {
  // Only update cover if project doesn't already have one
  if (!updatedProjects[projectIndex].coverImage) {
    // Find first image asset with a preview to use as cover
    const imageAsset = assets.find(asset => 
      asset.type.startsWith('image/') && asset.preview
    );
    
    if (imageAsset && imageAsset.preview) {
      console.log(`[coverImageOperations] Setting cover image from asset: ${imageAsset.id}`);
      updatedProjects[projectIndex].coverImage = imageAsset.preview;
    }
  }
  
  return updatedProjects;
};
