import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { addFilesToProject } from '../../services/assets/upload/addFilesToProject';
import { projects, updateProjects, logProjects } from '../../data/projectStore';
import { UploadFile } from '../../../types';

// Mock the toast module
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    warning: vi.fn(),
    success: vi.fn(),
  }
}));

// Mock the projectStore module
vi.mock('../../data/projectStore', () => ({
  projects: [],
  updateProjects: vi.fn(),
  logProjects: vi.fn(),
  ensureProjectDataIntegrity: vi.fn()
}));

// Mock folder processing
vi.mock('../../services/assets/upload/folderProcessing', () => ({
  processAssetsByFolder: vi.fn(async () => ({
    folderFound: true, 
    locationAdded: 'test-folder', 
    folderName: 'test-folder'
  }))
}));

// Mock the validation and helper modules
vi.mock('../../services/assets/projectAssetsValidation', () => ({
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

vi.mock('../../services/assets/folder-operations', () => ({
  addAssetsToRootFolder: vi.fn((projects) => projects),
  addAssetsToSpecificFolder: vi.fn((projects, index, folderId) => {
    return { folderFound: folderId === 'folder1', locationAdded: folderId === 'folder1' ? 'folder1' : 'unknown' };
  }),
  createNewFolderWithAssets: vi.fn((projects, index, folderId) => {
    return { folderFound: true, locationAdded: folderId };
  })
}));

vi.mock('../../services/assets/coverImageOperations', () => ({
  updateProjectCoverIfNeeded: vi.fn((index, assets, projects) => projects)
}));

vi.mock('../../services/assets/upload/saveProjectAssetsToDatabase', () => ({
  saveProjectAssetsToDatabase: vi.fn(async () => ({ folderDbId: 'test-folder-id' }))
}));

vi.mock('../../services/projectOperationUtils', () => ({
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
vi.mock('../../services/assetConversionUtils', () => ({
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
vi.mock('../../data/store/storageSync', () => ({
  saveProjectsToLocalStorage: vi.fn(),
  logProjects: vi.fn()
}));

describe('Asset Service', () => {
  let mockProjects: any[];
  let mockFiles: UploadFile[];
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Set up console spy to test logging
    vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Sample test data
    mockProjects = [
      {
        id: 'project1',
        name: 'Test Project 1',
        assets: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'testuser',
        owners: [],
        licensing: { type: 'standard', usageRights: {
          primaryCampaign: true,
          secondaryBrand: false,
          extendedMarketing: false,
          derivativeWorks: false,
          merchandising: false,
          publicity: false,
          socialMedia: true,
          aiTraining: false
        }},
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
    
    // Sample upload files
    mockFiles = [
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
    
    // Set up the mocked projects array
    vi.mocked(projects).splice(0, projects.length, ...mockProjects);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('addFilesToProject', () => {
    it('should add files to project root when folderId is "root"', async () => {
      const result = await addFilesToProject('project1', mockFiles, 'standard', 'root');
      
      expect(updateProjects).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Adding files to project: project1, folder: root')
      );
      expect(logProjects).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.count).toBe(2); // Only 2 complete files
      expect(result.location).toBe('test-folder');
    });
    
    it('should add files to a specific folder when folderId is provided', async () => {
      const result = await addFilesToProject('project1', mockFiles, 'exclusive', 'folder1');
      
      expect(updateProjects).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.location).toBe('test-folder');
    });
    
    it('should create a new folder when folder not found', async () => {
      const result = await addFilesToProject('project1', mockFiles, 'standard', 'nonexistent-folder');
      
      expect(updateProjects).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.location).toBe('test-folder');
    });
    
    it('should reject with error when project does not exist', async () => {
      await expect(
        addFilesToProject('nonexistent', mockFiles, 'standard', 'root')
      ).rejects.toThrow('Project not found: nonexistent');
    });
    
    it('should resolve without adding anything when no files are completed', async () => {
      const incompleteFiles = [mockFiles[2]]; // Only the incomplete file
      const result = await addFilesToProject('project1', incompleteFiles, 'standard', 'root');
      
      expect(console.log).toHaveBeenCalledWith('[assetService] No completed files to add to project');
      expect(result.success).toBe(false);
      expect(result.count).toBe(0);
      expect(result.location).toBe('test-folder');
    });
  });
});
