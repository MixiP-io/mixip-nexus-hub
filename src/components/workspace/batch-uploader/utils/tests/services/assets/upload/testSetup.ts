
import { vi } from 'vitest';
import { UploadFile } from '../../../../../types';

// Setup mock projects
export const setupMockProjects = () => {
  return [
    {
      id: 'project1',
      name: 'Test Project 1',
      assets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'testuser',
      owners: [],
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
      subfolders: [
        {
          id: 'folder1',
          name: 'Test Folder 1',
          assets: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          subfolders: []
        }
      ]
    }
  ];
};

// Setup mock files
export const setupMockFiles = (): UploadFile[] => {
  return [
    {
      id: 'file1',
      name: 'test-image.jpg',
      type: 'image/jpeg',
      size: 1024,
      progress: 100,
      status: 'complete',
      source: 'computer',
      file: new File([], 'test-image.jpg', { type: 'image/jpeg' }),
      preview: 'data:image/jpeg;base64,test'
    },
    {
      id: 'file2',
      name: 'test-document.pdf',
      type: 'application/pdf',
      size: 2048,
      progress: 100,
      status: 'complete',
      source: 'computer',
      file: new File([], 'test-document.pdf', { type: 'image/pdf' }),
      preview: undefined
    },
    {
      id: 'file3',
      name: 'incomplete-file.png',
      type: 'image/png',
      size: 512,
      progress: 50,
      status: 'uploading',
      source: 'computer',
      file: new File([], 'incomplete-file.png', { type: 'image/png' }),
      preview: undefined
    }
  ];
};

// Setup common mocks
export const setupCommonMocks = () => {
  // Mock the toast module
  vi.mock('sonner', () => ({
    toast: {
      error: vi.fn(),
      warning: vi.fn(),
      success: vi.fn(),
    }
  }));

  // Mock the projectStore module
  vi.mock('../../../../../data/projectStore', () => ({
    projects: [],
    updateProjects: vi.fn(),
    logProjects: vi.fn(),
    ensureProjectDataIntegrity: vi.fn()
  }));

  // Mock folder processing
  vi.mock('../../../../../services/assets/upload/folderProcessing', () => ({
    processAssetsByFolder: vi.fn(async () => ({
      folderFound: true, 
      locationAdded: 'test-folder', 
      folderName: 'test-folder'
    }))
  }));

  // Mock the validation and helper modules
  vi.mock('../../../../../services/assets/projectAssetsValidation', () => ({
    validateProjectForAssets: vi.fn((projectId) => {
      if (projectId === 'project1') {
        return {
          isValid: true,
          projectIndex: 0,
          project: { id: 'project1', name: 'Test Project 1' }
        };
      }
      return { isValid: false };
    }),
    ensureProjectStructure: vi.fn((projects) => projects)
  }));

  vi.mock('../../../../../services/assets/folder-operations', () => ({
    addAssetsToRootFolder: vi.fn((projects) => projects),
    addAssetsToSpecificFolder: vi.fn((projects, index, folderId) => {
      return { folderFound: folderId === 'folder1', locationAdded: folderId === 'folder1' ? 'folder1' : 'unknown' };
    }),
    createNewFolderWithAssets: vi.fn((projects, index, folderId) => {
      return { folderFound: true, locationAdded: folderId };
    })
  }));

  vi.mock('../../../../../services/assets/coverImageOperations', () => ({
    updateProjectCoverIfNeeded: vi.fn((index, assets, projects) => projects)
  }));

  vi.mock('../../../../../services/assets/upload/saveProjectAssetsToDatabase', () => ({
    saveProjectAssetsToDatabase: vi.fn(async () => ({ folderDbId: 'test-folder-id' }))
  }));

  vi.mock('../../../../../services/projectOperationUtils', () => ({
    findProject: vi.fn((projectId) => {
      if (projectId === 'project1') {
        return {
          projectIndex: 0,
          project: {
            id: 'project1',
            name: 'Test Project 1',
            assets: [],
            subfolders: []
          }
        };
      }
      return null;
    })
  }));

  // Mock asset conversion
  vi.mock('../../../../../services/assetConversionUtils', () => ({
    convertFilesToAssets: vi.fn((files, licenseType, folderId) => {
      return files.filter(f => f.status === 'complete').map(f => ({
        id: f.id,
        name: f.name,
        type: f.type,
        size: f.size,
        preview: f.preview,
        licenseType,
        folderId,
        uploadedAt: new Date()
      }));
    })
  }));

  // Mock localStorage operations
  vi.mock('../../../../../data/store/storageSync', () => ({
    saveProjectsToLocalStorage: vi.fn(),
    logProjects: vi.fn()
  }));
};
