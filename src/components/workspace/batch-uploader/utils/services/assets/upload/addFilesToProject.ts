
import { toast } from 'sonner';
import { ProjectAsset } from '../../../types/projectTypes';
import { UploadFile } from '../../../../types';
import { projects, updateProjects } from '../../../data/projectStore';
import { saveProjectsToLocalStorage, logProjects } from '../../../data/store/storageSync';
import { convertFilesToAssets } from '../../assetConversionUtils';
import { validateProjectForAssets, ensureProjectStructure } from '../projectAssetsValidation';
import { updateProjectCoverIfNeeded } from '../coverImageOperations';
import { saveProjectAssetsToDatabase } from './saveProjectAssetsToDatabase';
import { processAssetsByFolder } from './folderProcessing';

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

    // Process assets based on folder location
    const { folderFound, locationAdded, folderName } = await processAssetsByFolder(
      updatedProjects,
      projectIndex,
      normalizedFolderId,
      assets
    );

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

    // Save to database
    const { folderDbId } = await saveProjectAssetsToDatabase(
      projectId,
      assets,
      normalizedFolderId,
      folderName
    );

    console.log(`[assetService] Added ${assets.length} files to project ${projectId} at location ${locationAdded}`);
    logProjects(); // Log the updated projects for debugging

    // Show toast notification for successful upload
    const locationDisplayName = locationAdded === 'root' ? 'root folder' : `folder "${locationAdded}"`;
    toast.success(`Added ${assets.length} files to ${locationDisplayName}`);

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
