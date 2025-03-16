
import { useState } from 'react';
import { getProjectById } from '../../utils/projectUtils';

/**
 * Hook for managing project selection state
 */
export const useProjectSelection = () => {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  
  // Function to update project selection with appropriate name
  const selectProject = (projectId: string) => {
    setSelectedProject(projectId);
    
    // Get project name for the success message
    const project = getProjectById(projectId);
    if (project) {
      setSelectedProjectName(project.name);
      console.log(`Project before upload: ${project.name} with ${project.assets?.length || 0} assets`);
    } else {
      console.error(`Project not found: ${projectId}`);
      setSelectedProjectName('');
    }
  };
  
  return {
    selectedProject,
    selectedProjectName,
    selectedFolder,
    setSelectedFolder,
    selectProject
  };
};
