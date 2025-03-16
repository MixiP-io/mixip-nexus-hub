
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { 
  getProjects, 
  getProjectById, 
  createProject,
  deleteProject,
  updateProject,
  syncProjectsWithLocalStorage,
  persistProjectsToLocalStorage
} from '../../services/projectManagement/basicOperations';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock project store
vi.mock('../../../data/projectStore', () => ({
  projects: [],
  updateProjects: vi.fn(),
  currentUser: {
    id: 'test-user',
    name: 'Test User',
    email: 'test@example.com'
  }
}));

describe('Basic Project Operations', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    
    // Reset mock functions
    vi.clearAllMocks();
    
    // Reset in-memory projects (if needed)
    require('../../../data/projectStore').projects.length = 0;
  });
  
  describe('getProjects', () => {
    it('should return an empty array when no projects exist', () => {
      const projects = getProjects();
      expect(projects).toEqual([]);
    });
    
    it('should return projects from localStorage if they exist', () => {
      const testProjects = [
        { 
          id: 'test1', 
          name: 'Test Project 1', 
          assets: [], 
          createdAt: new Date(), 
          updatedAt: new Date(),
          createdBy: 'test-user',
          owners: [{
            userId: 'test-user',
            name: 'Test User',
            email: 'test@example.com',
            royaltyPercentage: 100
          }],
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
        }
      ];
      
      window.localStorage.setItem('projects', JSON.stringify(testProjects));
      const projects = getProjects();
      expect(projects).toEqual(testProjects);
    });
  });
  
  describe('getProjectById', () => {
    it('should return undefined if project does not exist', () => {
      const project = getProjectById('non-existent');
      expect(project).toBeUndefined();
    });
    
    it('should return the project if it exists', () => {
      const testProject = { 
        id: 'test1', 
        name: 'Test Project 1', 
        assets: [], 
        createdAt: new Date(), 
        updatedAt: new Date(),
        createdBy: 'test-user',
        owners: [{
          userId: 'test-user',
          name: 'Test User',
          email: 'test@example.com',
          royaltyPercentage: 100
        }],
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
      };
      
      window.localStorage.setItem('projects', JSON.stringify([testProject]));
      const project = getProjectById('test1');
      expect(project).toEqual(testProject);
    });
  });
  
  describe('createProject', () => {
    it('should create a new project with the specified name', () => {
      const newProject = createProject('New Project', {
        description: 'Test description',
        tags: ['test', 'project'],
        owners: [{
          userId: 'test-user',
          name: 'Test User',
          email: 'test@example.com',
          royaltyPercentage: 100
        }],
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
        parentId: 'parent-id'
      });
      
      expect(newProject.name).toBe('New Project');
      expect(newProject.description).toBe('Test description');
      expect(newProject.tags).toEqual(['test', 'project']);
      
      // Check that the project was saved to localStorage
      const savedProjects = JSON.parse(window.localStorage.getItem('projects') || '[]');
      expect(savedProjects.length).toBe(1);
      expect(savedProjects[0].name).toBe('New Project');
    });
    
    it('should generate a unique ID for the new project', () => {
      const project1 = createProject('Project 1', {
        owners: [{
          userId: 'test-user',
          name: 'Test User',
          email: 'test@example.com',
          royaltyPercentage: 100
        }],
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
        }
      });
      
      const project2 = createProject('Project 2', {
        owners: [{
          userId: 'test-user',
          name: 'Test User',
          email: 'test@example.com',
          royaltyPercentage: 100
        }],
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
        }
      });
      
      expect(project1.id).not.toBe(project2.id);
    });
  });
  
  // Additional tests for other functions...
});
