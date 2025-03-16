
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
    return [];
  }
  
  console.log(`Converting ${completedFiles.length} files to assets with license: ${licenseType}, folder: ${folderId}`);
  
  // Convert uploaded files to project assets
  const assets = completedFiles.map(file => ({
    id: file.id,
    name: file.name,
    type: file.type,
    size: file.size,
    preview: file.preview,
    uploadedAt: new Date(),
    licenseType,
    folderId: folderId === 'root' ? undefined : folderId
  }));
  
  console.log(`Created ${assets.length} assets`);
  return assets;
};
