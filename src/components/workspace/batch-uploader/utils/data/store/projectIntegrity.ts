
/**
 * Data integrity utilities for project data
 */
import { projects, updateProjects } from './projectState';
import { defaultLicensing, defaultProject } from './defaultValues';

// Recursive function to ensure folder integrity
export const ensureFolderIntegrity = (folder: any) => {
  // If subfolders is undefined, initialize it
  if (!Array.isArray(folder.subfolders)) {
    folder.subfolders = [];
  }
  
  // If assets is undefined, initialize it
  if (!Array.isArray(folder.assets)) {
    folder.assets = [];
  }
  
  // Process subfolders recursively
  folder.subfolders = folder.subfolders.map((subfolder: any) => {
    return ensureFolderIntegrity(subfolder);
  });
  
  return folder;
};

// Ensure all projects have properly initialized arrays and required fields
export const ensureProjectDataIntegrity = () => {
  console.log("Running data integrity check on projects...");
  
  if (!Array.isArray(projects)) {
    console.error("Projects is not an array, resetting to defaults");
    // Reset to default projects
    updateProjects([{...defaultProject}]);
  }
  
  const fixedProjects = projects.map(project => {
    // Creates a new object with guaranteed arrays and required fields
    const fixedProject = {
      ...project,
      assets: Array.isArray(project.assets) ? project.assets : [],
      subfolders: Array.isArray(project.subfolders) ? 
        project.subfolders.map(subfolder => ensureFolderIntegrity(subfolder)) : [],
      // Ensure licensing is present and valid
      licensing: project.licensing || {...defaultLicensing}
    };
    
    // Ensure project has an ID
    if (!fixedProject.id) {
      fixedProject.id = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    return fixedProject;
  });
  
  // Update the projects array with fixed projects
  updateProjects(fixedProjects);
  
  // Also save to localStorage
  try {
    localStorage.setItem('projects', JSON.stringify(fixedProjects));
    console.log("Projects saved to localStorage successfully");
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
  
  console.log("Data integrity check complete");
};
