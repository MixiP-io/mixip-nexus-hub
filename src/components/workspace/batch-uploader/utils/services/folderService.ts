
import { toast } from 'sonner';
import { ProjectFolder } from '../types/projectTypes';
import { projects, updateProjects } from '../data/projectStore';

// Create a subfolder in a project
export const createSubfolder = (
  projectId: string,
  folderName: string,
  parentFolderId?: string
): ProjectFolder | null => {
  console.log(`Creating subfolder "${folderName}" in project ${projectId}${parentFolderId ? ` under parent ${parentFolderId}` : ''}`);
  
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
  if (parentFolderId && parentFolderId !== 'root') {
    console.log(`Adding folder to parent: ${parentFolderId}`);
    
    // Make sure subfolders array exists
    if (!updatedProjects[projectIndex].subfolders) {
      updatedProjects[projectIndex].subfolders = [];
    }
    
    // Function to recursively find and update a folder
    const updateFolderRecursive = (folders: ProjectFolder[]): boolean => {
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].id === parentFolderId) {
          console.log(`Found parent folder: ${folders[i].name}`);
          
          // Initialize subfolders array if it doesn't exist
          if (!folders[i].subfolders) {
            folders[i].subfolders = [];
          }
          
          folders[i].subfolders.push(newFolder);
          folders[i].updatedAt = new Date();
          return true;
        }
        
        if (folders[i].subfolders && folders[i].subfolders.length > 0) {
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
    console.log(`Adding folder to project root`);
    
    // Initialize subfolders array if it doesn't exist
    if (!updatedProjects[projectIndex].subfolders) {
      updatedProjects[projectIndex].subfolders = [];
    }
    
    updatedProjects[projectIndex].subfolders.push(newFolder);
  }
  
  updatedProjects[projectIndex].updatedAt = new Date();
  updateProjects(updatedProjects);
  
  console.log(`Subfolder created: ${newFolder.id}`);
  return newFolder;
};

// Get all folders for a project, flattened
export const getAllFoldersForProject = (projectId: string): { id: string, name: string, parentId?: string }[] => {
  console.log(`Getting all folders for project: ${projectId}`);
  
  const project = projects.find(p => p.id === projectId);
  if (!project) {
    console.log(`Project not found: ${projectId}`);
    return [];
  }
  
  // Start with root folder
  const result: { id: string, name: string, parentId?: string }[] = [
    { id: 'root', name: 'Project Root' }
  ];
  
  // Check if project has subfolders
  if (!project.subfolders || !Array.isArray(project.subfolders)) {
    console.log(`Project has no subfolders or subfolders is not an array`);
    return result;
  }
  
  console.log(`Project has ${project.subfolders.length} subfolders at root level`);
  
  // Recursive function to add folders to the result
  const addFoldersRecursive = (folders: ProjectFolder[], parentId?: string) => {
    folders.forEach(folder => {
      console.log(`Adding folder to result: ${folder.name} (${folder.id})${parentId ? ` with parent ${parentId}` : ''}`);
      
      result.push({
        id: folder.id,
        name: folder.name,
        parentId
      });
      
      if (folder.subfolders && Array.isArray(folder.subfolders) && folder.subfolders.length > 0) {
        console.log(`Folder ${folder.name} has ${folder.subfolders.length} subfolders`);
        addFoldersRecursive(folder.subfolders, folder.id);
      }
    });
  };
  
  addFoldersRecursive(project.subfolders);
  console.log(`Total folders found: ${result.length}`);
  return result;
};
