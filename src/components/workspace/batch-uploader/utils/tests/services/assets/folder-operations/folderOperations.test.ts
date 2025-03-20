
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { addAssetsToRootFolder } from '../../../../services/assets/folder-operations/addToRoot';
import { addAssetsToSpecificFolder } from '../../../../services/assets/folder-operations/addToFolder';
import { createNewFolderWithAssets } from '../../../../services/assets/folder-operations/createFolder';
import { projects, updateProjects, logProjects } from '../../../../data/projectStore';
import { saveProjectsToLocalStorage } from '../../../../data/store/storageSync';

describe('Folder Operations Service', () => {
  beforeEach(() => {
    // Mock dependencies
    vi.mock('sonner', () => ({
      toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn()
      }
    }));
    
    vi.mock('../../../../data/store/storageSync', () => ({
      saveProjectsToLocalStorage: vi.fn(),
      logProjects: vi.fn()
    }));
    
    vi.mock('../../../../data/projectStore', () => ({
      projects: [
        {
          id: 'project1',
          name: 'Test Project',
          assets: [],
          subfolders: [
            {
              id: 'folder1',
              name: 'Test Folder',
              assets: [],
              createdAt: new Date(),
              updatedAt: new Date(),
              subfolders: []
            }
          ]
        }
      ],
      updateProjects: vi.fn(),
      logProjects: vi.fn()
    }));
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Set up console spy to test logging
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('addAssetsToRootFolder', () => {
    it('should add assets to the root folder', () => {
      const mockProjects = [...projects];
      const projectIndex = 0;
      const mockAssets = [
        { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000 },
        { id: 'asset2', name: 'Asset 2', type: 'image/png', size: 2000 }
      ];
      
      const result = addAssetsToRootFolder(mockProjects, projectIndex, mockAssets);
      
      expect(saveProjectsToLocalStorage).toHaveBeenCalled();
      expect(result[projectIndex].assets).toHaveLength(2);
      expect(result[projectIndex].assets[0].folderId).toBe('root');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Project now has 2 assets'));
    });
    
    it('should initialize assets array if it does not exist', () => {
      const mockProjects = [{ id: 'project1', name: 'Test Project' }];
      const projectIndex = 0;
      const mockAssets = [{ id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000 }];
      
      const result = addAssetsToRootFolder(mockProjects, projectIndex, mockAssets);
      
      expect(result[projectIndex].assets).toBeDefined();
      expect(result[projectIndex].assets).toHaveLength(1);
    });
  });
  
  describe('addAssetsToSpecificFolder', () => {
    it('should add assets to a specific folder', () => {
      const mockProjects = [...projects];
      const projectIndex = 0;
      const folderId = 'folder1';
      const mockAssets = [
        { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000 }
      ];
      
      const result = addAssetsToSpecificFolder(mockProjects, projectIndex, folderId, mockAssets);
      
      expect(result.folderFound).toBe(true);
      expect(saveProjectsToLocalStorage).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Adding reference assets to project root'));
    });
    
    it('should return folderFound=false when folder does not exist', () => {
      const mockProjects = [...projects];
      const projectIndex = 0;
      const folderId = 'nonexistent-folder';
      const mockAssets = [
        { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000 }
      ];
      
      const result = addAssetsToSpecificFolder(mockProjects, projectIndex, folderId, mockAssets);
      
      expect(result.folderFound).toBe(false);
    });
  });
  
  describe('createNewFolderWithAssets', () => {
    it('should create a new folder and add assets to it', () => {
      const mockProjects = [...projects];
      const projectIndex = 0;
      const folderName = 'New Folder';
      const mockAssets = [
        { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000 }
      ];
      
      const result = createNewFolderWithAssets(mockProjects, projectIndex, folderName, mockAssets);
      
      expect(result.folderFound).toBe(true);
      expect(result.locationAdded).toBe(folderName);
      expect(toast.success).toHaveBeenCalled();
      expect(saveProjectsToLocalStorage).toHaveBeenCalled();
      
      // Check that the subfolder was created
      const createdFolder = mockProjects[projectIndex].subfolders.find(f => f.name === folderName);
      expect(createdFolder).toBeDefined();
      if (createdFolder) {
        expect(createdFolder.assets).toHaveLength(1);
      }
      
      // Check that reference assets were added to root
      expect(mockProjects[projectIndex].assets).toHaveLength(1);
      expect(mockProjects[projectIndex].assets[0].isReference).toBe(true);
    });
  });
});
