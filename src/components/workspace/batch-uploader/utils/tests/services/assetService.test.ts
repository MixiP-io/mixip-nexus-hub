
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { addFilesToProject } from '../../services/assets/addFilesToProject';
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
        source: 'computer', // Added source property
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
        source: 'computer', // Added source property
        file: new File([], 'test-document.pdf', { type: 'application/pdf' }),
        preview: undefined
      },
      {
        id: 'file3',
        name: 'incomplete-file.png',
        type: 'image/png',
        size: 512,
        progress: 50,
        status: 'uploading',
        source: 'computer', // Added source property
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
      await addFilesToProject('project1', mockFiles, 'root', 'standard');
      
      expect(updateProjects).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Adding files to project: project1, folder: root')
      );
      expect(logProjects).toHaveBeenCalled();
      
      // Only completed files should be added (2 out of 3)
      const updatedProjects = vi.mocked(updateProjects).mock.calls[0][0];
      expect(updatedProjects[0].assets.length).toBe(2);
      expect(updatedProjects[0].assets[0].id).toBe('file1');
      expect(updatedProjects[0].assets[1].id).toBe('file2');
    });
    
    it('should add files to a specific folder when folderId is provided', async () => {
      await addFilesToProject('project1', mockFiles, 'folder1', 'exclusive');
      
      expect(updateProjects).toHaveBeenCalled();
      
      // Check that files were added to the specified folder
      const updatedProjects = vi.mocked(updateProjects).mock.calls[0][0];
      expect(updatedProjects[0].subfolders[0].assets.length).toBe(2);
      expect(updatedProjects[0].subfolders[0].assets[0].licenseType).toBe('exclusive');
      expect(updatedProjects[0].subfolders[0].assets[0].folderId).toBe('folder1');
    });
    
    it('should add to project root and show warning when folder not found', async () => {
      await addFilesToProject('project1', mockFiles, 'nonexistent-folder', 'standard');
      
      expect(updateProjects).toHaveBeenCalled();
      expect(toast.warning).toHaveBeenCalledWith('Folder not found, added to project root');
      
      // Files should be added to project root instead
      const updatedProjects = vi.mocked(updateProjects).mock.calls[0][0];
      expect(updatedProjects[0].assets.length).toBe(2);
    });
    
    it('should reject with error when project does not exist', async () => {
      await expect(
        addFilesToProject('nonexistent', mockFiles, 'root', 'standard')
      ).rejects.toThrow('Project not found: nonexistent');
      
      expect(toast.error).toHaveBeenCalledWith('Project not found: nonexistent');
      expect(updateProjects).not.toHaveBeenCalled();
    });
    
    it('should resolve without adding anything when no files are completed', async () => {
      const incompleteFiles = [mockFiles[2]]; // Only the incomplete file
      
      await addFilesToProject('project1', incompleteFiles, 'root', 'standard');
      
      expect(console.log).toHaveBeenCalledWith('No completed files to add to project');
      expect(updateProjects).not.toHaveBeenCalled();
    });
  });
});
