
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toast } from 'sonner';
import { 
  getProjects, 
  getProjectById, 
  createProject 
} from '../../services/projectManagement/basicOperations';
import { projects, updateProjects, currentUser } from '../../data/projectStore';

// Mock the toast module
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  }
}));

// Mock the projectStore module
vi.mock('../../data/projectStore', () => ({
  projects: [],
  updateProjects: vi.fn(),
  currentUser: {
    id: 'testuser',
    name: 'Test User',
    email: 'test@example.com'
  }
}));

// Mock the retrieval operations
vi.mock('../../services/projectManagement/projectRetrievalOperations', () => ({
  getProjects: vi.fn(),
  getProjectById: vi.fn()
}));

// Mock the create operations
vi.mock('../../services/projectManagement/projectCreateOperations', () => ({
  createProject: vi.fn()
}));

describe('Project Service - Basic Operations', () => {
  let mockProjects: any[];
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Sample test data
    mockProjects = [
      {
        id: 'project1',
        name: 'Test Project 1',
        description: 'Test description',
        tags: ['marketing', 'social'],
        assets: [],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-20'),
        createdBy: 'testuser',
        owners: [
          { userId: 'testuser', name: 'Test User', email: 'test@example.com', royaltyPercentage: 100 }
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
      {
        id: 'project2',
        name: 'Product Photoshoot',
        description: 'Product photos',
        tags: ['product', 'photography'],
        assets: [],
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-15'),
        createdBy: 'user2',
        owners: [
          { userId: 'user2', name: 'User Two', email: 'user2@example.com', royaltyPercentage: 100 }
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
      }
    ];
    
    // Import the actual implementations for tests
    const actualModule = jest.requireActual('../../services/projectManagement/projectRetrievalOperations');
    const actualCreateModule = jest.requireActual('../../services/projectManagement/projectCreateOperations');
    
    // Setup the mocked implementation
    vi.mocked(getProjects).mockImplementation(() => mockProjects);
    vi.mocked(getProjectById).mockImplementation((id) => mockProjects.find(p => p.id === id) || null);
    vi.mocked(createProject).mockImplementation(actualCreateModule.createProject);
    
    // Set up the mocked projects array
    vi.mocked(projects).splice(0, projects.length, ...mockProjects);
  });
  
  describe('getProjects', () => {
    it('should return a copy of all projects', () => {
      const result = getProjects();
      expect(result).toEqual(mockProjects);
      expect(result).not.toBe(projects); // Should be a new array, not a reference
    });
  });
  
  describe('getProjectById', () => {
    it('should return the project with the matching ID', () => {
      const result = getProjectById('project1');
      expect(result).toEqual(mockProjects[0]);
    });
    
    it('should return undefined if no project matches the ID', () => {
      const result = getProjectById('nonexistent');
      expect(result).toBeUndefined();
    });
  });
  
  describe('createProject', () => {
    it('should create a new project with minimum required fields', () => {
      const projectName = 'New Test Project';
      const result = createProject(projectName);
      
      expect(result.name).toBe(projectName);
      expect(result.id).toContain('project-');
      expect(result.createdBy).toBe(currentUser.id);
      expect(result.owners[0].userId).toBe(currentUser.id);
      expect(updateProjects).toHaveBeenCalled();
    });
    
    it('should create a project with optional fields when provided', () => {
      const projectName = 'Project with Options';
      const options = {
        description: 'Test description',
        tags: ['test', 'project'],
        owners: [
          { userId: 'user1', name: 'User One', email: 'user1@example.com', royaltyPercentage: 60 },
          { userId: 'user2', name: 'User Two', email: 'user2@example.com', royaltyPercentage: 40 }
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
        parentId: 'parent-project'
      };
      
      const result = createProject(projectName, options);
      
      expect(result.name).toBe(projectName);
      expect(result.description).toBe(options.description);
      expect(result.tags).toEqual(options.tags);
      expect(result.owners).toEqual(options.owners);
      expect(result.licensing).toEqual(options.licensing);
      expect(result.parentId).toBe(options.parentId);
      expect(updateProjects).toHaveBeenCalled();
    });
  });
});
