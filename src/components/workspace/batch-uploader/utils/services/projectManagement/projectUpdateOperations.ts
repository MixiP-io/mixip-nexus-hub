
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
  console.log(`Starting project update for: ${projectId}`, updates);
  
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
      return false;
    }
    
    // Create a deep copy with the updates applied
    const updatedProjects = [...currentProjects];
    
    // Make sure we preserve all existing properties
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    console.log('Updated project object:', updatedProjects[projectIndex]);
    
    // Update both in-memory and localStorage without blocking UI
    setTimeout(() => {
      try {
        updateProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        console.log(`Project update completed successfully: ${projectId}`);
      } catch (err) {
        console.error('Error in delayed project update:', err);
      }
    }, 0);
    
    return true;
  } catch (error) {
    console.error(`Error updating project: ${projectId}`, error);
    return false;
  }
};
