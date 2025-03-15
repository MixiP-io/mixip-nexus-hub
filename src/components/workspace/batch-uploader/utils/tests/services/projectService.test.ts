
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toast } from 'sonner';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProjectOwnership, 
  updateProjectLicensing 
} from '../../services/projectService';
import { projects, updateProjects, currentUser } from '../../data/projectStore';
import { ProjectOwner, ProjectLicensing } from '../../types/projectTypes';

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

describe('Project Service', () => {
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
        assets: [],
        createdAt: new Date(),
        updatedAt: new Date(),
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
      }
    ];
    
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
  
  describe('updateProjectOwnership', () => {
    it('should update project owners when percentages add up to 100', () => {
      const newOwners: ProjectOwner[] = [
        { userId: 'user1', name: 'User One', email: 'user1@example.com', royaltyPercentage: 50 },
        { userId: 'user2', name: 'User Two', email: 'user2@example.com', royaltyPercentage: 50 }
      ];
      
      const result = updateProjectOwnership('project1', newOwners);
      
      expect(result).toBe(true);
      expect(updateProjects).toHaveBeenCalled();
    });
    
    it('should reject ownership update when percentages do not add up to 100', () => {
      const invalidOwners: ProjectOwner[] = [
        { userId: 'user1', name: 'User One', email: 'user1@example.com', royaltyPercentage: 60 },
        { userId: 'user2', name: 'User Two', email: 'user2@example.com', royaltyPercentage: 30 }
      ];
      
      const result = updateProjectOwnership('project1', invalidOwners);
      
      expect(result).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Royalty percentages must add up to 100%');
      expect(updateProjects).not.toHaveBeenCalled();
    });
    
    it('should reject ownership update when project does not exist', () => {
      const owners: ProjectOwner[] = [
        { userId: 'user1', name: 'User One', email: 'user1@example.com', royaltyPercentage: 100 }
      ];
      
      const result = updateProjectOwnership('nonexistent', owners);
      
      expect(result).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Project not found: nonexistent');
      expect(updateProjects).not.toHaveBeenCalled();
    });
  });
  
  describe('updateProjectLicensing', () => {
    it('should update project licensing information', () => {
      const newLicensing: ProjectLicensing = {
        type: 'limited',
        usageRights: {
          primaryCampaign: true,
          secondaryBrand: true,
          extendedMarketing: false,
          derivativeWorks: false,
          merchandising: false,
          publicity: false,
          socialMedia: true,
          aiTraining: false
        }
      };
      
      const result = updateProjectLicensing('project1', newLicensing);
      
      expect(result).toBe(true);
      expect(updateProjects).toHaveBeenCalled();
    });
    
    it('should reject licensing update when project does not exist', () => {
      const licensing: ProjectLicensing = {
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
      
      const result = updateProjectLicensing('nonexistent', licensing);
      
      expect(result).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Project not found: nonexistent');
      expect(updateProjects).not.toHaveBeenCalled();
    });
  });
});
