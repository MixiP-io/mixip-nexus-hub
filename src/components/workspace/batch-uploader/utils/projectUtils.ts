
import { toast } from 'sonner';
import { UploadFile } from '../types';

// In-memory project storage (in a real app, this would use a database)
interface ProjectData {
  id: string;
  name: string;
  assets: ProjectAsset[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectAsset {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
  uploadedAt: Date;
  licenseType?: string;
}

// Projects storage
let projects: ProjectData[] = [
  {
    id: 'project1',
    name: 'Marketing Campaign Q1',
    assets: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: 'project2',
    name: 'Product Photoshoot',
    assets: [],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'project3',
    name: 'Website Redesign Assets',
    assets: [],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
];

// Get all projects
export const getProjects = (): ProjectData[] => {
  return [...projects];
};

// Get a project by ID
export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find(project => project.id === id);
};

// Create a new project
export const createProject = (name: string): ProjectData => {
  const newProject: ProjectData = {
    id: `project-${Date.now()}`,
    name,
    assets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  projects = [...projects, newProject];
  return newProject;
};

// Add files to a project
export const addFilesToProject = async (
  projectId: string, 
  files: UploadFile[],
  licenseType: string = 'standard'
): Promise<void> => {
  // Find the project
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return Promise.reject(new Error(`Project not found: ${projectId}`));
  }
  
  // Convert uploaded files to project assets
  const assets: ProjectAsset[] = files
    .filter(file => file.status === 'complete')
    .map(file => ({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: file.preview,
      uploadedAt: new Date(),
      licenseType
    }));
  
  // Update the project with new assets
  const updatedProject = {
    ...projects[projectIndex],
    assets: [...projects[projectIndex].assets, ...assets],
    updatedAt: new Date()
  };
  
  // Update projects array
  projects = [
    ...projects.slice(0, projectIndex),
    updatedProject,
    ...projects.slice(projectIndex + 1)
  ];
  
  // In a real app, this would be an API call to persist data
  console.log(`Added ${assets.length} files to project ${projectId}`);
  
  return Promise.resolve();
};

// For debugging
export const logProjects = () => {
  console.log('Current projects:', JSON.stringify(projects, null, 2));
};
