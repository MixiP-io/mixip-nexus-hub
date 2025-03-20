
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ProjectAsset } from '../../../types/projectTypes';

/**
 * Save project assets to Supabase database
 * @param projectId - ID of the project to save assets to
 * @param assets - Assets to save
 * @param normalizedFolderId - Normalized folder ID
 * @param folderName - Name of the folder
 * @returns Object with folder database ID
 */
export const saveProjectAssetsToDatabase = async (
  projectId: string,
  assets: ProjectAsset[],
  normalizedFolderId: string,
  folderName: string
): Promise<{ folderDbId: string | null }> => {
  console.log('[assetService] Saving assets to Supabase database');
  let folderDbId = null;

  // If this is a folder other than root, ensure it exists in the database
  if (normalizedFolderId !== 'root') {
    console.log(`[assetService] Checking if folder ${normalizedFolderId} exists in database`);
    folderDbId = await ensureFolderExistsInDatabase(projectId, normalizedFolderId, folderName);
  }

  // Save all assets to database
  console.log(`[assetService] Saving ${assets.length} assets to database with folder ID: ${folderDbId}`);

  const assetsToInsert = assets.map(asset => ({
    name: asset.name,
    type: asset.type,
    size: asset.size,
    project_id: projectId,
    folder_id: folderDbId, // Will be null for root folder
    preview_url: asset.preview,
    license_type: asset.licenseType,
    uploaded_at: new Date().toISOString(),
    user_id: '00000000-0000-0000-0000-000000000000' // Placeholder, will be replaced by auth.uid()
  }));

  const { data: insertedAssets, error: insertError } = await supabase
    .from('assets')
    .insert(assetsToInsert)
    .select();

  if (insertError) {
    console.error('[assetService] Error inserting assets into database:', insertError);
    toast.error('Error saving assets to database');
  } else {
    console.log(`[assetService] Successfully saved ${insertedAssets.length} assets to database`);
  }

  return { folderDbId };
};

/**
 * Ensure folder exists in database
 * @param projectId - ID of the project
 * @param folderId - ID of the folder
 * @param folderName - Name of the folder
 * @returns Folder database ID
 */
const ensureFolderExistsInDatabase = async (
  projectId: string,
  folderId: string,
  folderName: string
): Promise<string | null> => {
  let folderDbId = null;

  // Check if folder exists by ID
  const { data: existingFolder, error: folderCheckError } = await supabase
    .from('project_folders')
    .select('id, name')
    .eq('id', folderId)
    .maybeSingle();

  if (folderCheckError) {
    console.error('[assetService] Error checking folder by ID:', folderCheckError);
  } else if (existingFolder) {
    folderDbId = existingFolder.id;
    console.log(`[assetService] Found folder by ID in database: ${existingFolder.name} (${folderDbId})`);
    return folderDbId;
  }

  // Check if folder exists by name if we couldn't find it by ID
  console.log(`[assetService] Folder doesn't exist in database or wasn't found by ID, checking by name: ${folderName}`);
  const { data: folderByName, error: nameCheckError } = await supabase
    .from('project_folders')
    .select('id, name')
    .eq('project_id', projectId)
    .eq('name', folderName)
    .maybeSingle();

  if (nameCheckError) {
    console.error('[assetService] Error checking folder by name:', nameCheckError);
  } else if (folderByName) {
    folderDbId = folderByName.id;
    console.log(`[assetService] Found folder by name in database: ${folderByName.name} (${folderDbId})`);
    return folderDbId;
  }

  // Create new folder if it doesn't exist
  console.log(`[assetService] Folder not found by name either, creating it: ${folderName}`);
  const { data: newFolder, error: createFolderError } = await supabase
    .from('project_folders')
    .insert({
      project_id: projectId,
      name: folderName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (createFolderError) {
    console.error('[assetService] Error creating folder:', createFolderError);
  } else {
    console.log(`[assetService] Created new folder in database with id ${newFolder.id}`);
    folderDbId = newFolder.id;
  }

  return folderDbId;
};
