
import { supabase } from '@/integrations/supabase/client';
import { ProjectAsset } from '../../../types/projectTypes';
import { 
  addAssetsToRootFolder, 
  addAssetsToSpecificFolder, 
  createNewFolderWithAssets 
} from '../folder-operations';

/**
 * Process assets by adding them to the appropriate folder
 * @param updatedProjects - The array of projects to update
 * @param projectIndex - Index of the project in the array
 * @param normalizedFolderId - Normalized folder ID
 * @param assets - Assets to add
 * @returns Object with folder information
 */
export const processAssetsByFolder = async (
  updatedProjects: any[],
  projectIndex: number,
  normalizedFolderId: string,
  assets: ProjectAsset[]
): Promise<{ folderFound: boolean; locationAdded: string; folderName: string }> => {
  let folderFound = false;
  let locationAdded = normalizedFolderId;
  let folderName = 'root';

  // Add assets to root folder
  if (normalizedFolderId === 'root') {
    addAssetsToRootFolder(updatedProjects, projectIndex, assets);
    folderFound = true;
    locationAdded = 'root';
    folderName = 'root';
    console.log(`[assetService] Added ${assets.length} assets to root folder in localStorage`);
    return { folderFound, locationAdded, folderName };
  }

  // Try to find existing folder in database
  try {
    const { data: existingFolder, error: folderCheckError } = await supabase
      .from('project_folders')
      .select('id, name')
      .eq('id', normalizedFolderId)
      .maybeSingle();

    if (folderCheckError) {
      console.error('[assetService] Error checking folder by ID:', folderCheckError);
    } else if (existingFolder) {
      folderName = existingFolder.name;
      console.log(`[assetService] Found existing folder in database by ID: ${folderName} (${existingFolder.id})`);
    }
  } catch (err) {
    console.error('[assetService] Error checking folder in database:', err);
  }

  // Try to add to specified folder
  const result = addAssetsToSpecificFolder(updatedProjects, projectIndex, normalizedFolderId, assets);
  folderFound = result.folderFound;
  locationAdded = result.locationAdded;

  console.log(`[assetService] Folder operation result: found=${folderFound}, location=${locationAdded}`);

  // If folder still not found, create a new one
  if (!folderFound) {
    console.log(`[assetService] Folder ${normalizedFolderId} not found, creating new folder`);
    const newFolderResult = createNewFolderWithAssets(updatedProjects, projectIndex, normalizedFolderId, assets);
    folderFound = newFolderResult.folderFound;
    locationAdded = newFolderResult.locationAdded;
    folderName = locationAdded; // Use the created folder name
    console.log(`[assetService] New folder created: ${locationAdded}`);
  }

  return { folderFound, locationAdded, folderName };
};
