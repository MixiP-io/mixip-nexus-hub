
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toast } from 'sonner';
import { createSubfolder, getAllFoldersForProject } from '../../services/folderService';
import { projects, updateProjects } from '../../data/projectStore';

// Mock the toast module
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
  }
}));

// Mock the projectStore module
vi.mock('../../data/projectStore', () => ({
  projects: [],
  updateProjects: vi.fn(),
}));

describe('Folder Service', () => {
  let mockProjects: any[];
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Sample test data with nested folder structure
    mockProjects = [
      {
        id: 'project1',
        name: 'Test Project 1',
        assets: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'testuser',
        owners: [
          { userId: 'testuser', name: 'Test User', email: 'test@example.com', royaltyPercentage: 100 }
        ],
        licensing: {
          type: 'standard',
          usageRights: {}
        },
        subfolders: [
          {
            id: 'folder1',
            name: 'Test Folder 1',
            assets: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            subfolders: [
              {
                id: 'subfolder1',
                name: 'Test Subfolder 1',
                assets: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                subfolders: []
              }
            ]
          }
        ]
      },
      {
        id: 'project2',
        name: 'Test Project 2',
        assets: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'testuser',
        owners: [],
        licensing: {
          type: 'standard',
          usageRights: {}
        },
        subfolders: []
      }
    ];
    
    // Set up the mocked projects array
    vi.mocked(projects).splice(0, projects.length, ...mockProjects);
  });
  
  describe('createSubfolder', () => {
    it('should create a subfolder at the project root level', () => {
      const projectId = 'project1';
      const folderName = 'New Root Folder';
      
      const result = createSubfolder(projectId, folderName);
      
      expect(result).not.toBeNull();
      expect(result?.name).toBe(folderName);
      expect(result?.id).toContain('folder-');
      expect(updateProjects).toHaveBeenCalled();
      
      // Verify the project was updated with the new folder
      const updatedProjects = vi.mocked(updateProjects).mock.calls[0][0];
      expect(updatedProjects[0].subfolders.length).toBe(mockProjects[0].subfolders.length + 1);
    });
    
    it('should create a nested subfolder when parentFolderId is provided', () => {
      const projectId = 'project1';
      const folderName = 'New Nested Folder';
      const parentFolderId = 'folder1';
      
      const result = createSubfolder(projectId, folderName, parentFolderId);
      
      expect(result).not.toBeNull();
      expect(result?.name).toBe(folderName);
      expect(updateProjects).toHaveBeenCalled();
      
      // Verify the parent folder was updated with the new subfolder
      const updatedProjects = vi.mocked(updateProjects).mock.calls[0][0];
      expect(updatedProjects[0].subfolders[0].subfolders.length).toBe(
        mockProjects[0].subfolders[0].subfolders.length + 1
      );
    });
    
    it('should return null and show an error when project does not exist', () => {
      const result = createSubfolder('nonexistent', 'Test Folder');
      
      expect(result).toBeNull();
      expect(toast.error).toHaveBeenCalledWith('Project not found: nonexistent');
      expect(updateProjects).not.toHaveBeenCalled();
    });
    
    it('should return null when parent folder does not exist', () => {
      const result = createSubfolder('project1', 'Test Folder', 'nonexistent-folder');
      
      expect(result).toBeNull();
      expect(toast.error).toHaveBeenCalledWith('Parent folder not found: nonexistent-folder');
      expect(updateProjects).not.toHaveBeenCalled();
    });
    
    it('should create a subfolder in a deeply nested folder', () => {
      const projectId = 'project1';
      const folderName = 'Deeply Nested Folder';
      const parentFolderId = 'subfolder1';
      
      const result = createSubfolder(projectId, folderName, parentFolderId);
      
      expect(result).not.toBeNull();
      expect(result?.name).toBe(folderName);
      expect(updateProjects).toHaveBeenCalled();
    });
  });
  
  describe('getAllFoldersForProject', () => {
    it('should return all folders for a project in a flattened structure', () => {
      const result = getAllFoldersForProject('project1');
      
      expect(result.length).toBe(3); // Root + folder1 + subfolder1
      expect(result[0]).toEqual({ id: 'root', name: 'Project Root' });
      expect(result[1].id).toBe('folder1');
      expect(result[2].id).toBe('subfolder1');
      expect(result[2].parentId).toBe('folder1');
    });
    
    it('should return just the root folder for a project with no subfolders', () => {
      const result = getAllFoldersForProject('project2');
      
      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ id: 'root', name: 'Project Root' });
    });
    
    it('should return an empty array for a non-existent project', () => {
      const result = getAllFoldersForProject('nonexistent');
      
      expect(result).toEqual([]);
    });
  });
});
