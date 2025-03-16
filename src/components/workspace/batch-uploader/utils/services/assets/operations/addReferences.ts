
import { ProjectAsset } from '../../../types/projectTypes';

/**
 * Add reference copies of assets to the project root
 * @param updatedProjects - The array of projects to update
 * @param projectIndex - Index of the project in the array
 * @param assets - Assets to create references for
 */
export const addReferenceAssetsToRoot = (
  updatedProjects: any[],
  projectIndex: number,
  assets: ProjectAsset[]
): void => {
  // Ensure assets array exists in root
  if (!Array.isArray(updatedProjects[projectIndex].assets)) {
    updatedProjects[projectIndex].assets = [];
  }
  
  // Create reference copies that point to the folder
  const referenceAssets = assets.map(asset => ({
    ...asset,
    isReference: true // Mark as reference to avoid duplication in UI
  }));
  
  console.log(`[CRITICAL] Adding ${referenceAssets.length} reference assets to project root`);
  
  // Add reference assets to root for backup access
  updatedProjects[projectIndex].assets = [
    ...updatedProjects[projectIndex].assets,
    ...referenceAssets
  ];
};
