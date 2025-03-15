
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toast } from 'sonner';
import { updateProjectOwnership, updateProjectLicensing } from '../../services/projectService';
import { projects, updateProjects } from '../../data/projectStore';
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
}));

describe('Project Service - Update Operations', () => {
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
      }
    ];
    
    // Set up the mocked projects array
    vi.mocked(projects).splice(0, projects.length, ...mockProjects);
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
    
    it('should handle multiple owners with different percentages', () => {
      const multipleOwners: ProjectOwner[] = [
        { userId: 'user1', name: 'User One', email: 'user1@example.com', royaltyPercentage: 40 },
        { userId: 'user2', name: 'User Two', email: 'user2@example.com', royaltyPercentage: 35 },
        { userId: 'user3', name: 'User Three', email: 'user3@example.com', royaltyPercentage: 25 }
      ];
      
      const result = updateProjectOwnership('project1', multipleOwners);
      
      expect(result).toBe(true);
      expect(updateProjects).toHaveBeenCalled();
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
