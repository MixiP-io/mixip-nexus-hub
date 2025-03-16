
import { ProjectAsset } from '../types/projectTypes';
import { UploadFile } from '../../types';

/**
 * Safely serialize preview URLs to avoid circular references and ensure they're stored properly
 * @param preview - The preview URL to serialize
 * @returns A serialized string version of the preview URL
 */
const serializePreview = (preview: unknown): string | undefined => {
  if (!preview) {
    console.log('No preview to serialize');
    return undefined;
  }
  
  // If already a string URL, return it as is
  if (typeof preview === 'string') {
    if (preview.startsWith('http') || preview.startsWith('https')) {
      console.log(`Preview already serialized as URL: ${preview.substring(0, 30)}...`);
      return preview;
    }
    
    if (preview.startsWith('data:') || preview.startsWith('blob:')) {
      console.log(`Preview already serialized as data/blob: ${preview.substring(0, 30)}...`);
      return preview;
    }
  }
  
  try {
    // For blob URLs or other objects, try to convert to string
    if (preview instanceof Blob) {
      const url = URL.createObjectURL(preview);
      console.log(`Serialized Blob to URL: ${url}`);
      return url;
    }
    
    if (preview instanceof URL) {
      const url = preview.toString();
      console.log(`Serialized URL object to string: ${url}`);
      return url;
    }
    
    // If it's a Promise (shouldn't happen at this point, but just in case)
    if (preview instanceof Promise) {
      console.error('Cannot serialize Promise directly - this should have been awaited earlier');
      return undefined;
    }
    
    // Last resort: try JSON stringify (but this might not work for complex objects)
    const serialized = String(preview);
    console.log(`Serialized using String(): ${serialized.substring(0, 30)}...`);
    return serialized;
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
    // The preview should already be a Supabase URL at this point
    const preview = file.preview;
    
    if (preview) {
      console.log(`[assetConversionUtils] Using Supabase URL for ${file.name}: ${preview.substring(0, 50)}...`);
    } else {
      console.warn(`[assetConversionUtils] No preview available for ${file.name}`);
    }
    
    const asset: ProjectAsset = {
      id: file.id,
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
