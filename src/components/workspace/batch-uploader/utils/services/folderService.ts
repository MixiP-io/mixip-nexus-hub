
import { toast } from 'sonner';
import { ProjectFolder } from '../types/projectTypes';
import { projects, updateProjects } from '../data/projectStore';

// Create a subfolder in a project
export const createSubfolder = (
  projectId: string,
  folderName: string,
  parentFolderId?: string
): ProjectFolder | null => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return null;
  }
  
  const newFolder: ProjectFolder = {
    id: `folder-${Date.now()}`,
    name: folderName,
    assets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    subfolders: []
  };
  
  const updatedProjects = [...projects];
  
  // If parentFolderId is provided, add to that subfolder
  if (parentFolderId) {
    // Function to recursively find and update a folder
    const updateFolderRecursive = (folders: ProjectFolder[]): boolean => {
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].id === parentFolderId) {
          folders[i].subfolders.push(newFolder);
          folders[i].updatedAt = new Date();
          return true;
        }
        
        if (folders[i].subfolders.length > 0) {
          if (updateFolderRecursive(folders[i].subfolders)) {
            return true;
          }
        }
      }
      return false;
    };
    
    if (!updateFolderRecursive(updatedProjects[projectIndex].subfolders)) {
      toast.error(`Parent folder not found: ${parentFolderId}`);
      return null;
    }
  } else {
    // Add to project root
    updatedProjects[projectIndex].subfolders.push(newFolder);
  }
  
  updatedProjects[projectIndex].updatedAt = new Date();
  updateProjects(updatedProjects);
  
  return newFolder;
};

// Get all folders for a project, flattened
export const getAllFoldersForProject = (projectId: string): { id: string, name: string, parentId?: string }[] => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return [];
  
  const result: { id: string, name: string, parentId?: string }[] = [
    { id: 'root', name: 'Project Root' }
  ];
  
  // Recursive function to add folders to the result
  const addFoldersRecursive = (folders: ProjectFolder[], parentId?: string) => {
    folders.forEach(folder => {
      result.push({
        id: folder.id,
        name: folder.name,
        parentId
      });
      
      if (folder.subfolders.length > 0) {
        addFoldersRecursive(folder.subfolders, folder.id);
      }
    });
  };
  
  addFoldersRecursive(project.subfolders);
  return result;
};
