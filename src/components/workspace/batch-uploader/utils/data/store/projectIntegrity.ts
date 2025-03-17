
/**
 * Data integrity utilities for project data
 */
import { projects, updateProjects } from './projectState';
import { defaultLicensing, defaultProject } from './defaultValues';
import { saveProjectsToLocalStorage } from './storageSync';

// Ensure asset data is properly structured with valid preview URLs
const ensureAssetIntegrity = (asset: any) => {
  if (!asset) return asset;
  
  // Deep copy to avoid reference issues
  const fixedAsset = { ...asset };
  
  // Ensure preview is a valid string (if it exists)
  if (fixedAsset.preview !== undefined && typeof fixedAsset.preview !== 'string') {
    fixedAsset.preview = null;
  }
  
  // Ensure folderId is set (default to 'root' if missing)
  if (!fixedAsset.folderId) {
    fixedAsset.folderId = 'root';
  }
  
  return fixedAsset;
};

// Recursive function to ensure folder integrity
export const ensureFolderIntegrity = (folder: any) => {
  // If subfolders is undefined, initialize it
  if (!Array.isArray(folder.subfolders)) {
    folder.subfolders = [];
  }
  
  // If assets is undefined, initialize it
  if (!Array.isArray(folder.assets)) {
    folder.assets = [];
  } else {
    // Fix assets in this folder
    folder.assets = folder.assets.map(asset => ensureAssetIntegrity(asset));
    
    // Filter out any null or undefined assets
    folder.assets = folder.assets.filter(asset => asset !== null && asset !== undefined);
  }
  
  // Process subfolders recursively
  folder.subfolders = folder.subfolders.map((subfolder: any) => {
    return ensureFolderIntegrity(subfolder);
  });
  
  return folder;
};

// Ensure all projects have properly initialized arrays and required fields
export const ensureProjectDataIntegrity = () => {
  console.log("Running data integrity check on projects...");
  
  if (!Array.isArray(projects)) {
    console.error("Projects is not an array, resetting to defaults");
    // Reset to default projects
    updateProjects([{...defaultProject}]);
  }
  
  const fixedProjects = projects.map(project => {
    // Fix any assets at the root level
    const fixedAssets = Array.isArray(project.assets) 
      ? project.assets
          .map(asset => ensureAssetIntegrity(asset))
          .filter(asset => asset !== null && asset !== undefined)
      : [];
    
    // Creates a new object with guaranteed arrays and required fields
    const fixedProject = {
      ...project,
      assets: fixedAssets,
      subfolders: Array.isArray(project.subfolders) ? 
        project.subfolders.map(subfolder => ensureFolderIntegrity(subfolder)) : [],
      // Ensure licensing is present and valid
      licensing: project.licensing || {...defaultLicensing}
    };
    
    // Ensure project has an ID
    if (!fixedProject.id) {
      fixedProject.id = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    return fixedProject;
  });
  
  // Update the projects array with fixed projects
  updateProjects(fixedProjects);
  
  // Save to localStorage with improved serialization
  saveProjectsToLocalStorage();
  
  console.log("Data integrity check complete");
};
