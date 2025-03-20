
import { vi } from 'vitest';
import { toast } from 'sonner';

export const setupCommonMocks = () => {
  // Mock toast
  vi.mock('sonner', () => ({
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn()
    }
  }));
  
  // Mock data/projectStore
  vi.mock('../../../../data/projectStore', () => ({
    projects: [],
    updateProjects: vi.fn(),
    logProjects: vi.fn()
  }));
};

export const setupMockProjects = () => {
  return [
    {
      id: 'project1',
      name: 'Test Project',
      assets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user1',
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
  ];
};

export const setupMockFiles = () => {
  return [
    { 
      id: 'file1', 
      name: 'test1.jpg', 
      type: 'image/jpeg', 
      size: 1024, 
      status: 'complete', 
      licenseType: 'standard', 
      preview: 'data:image/jpeg;base64,test123'
    },
    { 
      id: 'file2', 
      name: 'test2.png', 
      type: 'image/png', 
      size: 2048, 
      status: 'complete', 
      licenseType: 'standard',
      preview: 'data:image/png;base64,test456'
    },
    { 
      id: 'file3', 
      name: 'test3.jpg', 
      type: 'image/jpeg', 
      size: 1536, 
      status: 'error', 
      licenseType: 'standard',
      error: 'Upload failed'
    }
  ];
};
