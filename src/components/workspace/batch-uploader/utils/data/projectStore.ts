
import { ProjectData } from '../types/projectTypes';

// Sample user data (in a real app, would come from auth system)
export const currentUser = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com'
};

// Default licensing structure to use when needed
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

// Projects storage
export let projects: ProjectData[] = [
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

// Check if there's any data in localStorage
const initializeFromLocalStorage = () => {
  try {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
        projects = parsedProjects;
        console.log('Loaded projects from localStorage:', projects.length);
        
        // Ensure data integrity of loaded projects
        ensureProjectDataIntegrity();
      }
    }
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    // If localStorage is corrupted, use the default projects
    localStorage.removeItem('projects');
    // Re-initialize with default values and save to localStorage
    ensureProjectDataIntegrity();
  }
};

// For debugging
export const logProjects = () => {
  console.log('Current projects:', JSON.stringify(projects, null, 2));
};

// Update the projects data
export const updateProjects = (updatedProjects: ProjectData[]) => {
  projects = updatedProjects;
  
  // Ensure data integrity whenever projects are updated
  ensureProjectDataIntegrity();
};

// Recursive function to ensure folder integrity
const ensureFolderIntegrity = (folder: any) => {
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
    projects = [
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
        licensing: defaultLicensing,
        subfolders: []
      }
    ];
  }
  
  projects = projects.map(project => {
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
  
  // Also save to localStorage
  try {
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log("Projects saved to localStorage successfully");
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
  
  console.log("Data integrity check complete");
};

// Initialize on load
initializeFromLocalStorage();

// Run integrity check on startup
ensureProjectDataIntegrity();
