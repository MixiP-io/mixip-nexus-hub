
import { toast } from 'sonner';
import { ProjectAsset } from '../types/projectTypes';
import { UploadFile } from '../../types';
import { projects, updateProjects, logProjects } from '../data/projectStore';

// Convert uploaded files to project assets
const convertFilesToAssets = (
  files: UploadFile[],
  licenseType: string = 'standard',
  folderId: string = 'root'
): ProjectAsset[] => {
  // Filter for completed files only
  const completedFiles = files.filter(file => file.status === 'complete');
  
  if (completedFiles.length === 0) {
    return [];
  }
  
  // Convert uploaded files to project assets
  return completedFiles.map(file => ({
    id: file.id,
    name: file.name,
    type: file.type,
    size: file.size,
    preview: file.preview,
    uploadedAt: new Date(),
    licenseType,
    folderId: folderId === 'root' ? undefined : folderId
  }));
};

// Find and validate project
const findProject = (projectId: string): { projectIndex: number, project: any } | null => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return null;
  }
  
  return { projectIndex, project: projects[projectIndex] };
};

// Update a project's cover image if it doesn't have one yet
const updateProjectCoverIfNeeded = (
  projectIndex: number, 
  assets: ProjectAsset[]
): boolean => {
  const updatedProjects = [...projects];
  
  // If this is the first asset being added to the project, set it as the cover image
  const shouldUpdateCoverImage = (
    updatedProjects[projectIndex].assets.length === 0 && 
    !updatedProjects[projectIndex].coverImage &&
    assets.some(asset => asset.preview)
  );
  
  if (shouldUpdateCoverImage) {
    const firstImageAsset = assets.find(asset => asset.preview);
    if (firstImageAsset) {
      updatedProjects[projectIndex].coverImage = firstImageAsset.preview;
      return true;
    }
  }
  
  return false;
};

// Add assets to a specific folder recursively
const addAssetsToFolder = (
  folders: typeof projects[number]['subfolders'],
  targetFolderId: string,
  assets: ProjectAsset[]
): boolean => {
  for (let i = 0; i < folders.length; i++) {
    if (folders[i].id === targetFolderId) {
      folders[i].assets = [...folders[i].assets, ...assets];
      folders[i].updatedAt = new Date();
      return true;
    }
    
    if (folders[i].subfolders.length > 0) {
      if (addAssetsToFolder(folders[i].subfolders, targetFolderId, assets)) {
        return true;
      }
    }
  }
  return false;
};

// Find an asset in a project recursively
const findAssetInProject = (
  project: typeof projects[number], 
  assetId: string
): ProjectAsset | null => {
  // Check project root assets
  const rootAsset = project.assets.find(a => a.id === assetId);
  if (rootAsset) {
    return rootAsset;
  }
  
  // Search in subfolders recursively
  const findInFolders = (folders: typeof project.subfolders): ProjectAsset | null => {
    for (const folder of folders) {
      const folderAsset = folder.assets.find(a => a.id === assetId);
      if (folderAsset) {
        return folderAsset;
      }
      
      if (folder.subfolders.length > 0) {
        const nestedAsset = findInFolders(folder.subfolders);
        if (nestedAsset) {
          return nestedAsset;
        }
      }
    }
    return null;
  };
  
  return findInFolders(project.subfolders);
};

// Add files to a project
export const addFilesToProject = async (
  projectId: string, 
  files: UploadFile[],
  licenseType: string = 'standard',
  folderId: string = 'root'
): Promise<void> => {
  console.log(`Adding files to project: ${projectId}, folder: ${folderId}, license: ${licenseType}`);
  
  // Find the project
  const projectData = findProject(projectId);
  if (!projectData) {
    return Promise.reject(new Error(`Project not found: ${projectId}`));
  }
  
  const { projectIndex } = projectData;
  
  // Convert files to assets
  const assets = convertFilesToAssets(files, licenseType, folderId);
  
  if (assets.length === 0) {
    console.log('No completed files to add to project');
    return Promise.resolve();
  }
  
  const updatedProjects = [...projects];
  
  // Check if we need to update cover image
  updateProjectCoverIfNeeded(projectIndex, assets);
  
  // If adding to root folder
  if (folderId === 'root') {
    // Update the project with new assets
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      assets: [...updatedProjects[projectIndex].assets, ...assets],
      updatedAt: new Date()
    };
  } else {
    // Try to add assets to the specified folder
    if (!addAssetsToFolder(updatedProjects[projectIndex].subfolders, folderId, assets)) {
      // If folder not found, add to project root
      updatedProjects[projectIndex].assets = [...updatedProjects[projectIndex].assets, ...assets];
      toast.warning(`Folder not found, added to project root`);
    }
    
    updatedProjects[projectIndex].updatedAt = new Date();
  }
  
  updateProjects(updatedProjects);
  console.log(`Added ${assets.length} files to project ${projectId}`);
  logProjects(); // Log the updated projects for debugging
  
  return Promise.resolve();
};

// Set project cover image
export const setProjectCoverImage = (projectId: string, assetId: string): boolean => {
  const projectData = findProject(projectId);
  
  if (!projectData) {
    return false;
  }
  
  const { projectIndex, project } = projectData;
  
  // Find the asset in the project
  const targetAsset = findAssetInProject(project, assetId);
  
  if (!targetAsset) {
    toast.error(`Asset not found in project`);
    return false;
  }
  
  // Update the project with the new cover image
  const updatedProjects = [...projects];
  updatedProjects[projectIndex].coverImage = targetAsset.preview;
  updatedProjects[projectIndex].updatedAt = new Date();
  
  updateProjects(updatedProjects);
  toast.success(`Project cover image updated`);
  
  return true;
};
