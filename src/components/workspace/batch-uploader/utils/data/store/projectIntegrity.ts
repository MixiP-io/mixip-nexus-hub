
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

  // Ensure other required fields
  if (!fixedAsset.id) {
    fixedAsset.id = `asset-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  // Ensure asset has a name if missing
  if (!fixedAsset.name) {
    fixedAsset.name = fixedAsset.file?.name || `Asset ${fixedAsset.id.substring(0, 8)}`;
  }
  
  return fixedAsset;
};

// Recursive function to ensure folder integrity
export const ensureFolderIntegrity = (folder: any) => {
  if (!folder) return folder;

  // Deep copy to avoid reference issues
  const fixedFolder = { ...folder };
  
  // If subfolders is undefined, initialize it
  if (!Array.isArray(fixedFolder.subfolders)) {
    fixedFolder.subfolders = [];
  }
  
  // If assets is undefined, initialize it
  if (!Array.isArray(fixedFolder.assets)) {
    fixedFolder.assets = [];
  } else {
    // Fix assets in this folder
    fixedFolder.assets = fixedFolder.assets.map(asset => ensureAssetIntegrity(asset));
    
    // Filter out any null or undefined assets
    fixedFolder.assets = fixedFolder.assets.filter(asset => asset !== null && asset !== undefined);
    
    // CRITICAL: Ensure all assets in this folder have the correct folderId
    fixedFolder.assets = fixedFolder.assets.map(asset => ({
      ...asset,
      folderId: fixedFolder.id
    }));
  }
  
  // Process subfolders recursively
  if (fixedFolder.subfolders && fixedFolder.subfolders.length > 0) {
    fixedFolder.subfolders = fixedFolder.subfolders.map((subfolder: any) => {
      return ensureFolderIntegrity(subfolder);
    });
  }
  
  return fixedFolder;
};

// Ensure all projects have properly initialized arrays and required fields
export const ensureProjectDataIntegrity = () => {
  console.log("Running data integrity check on projects...");
  
  if (!Array.isArray(projects)) {
    console.error("Projects is not an array, resetting to defaults");
    // Reset to default projects
    updateProjects([{...defaultProject}]);
    return;
  }
  
  const fixedProjects = projects.map(project => {
    if (!project) {
      console.error("Found null or undefined project, creating new default project");
      return {...defaultProject, id: `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`};
    }
    
    // Fix any assets at the root level
    const fixedAssets = Array.isArray(project.assets) 
      ? project.assets
          .map(asset => ensureAssetIntegrity(asset))
          .filter(asset => asset !== null && asset !== undefined)
      : [];
    
    // Ensure all assets at root have the correct reference to "root" folder
    const assetsWithCorrectFolderIds = fixedAssets.map(asset => ({
      ...asset,
      folderId: asset.folderId || 'root'
    }));
    
    // Creates a new object with guaranteed arrays and required fields
    const fixedProject = {
      ...project,
      assets: assetsWithCorrectFolderIds,
      subfolders: Array.isArray(project.subfolders) ? 
        project.subfolders.map(subfolder => ensureFolderIntegrity(subfolder)) : [],
      // Ensure licensing is present and valid
      licensing: project.licensing || {...defaultLicensing}
    };
    
    // Ensure project has an ID
    if (!fixedProject.id) {
      fixedProject.id = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    // Ensure project has a name
    if (!fixedProject.name) {
      fixedProject.name = `Project ${fixedProject.id.substring(0, 8)}`;
    }

    // ADDED: Run an explicit check and fix on all assets in all folders
    if (fixedProject.subfolders && fixedProject.subfolders.length > 0) {
      console.log(`Checking assets in all subfolders for project ${fixedProject.name}`);
      let folderAssetCount = 0;
      
      fixedProject.subfolders = fixedProject.subfolders.map(folder => {
        // Ensure folder has an ID
        if (!folder.id) {
          folder.id = `folder-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        }
        
        // Ensure assets array exists
        if (!Array.isArray(folder.assets)) {
          folder.assets = [];
        } else {
          // Fix all assets in this folder
          folder.assets = folder.assets
            .filter(asset => asset !== null && asset !== undefined)
            .map(asset => ({
              ...ensureAssetIntegrity(asset),
              folderId: folder.id // Explicitly set the folder ID
            }));
          folderAssetCount += folder.assets.length;
        }
        return folder;
      });
      
      console.log(`Fixed ${folderAssetCount} assets in subfolders for project ${fixedProject.name}`);
    }
    
    // Log asset counts for debugging
    const rootAssetsCount = fixedProject.assets?.length || 0;
    const folderAssetsCount = fixedProject.subfolders?.reduce((sum: number, folder: any) => 
      sum + (folder.assets?.length || 0), 0) || 0;
    
    console.log(`Project ${fixedProject.name}: ${rootAssetsCount} root assets, ${folderAssetsCount} folder assets`);
    
    return fixedProject;
  });
  
  // Update the projects array with fixed projects
  updateProjects(fixedProjects);
  
  // Save to localStorage with improved serialization
  saveProjectsToLocalStorage();
  
  console.log("Data integrity check complete");
};
