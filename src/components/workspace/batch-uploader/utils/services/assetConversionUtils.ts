
import { ProjectAsset } from '../types/projectTypes';
import { UploadFile } from '../../types';

/**
 * Safely serialize preview URLs to avoid circular references and ensure they're stored properly
 * @param preview - The preview URL to serialize
 * @returns A serialized string version of the preview URL
 */
const serializePreview = (preview: unknown): string | undefined => {
  if (!preview) return undefined;
  
  // If already a string, return it
  if (typeof preview === 'string') {
    return preview;
  }
  
  // For blob URLs or other objects, try to convert to string
  try {
    if (preview instanceof Blob || preview instanceof URL) {
      return preview.toString();
    }
    
    // Last resort: try JSON stringify (but this might not work for complex objects)
    return String(preview);
  } catch (error) {
    console.error("Failed to serialize preview:", error);
    return undefined;
  }
};

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
    // Process the preview to ensure it's properly serialized
    const serializedPreview = serializePreview(file.preview);
    
    if (serializedPreview) {
      console.log(`[assetConversionUtils] Successfully serialized preview for ${file.name}: ${serializedPreview.substring(0, 30)}...`);
    } else {
      console.warn(`[assetConversionUtils] No preview available for ${file.name}`);
    }
    
    const asset: ProjectAsset = {
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: serializedPreview,
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
