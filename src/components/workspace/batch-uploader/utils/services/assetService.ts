
import { toast } from 'sonner';
import { ProjectAsset } from '../types/projectTypes';
import { UploadFile } from '../../types';
import { projects, updateProjects, logProjects } from '../data/projectStore';

// Add files to a project
export const addFilesToProject = async (
  projectId: string, 
  files: UploadFile[],
  folderId: string = 'root',
  licenseType: string = 'standard'
): Promise<void> => {
  console.log(`Adding files to project: ${projectId}, folder: ${folderId}`);
  
  // Find the project
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return Promise.reject(new Error(`Project not found: ${projectId}`));
  }
  
  // Filter for completed files only
  const completedFiles = files.filter(file => file.status === 'complete');
  
  if (completedFiles.length === 0) {
    console.log('No completed files to add to project');
    return Promise.resolve();
  }
  
  // Convert uploaded files to project assets
  const assets: ProjectAsset[] = completedFiles.map(file => ({
    id: file.id,
    name: file.name,
    type: file.type,
    size: file.size,
    preview: file.preview,
    uploadedAt: new Date(),
    licenseType,
    folderId: folderId === 'root' ? undefined : folderId
  }));
  
  const updatedProjects = [...projects];
  
  // If adding to root folder
  if (folderId === 'root') {
    // Update the project with new assets
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      assets: [...updatedProjects[projectIndex].assets, ...assets],
      updatedAt: new Date()
    };
  } else {
    // Function to recursively find and update a folder
    const updateFolderAssetsRecursive = (folders: typeof updatedProjects[number]['subfolders']): boolean => {
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].id === folderId) {
          folders[i].assets = [...folders[i].assets, ...assets];
          folders[i].updatedAt = new Date();
          return true;
        }
        
        if (folders[i].subfolders.length > 0) {
          if (updateFolderAssetsRecursive(folders[i].subfolders)) {
            return true;
          }
        }
      }
      return false;
    };
    
    // Try to add assets to the specified folder
    if (!updateFolderAssetsRecursive(updatedProjects[projectIndex].subfolders)) {
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
