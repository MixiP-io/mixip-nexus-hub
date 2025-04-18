
import { ProjectAsset } from '../types/projectTypes';
import { UploadFile } from '../../types';

/**
 * Converts uploaded files to project assets
 * @param files - Array of uploaded files
 * @param licenseType - License type to apply to the assets
 * @param folderId - Folder ID where assets will be stored
 * @returns Array of project assets
 */
export const convertFilesToAssets = (
  files: UploadFile[],
  licenseType: string = 'standard',
  folderId: string = 'root'
): ProjectAsset[] => {
  // Filter for completed files only
  const completedFiles = files.filter(file => file.status === 'complete');
  
  if (completedFiles.length === 0) {
    console.error("[assetConversionUtils] No completed files found to convert to assets");
    return [];
  }
  
  console.log(`[assetConversionUtils] Converting ${completedFiles.length} files to assets with license: ${licenseType}, folder: ${folderId}`);
  
  // Normalize the folder ID
  const normalizedFolderId = folderId || 'root';
  console.log(`[assetConversionUtils] Using normalized folder ID: ${normalizedFolderId}`);
  
  // Convert uploaded files to project assets
  const assets = completedFiles.map(file => {
    // Create a unique ID for the asset if not present
    const assetId = file.id || `asset-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Ensure preview is stored as a data URL string
    const preview = typeof file.preview === 'string' ? file.preview : null;
    
    console.log(`[assetConversionUtils] Processing file preview for ${file.name}:`, 
      preview ? `Preview exists (${preview.substring(0, 30)}...)` : 'No preview available');
    
    // Check if preview is a blob URL (which won't persist) and warn
    if (preview && preview.startsWith('blob:')) {
      console.warn('[assetConversionUtils] Detected blob URL preview which will not persist after page refresh:', 
        file.name, preview.substring(0, 30) + '...');
    }
    
    const asset: ProjectAsset = {
      id: assetId,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: preview,
      uploadedAt: new Date(),
      licenseType,
      // Always set folderId, even if it's 'root'
      folderId: normalizedFolderId
    };
    
    console.log(`[assetConversionUtils] Created asset: ${asset.name} (${asset.id}), with folder: ${asset.folderId}`);
    return asset;
  });
  
  console.log(`[assetConversionUtils] Created ${assets.length} assets`);
  return assets;
};
