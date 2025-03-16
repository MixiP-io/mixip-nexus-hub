
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
  if (fixedAsset.preview !== undefined) {
    if (typeof fixedAsset.preview !== 'string') {
      console.warn(`Asset ${fixedAsset.id} (${fixedAsset.name}) has invalid preview type: ${typeof fixedAsset.preview}`);
      try {
        // Try to convert non-string previews to strings
        if (fixedAsset.preview) {
          fixedAsset.preview = String(fixedAsset.preview);
        } else {
          fixedAsset.preview = undefined;
        }
      } catch (e) {
        console.error(`Failed to convert preview for asset ${fixedAsset.id}:`, e);
        fixedAsset.preview = undefined;
      }
    } else if (fixedAsset.preview.length > 10000) {
      // Check if the preview string is unreasonably long, which might indicate a data issue
      console.warn(`Asset ${fixedAsset.id} has very long preview string (${fixedAsset.preview.length} chars)`);
    }
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
    
    // Log some debug info about assets and their previews
    if (folder.assets.length > 0) {
      console.log(`Folder "${folder.name || 'unknown'}" has ${folder.assets.length} assets`);
      
      // Debug first 2 assets' previews
      folder.assets.slice(0, 2).forEach((asset: any, idx: number) => {
        const previewInfo = asset.preview 
          ? `Preview exists (${typeof asset.preview}, ${asset.preview.substring(0, 30)}...)`
          : 'No preview';
        console.log(`Asset ${idx+1}: ${asset.name} - ${previewInfo}`);
      });
    }
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
      ? project.assets.map(asset => ensureAssetIntegrity(asset))
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
