
/**
 * Asset Service
 * Re-exports asset-related functions from specialized modules
 */

// Re-export core functions from the upload folder
export { addFilesToProject } from './upload/addFilesToProject';
export { saveProjectAssetsToDatabase } from './upload/saveProjectAssetsToDatabase';

// Re-export other functions 
export { setProjectCoverImage } from './coverImageService';
