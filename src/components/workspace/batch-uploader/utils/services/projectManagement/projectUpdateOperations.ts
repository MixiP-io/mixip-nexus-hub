
import { toast } from 'sonner';
import { ProjectData } from '../../types/projectTypes';
import { projects, updateProjects } from '../../data/projectStore';

/**
 * Update a project's properties
 * @param projectId - ID of the project to update
 * @param updates - Object containing the properties to update
 * @returns Boolean indicating success
 */
export const updateProject = (projectId: string, updates: Partial<ProjectData>): boolean => {
  console.log(`Updating project: ${projectId}`, updates);
  
  try {
    // First get the current projects from localStorage
    const localProjectsStr = localStorage.getItem('projects');
    let currentProjects = [...projects]; // Create a copy of the in-memory projects
    
    if (localProjectsStr) {
      try {
        currentProjects = JSON.parse(localProjectsStr);
      } catch (error) {
        console.error('Error parsing projects from localStorage:', error);
      }
    }
    
    const projectIndex = currentProjects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      console.log(`Project not found for update: ${projectId}`);
      toast.error("Project not found");
      return false;
    }
    
    // Create a deep copy with the updates applied
    const updatedProjects = [...currentProjects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    // Update both in-memory and localStorage
    updateProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    console.log(`Project updated: ${projectId}`);
    return true;
  } catch (error) {
    console.error(`Error updating project: ${projectId}`, error);
    toast.error("Failed to update project");
    return false;
  }
};
