
/**
 * Data integrity utilities for project data
 */
import { projects, updateProjects } from './projectState';
import { defaultLicensing } from './defaultValues';
import { saveProjectsToLocalStorage } from './storageSync';

// Ensure asset data is properly structured with valid preview URLs
const ensureAssetIntegrity = (asset: any) => {
  if (!asset) return asset;
  
  // Deep copy to avoid reference issues
  const fixedAsset = { ...asset };
  
  // Ensure preview is a valid string (if it exists)
  if (fixedAsset.preview !== undefined && typeof fixedAsset.preview !== 'string') {
    console.log(`[projectIntegrity] Converting invalid preview for asset ${fixedAsset.id} to null`);
    fixedAsset.preview = null;
  }
  
  // Ensure all required fields exist
  if (!fixedAsset.id) fixedAsset.id = `asset-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  if (!fixedAsset.uploadedAt) fixedAsset.uploadedAt = new Date();
  
  return fixedAsset;
};

// Ensure folder data is properly structured
const ensureFolderIntegrity = (folder: any) => {
  if (!folder) return folder;
  
  // Deep copy to avoid reference issues
  const fixedFolder = { ...folder };
  
  // Ensure required fields
  if (!fixedFolder.id) {
    console.log('[projectIntegrity] Folder missing ID, generating one');
    fixedFolder.id = `folder-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
  
  if (!fixedFolder.name) {
    console.log(`[projectIntegrity] Folder ${fixedFolder.id} missing name, setting default`);
    fixedFolder.name = `Folder ${fixedFolder.id}`;
  }
  
  if (!fixedFolder.createdAt) fixedFolder.createdAt = new Date();
  if (!fixedFolder.updatedAt) fixedFolder.updatedAt = new Date();
  
  // Ensure assets array exists
  if (!Array.isArray(fixedFolder.assets)) {
    console.log(`[projectIntegrity] Initializing assets array for folder ${fixedFolder.id}`);
    fixedFolder.assets = [];
  } else {
    // Fix each asset in the folder
    fixedFolder.assets = fixedFolder.assets.map(ensureAssetIntegrity).filter(Boolean);
    
    console.log(`[projectIntegrity] Folder ${fixedFolder.id} has ${fixedFolder.assets.length} valid assets`);
  }
  
  // Recursively fix subfolders
  if (!Array.isArray(fixedFolder.subfolders)) {
    fixedFolder.subfolders = [];
  } else {
    fixedFolder.subfolders = fixedFolder.subfolders.map(ensureFolderIntegrity).filter(Boolean);
  }
  
  return fixedFolder;
};

// Ensure project data is properly structured
export const ensureProjectDataIntegrity = () => {
  console.log('[projectIntegrity] Running project data integrity check');
  
  if (!Array.isArray(projects)) {
    console.error('[projectIntegrity] Projects is not an array!');
    return;
  }
  
  const fixedProjects = projects.map(project => {
    if (!project) return null;
    
    // Deep copy to avoid reference issues
    const fixedProject = { ...project };
    
    // Ensure required fields
    if (!fixedProject.createdAt) fixedProject.createdAt = new Date();
    if (!fixedProject.updatedAt) fixedProject.updatedAt = new Date();
    
    // Ensure licensing data
    if (!fixedProject.licensing) {
      console.log(`[projectIntegrity] Project ${fixedProject.id} missing licensing, adding default`);
      fixedProject.licensing = { ...defaultLicensing };
    }
    
    // Ensure owners array
    if (!Array.isArray(fixedProject.owners)) {
      console.log(`[projectIntegrity] Project ${fixedProject.id} missing owners, initializing`);
      fixedProject.owners = [];
    }
    
    // Ensure assets array exists
    if (!Array.isArray(fixedProject.assets)) {
      console.log(`[projectIntegrity] Initializing assets array for project ${fixedProject.id}`);
      fixedProject.assets = [];
    } else {
      // Fix each asset in the project
      fixedProject.assets = fixedProject.assets
        .map(ensureAssetIntegrity)
        .filter(Boolean);
      
      console.log(`[projectIntegrity] Project ${fixedProject.id} has ${fixedProject.assets.length} valid assets`);
    }
    
    // Ensure subfolders array exists and fix each subfolder
    if (!Array.isArray(fixedProject.subfolders)) {
      console.log(`[projectIntegrity] Initializing subfolders array for project ${fixedProject.id}`);
      fixedProject.subfolders = [];
    } else {
      fixedProject.subfolders = fixedProject.subfolders
        .map(ensureFolderIntegrity)
        .filter(Boolean);
      
      console.log(`[projectIntegrity] Project ${fixedProject.id} has ${fixedProject.subfolders.length} valid subfolders`);
    }
    
    return fixedProject;
  }).filter(Boolean);
  
  // Update projects with fixed data
  if (JSON.stringify(projects) !== JSON.stringify(fixedProjects)) {
    console.log('[projectIntegrity] Updating projects with fixed data');
    updateProjects(fixedProjects);
    
    // Save to localStorage
    saveProjectsToLocalStorage();
  } else {
    console.log('[projectIntegrity] No integrity issues found');
  }
};

// Ensure specific folder structure is valid
export const validateFolderStructure = (projectId: string, folderId: string) => {
  console.log(`[projectIntegrity] Ensuring folder integrity for ${folderId} in project ${projectId}`);
  
  const projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return false;
  
  const project = projects[projectIndex];
  
  // Check root folder first
  if (folderId === 'root') {
    if (!Array.isArray(project.assets)) {
      console.log(`[projectIntegrity] Initializing root assets array for project ${projectId}`);
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].assets = [];
      updateProjects(updatedProjects);
      saveProjectsToLocalStorage();
    }
    return true;
  }
  
  // Check subfolders
  if (!Array.isArray(project.subfolders)) {
    console.log(`[projectIntegrity] Project ${projectId} has no subfolders array`);
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].subfolders = [];
    updateProjects(updatedProjects);
    saveProjectsToLocalStorage();
    return false;
  }
  
  // Find the folder recursively
  const findFolder = (folders: any[]): boolean => {
    for (const folder of folders) {
      if (folder.id === folderId) {
        if (!Array.isArray(folder.assets)) {
          console.log(`[projectIntegrity] Initializing assets array for folder ${folderId}`);
          folder.assets = [];
          const updatedProjects = [...projects];
          updateProjects(updatedProjects);
          saveProjectsToLocalStorage();
        }
        return true;
      }
      
      if (Array.isArray(folder.subfolders) && folder.subfolders.length > 0) {
        if (findFolder(folder.subfolders)) {
          return true;
        }
      }
    }
    return false;
  };
  
  const folderFound = findFolder(project.subfolders);
  if (!folderFound) {
    console.log(`[projectIntegrity] Folder ${folderId} not found in project ${projectId}`);
  }
  
  return folderFound;
};

// Re-export the original ensureFolderIntegrity for internal use
export { ensureFolderIntegrity };
