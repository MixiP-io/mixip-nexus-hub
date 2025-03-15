
import { ProjectData } from '../types/projectTypes';

// Sample user data (in a real app, would come from auth system)
export const currentUser = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com'
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

// For debugging
export const logProjects = () => {
  console.log('Current projects:', JSON.stringify(projects, null, 2));
};

// Update the projects data
export const updateProjects = (updatedProjects: ProjectData[]) => {
  projects = updatedProjects;
};
