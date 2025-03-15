
import { toast } from 'sonner';
import { UploadFile } from '../types';

// In-memory project storage (in a real app, this would use a database)
interface ProjectData {
  id: string;
  name: string;
  description?: string; // Make description optional
  tags?: string[]; // Add tags as optional
  assets: ProjectAsset[];
  createdAt: Date;
  updatedAt: Date;
  // New fields for campaign and ownership metadata
  createdBy: string;
  owners: ProjectOwner[];
  licensing: ProjectLicensing;
  subfolders: ProjectFolder[];
  parentId?: string; // If this is a subfolder, reference to parent
}

interface ProjectOwner {
  userId: string;
  name: string;
  email: string;
  royaltyPercentage: number;
}

interface ProjectLicensing {
  type: string; // 'standard', 'exclusive', 'limited', etc.
  usageRights: {
    primaryCampaign: boolean;
    secondaryBrand: boolean;
    extendedMarketing: boolean;
    derivativeWorks: boolean;
    merchandising: boolean;
    publicity: boolean;
    socialMedia: boolean;
    aiTraining: boolean;
  };
}

interface ProjectFolder {
  id: string;
  name: string;
  assets: ProjectAsset[];
  createdAt: Date;
  updatedAt: Date;
  subfolders: ProjectFolder[]; // Recursive structure for nested folders
}

interface ProjectAsset {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
  uploadedAt: Date;
  licenseType?: string;
  folderId?: string; // Reference to folder if in a subfolder
}

// Sample user data (in a real app, would come from auth system)
const currentUser = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com'
};

// Projects storage
let projects: ProjectData[] = [
  {
    id: 'project1',
    name: 'Marketing Campaign Q1',
    assets: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20'),
    createdBy: 'user1',
    owners: [
      { userId: 'user1', name: 'John Doe', email: 'john@example.com', royaltyPercentage: 100 }
    ],
    licensing: {
      type: 'standard',
      usageRights: {
        primaryCampaign: true,
        secondaryBrand: true,
        extendedMarketing: false,
        derivativeWorks: false,
        merchandising: false,
        publicity: true,
        socialMedia: true,
        aiTraining: false
      }
    },
    subfolders: [
      {
        id: 'folder1',
        name: 'Raw Photos',
        assets: [],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        subfolders: []
      }
    ]
  },
  {
    id: 'project2',
    name: 'Product Photoshoot',
    assets: [],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    createdBy: 'user1',
    owners: [
      { userId: 'user1', name: 'John Doe', email: 'john@example.com', royaltyPercentage: 75 },
      { userId: 'user2', name: 'Jane Smith', email: 'jane@example.com', royaltyPercentage: 25 }
    ],
    licensing: {
      type: 'exclusive',
      usageRights: {
        primaryCampaign: true,
        secondaryBrand: true,
        extendedMarketing: true,
        derivativeWorks: false,
        merchandising: false,
        publicity: true,
        socialMedia: true,
        aiTraining: false
      }
    },
    subfolders: []
  },
  {
    id: 'project3',
    name: 'Website Redesign Assets',
    assets: [],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    createdBy: 'user1',
    owners: [
      { userId: 'user1', name: 'John Doe', email: 'john@example.com', royaltyPercentage: 100 }
    ],
    licensing: {
      type: 'standard',
      usageRights: {
        primaryCampaign: true,
        secondaryBrand: false,
        extendedMarketing: false,
        derivativeWorks: false,
        merchandising: false,
        publicity: false,
        socialMedia: true,
        aiTraining: false
      }
    },
    subfolders: []
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
export const createProject = (
  name: string,
  options?: {
    description?: string,
    tags?: string[],
    owners?: ProjectOwner[],
    licensing?: ProjectLicensing,
    parentId?: string
  }
): ProjectData => {
  // Default owner is current user with 100%
  const defaultOwners = [
    { 
      userId: currentUser.id, 
      name: currentUser.name, 
      email: currentUser.email, 
      royaltyPercentage: 100 
    }
  ];

  // Default licensing is standard with basic rights
  const defaultLicensing = {
    type: 'standard',
    usageRights: {
      primaryCampaign: true,
      secondaryBrand: false,
      extendedMarketing: false,
      derivativeWorks: false,
      merchandising: false,
      publicity: false,
      socialMedia: true,
      aiTraining: false
    }
  };

  const newProject: ProjectData = {
    id: `project-${Date.now()}`,
    name,
    description: options?.description,
    tags: options?.tags,
    assets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: currentUser.id,
    owners: options?.owners || defaultOwners,
    licensing: options?.licensing || defaultLicensing,
    subfolders: [],
    parentId: options?.parentId
  };
  
  projects = [...projects, newProject];
  return newProject;
};

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
    
    if (!updateFolderRecursive(projects[projectIndex].subfolders)) {
      toast.error(`Parent folder not found: ${parentFolderId}`);
      return null;
    }
  } else {
    // Add to project root
    projects[projectIndex].subfolders.push(newFolder);
  }
  
  projects[projectIndex].updatedAt = new Date();
  return newFolder;
};

// Get all folders for a project, flattened
export const getAllFoldersForProject = (projectId: string): { id: string, name: string, parentId?: string }[] => {
  const project = getProjectById(projectId);
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
  
  // If adding to root folder
  if (folderId === 'root') {
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
  } else {
    // Function to recursively find and update a folder
    const updateFolderAssetsRecursive = (folders: ProjectFolder[]): boolean => {
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
    if (!updateFolderAssetsRecursive(projects[projectIndex].subfolders)) {
      // If folder not found, add to project root
      projects[projectIndex].assets = [...projects[projectIndex].assets, ...assets];
      toast.warning(`Folder not found, added to project root`);
    }
    
    projects[projectIndex].updatedAt = new Date();
  }
  
  console.log(`Added ${assets.length} files to project ${projectId}`);
  logProjects(); // Log the updated projects for debugging
  
  return Promise.resolve();
};

// Update ownership percentages
export const updateProjectOwnership = (
  projectId: string, 
  owners: ProjectOwner[]
): boolean => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return false;
  }
  
  // Validate that percentages add up to 100
  const totalPercentage = owners.reduce((sum, owner) => sum + owner.royaltyPercentage, 0);
  if (totalPercentage !== 100) {
    toast.error('Royalty percentages must add up to 100%');
    return false;
  }
  
  // Update the project with new owners
  projects[projectIndex].owners = owners;
  projects[projectIndex].updatedAt = new Date();
  
  return true;
};

// Update licensing and usage rights
export const updateProjectLicensing = (
  projectId: string, 
  licensing: ProjectLicensing
): boolean => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    toast.error(`Project not found: ${projectId}`);
    return false;
  }
  
  // Update the project with new licensing
  projects[projectIndex].licensing = licensing;
  projects[projectIndex].updatedAt = new Date();
  
  return true;
};

// For debugging
export const logProjects = () => {
  console.log('Current projects:', JSON.stringify(projects, null, 2));
};

// Export the interfaces for use in other components
export type { ProjectData, ProjectOwner, ProjectLicensing, ProjectFolder, ProjectAsset };
