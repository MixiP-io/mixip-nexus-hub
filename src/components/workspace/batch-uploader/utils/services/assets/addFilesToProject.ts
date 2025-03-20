
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ProjectAsset } from '../../types/projectTypes';
import { UploadFile } from '../../../types';
import { projects, updateProjects } from '../../data/projectStore';
import { logProjects } from '../../data/store/storageSync';
import { convertFilesToAssets } from '../assetConversionUtils';
import { validateProjectForAssets, ensureProjectStructure } from './projectAssetsValidation';
import { 
  addAssetsToRootFolder, 
  addAssetsToSpecificFolder, 
  createNewFolderWithAssets 
} from './folderAssetOperations';
import { updateProjectCoverIfNeeded } from './coverImageOperations';
import { saveProjectsToLocalStorage } from '../../utils/data/store/storageSync';

/**
 * Add files to a project
 * @param projectId - ID of the project to add files to
 * @param files - Files to add to the project
 * @param licenseType - License type to apply to the assets
 * @param folderId - ID of the folder to add files to
 * @returns Promise that resolves with result info when files are added
 */
export const addFilesToProject = async (
  projectId: string, 
  files: UploadFile[],
  licenseType: string = 'standard',
  folderId: string = 'root'
): Promise<{ success: boolean, count: number, location: string }> => {
  console.log(`[assetService] Adding files to project: ${projectId}, folder: ${folderId || 'root'}`);
  console.log(`[assetService] Files count: ${files.length}, License: ${licenseType}`);
  
  // Validate project
  const validation = validateProjectForAssets(projectId);
  if (!validation.isValid) {
    return Promise.reject(new Error(`Project not found: ${projectId}`));
  }
  
  const { projectIndex, project } = validation;
  
  // Normalize folder ID (use 'root' if undefined, null or empty string)
  const normalizedFolderId = folderId || 'root';
  console.log(`[assetService] Using normalized folder ID: ${normalizedFolderId}`);
  
  // Convert files to assets
  const assets = convertFilesToAssets(files, licenseType, normalizedFolderId);
  console.log(`[assetService] Converted ${files.length} files to ${assets.length} assets`);
  
  if (assets.length === 0) {
    console.log('[assetService] No completed files to add to project');
    toast.warning('No files were processed successfully');
    return { success: false, count: 0, location: 'none' };
  }
  
  try {
    // Create a deep copy of projects to avoid reference issues
    const updatedProjects = JSON.parse(JSON.stringify(projects));
    
    // Ensure project structure is valid
    ensureProjectStructure(updatedProjects, projectIndex);
    
    // Check if we need to update cover image
    updateProjectCoverIfNeeded(projectIndex, assets, updatedProjects);
    
    let locationAdded = 'root';
    let folderFound = false;
    let folderDbId = null;
    let folderName = 'root';
    
    // Add assets to local storage for backward compatibility
    if (normalizedFolderId === 'root') {
      // Add to root folder
      addAssetsToRootFolder(updatedProjects, projectIndex, assets);
      folderFound = true;
      locationAdded = 'root';
      folderName = 'root';
      console.log(`[assetService] Added ${assets.length} assets to root folder in localStorage`);
    } else {
      // First check if folder exists in database
      try {
        const { data: existingFolder, error: folderCheckError } = await supabase
          .from('project_folders')
          .select('id, name')
          .eq('id', normalizedFolderId)
          .maybeSingle();
          
        if (folderCheckError) {
          console.error('[assetService] Error checking folder by ID:', folderCheckError);
        } else if (existingFolder) {
          folderDbId = existingFolder.id;
          folderName = existingFolder.name;
          console.log(`[assetService] Found existing folder in database by ID: ${folderName} (${folderDbId})`);
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
    }
    
    // Update the project timestamp
    updatedProjects[projectIndex].updatedAt = new Date();
    
    // Update the global projects store with the new projects array
    updateProjects(updatedProjects);
    
    // Save to localStorage using our improved serialization - but catch and handle quota errors
    try {
      saveProjectsToLocalStorage();
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded! Consider reducing the data size or implementing a different storage solution.');
      } else {
        console.error('Error saving to localStorage:', e);
      }
      // Don't fail the whole operation because of localStorage limits
    }
    
    // Now let's save to Supabase
    console.log('[assetService] Saving assets to Supabase database');
    
    // If this is a folder other than root, ensure it exists in the database
    if (normalizedFolderId !== 'root') {
      console.log(`[assetService] Checking if folder ${normalizedFolderId} exists in database`);
      
      if (!folderDbId) {
        console.log(`[assetService] Folder doesn't exist in database or wasn't found by ID, checking by name: ${folderName}`);
        
        // Check if folder exists by name if we couldn't find it by ID
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
        } else {
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
        }
      }
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
    
    console.log(`[assetService] Added ${assets.length} files to project ${projectId} at location ${locationAdded}`);
    logProjects(); // Log the updated projects for debugging
    
    // Show toast notification for successful upload
    const locationName = locationAdded === 'root' ? 'root folder' : `folder "${locationAdded}"`;
    toast.success(`Added ${assets.length} files to ${locationName}`);
    
    return { 
      success: true, 
      count: assets.length, 
      location: folderName
    };
  } catch (error) {
    console.error('[assetService] Error updating projects:', error);
    toast.error('Failed to update project with new files');
    return Promise.reject(error);
  }
};
