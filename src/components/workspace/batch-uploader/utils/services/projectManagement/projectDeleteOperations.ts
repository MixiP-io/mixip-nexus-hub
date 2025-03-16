
import { toast } from 'sonner';
import { projects, updateProjects } from '../../data/projectStore';
import { saveProjectsToLocalStorage } from '../../data/store/storageSync';

/**
 * Delete a project
 * @param projectId - ID of the project to delete
 * @returns Boolean indicating success
 */
export const deleteProject = (projectId: string): boolean => {
  console.log(`Deleting project: ${projectId}`);
  
  if (!projectId) {
    console.error("Invalid project ID for deletion");
    return false;
  }
  
  try {
    // First get the current projects from localStorage
    const localProjectsStr = localStorage.getItem('projects');
    let currentProjects = projects;
    
    if (localProjectsStr) {
      try {
        currentProjects = JSON.parse(localProjectsStr);
      } catch (error) {
        console.error('Error parsing projects from localStorage:', error);
      }
    }
    
    const projectIndex = currentProjects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      console.log(`Project not found: ${projectId}`);
      return false;
    }
    
    // Create a deep copy without the deleted project
    const updatedProjects = currentProjects.filter(p => p.id !== projectId);
    
    // Update both in-memory and localStorage
    updateProjects(updatedProjects);
    
    // Use the utility function to ensure consistent localStorage writing
    saveProjectsToLocalStorage();
    
    console.log(`Project deleted: ${projectId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting project: ${projectId}`, error);
    return false;
  }
};
