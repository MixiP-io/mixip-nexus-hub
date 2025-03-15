
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { filterAndSortProjects } from '../../services/projectManagement/filterSortOperations';
import { projects } from '../../data/projectStore';

// Mock the projectStore module
vi.mock('../../data/projectStore', () => ({
  projects: [],
}));

describe('Project Service - Filter and Sort', () => {
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
      },
      {
        id: 'project3',
        name: 'Social Media Campaign',
        description: 'Social media assets',
        tags: ['marketing', 'social'],
        assets: [],
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-25'),
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
  
  describe('filterAndSortProjects', () => {
    it('should return all projects when no filters or sort options are provided', () => {
      const result = filterAndSortProjects();
      expect(result).toEqual(mockProjects);
      expect(result.length).toBe(3);
    });
    
    it('should filter projects by name', () => {
      const result = filterAndSortProjects({ name: 'Product' });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('project2');
    });
    
    it('should filter projects by tags', () => {
      const result = filterAndSortProjects({ tags: ['marketing'] });
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('project1');
      expect(result[1].id).toBe('project3');
    });
    
    it('should filter projects by creator', () => {
      const result = filterAndSortProjects({ createdBy: 'user2' });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('project2');
    });
    
    it('should filter projects by creation date range', () => {
      const result = filterAndSortProjects({ 
        createdAfter: new Date('2024-03-01'),
        createdBefore: new Date('2024-03-31')
      });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('project2');
    });
    
    it('should sort projects by name in ascending order', () => {
      const result = filterAndSortProjects(
        undefined, 
        { sortBy: 'name', sortOrder: 'asc' }
      );
      expect(result.length).toBe(3);
      expect(result[0].id).toBe('project2'); // "Product Photoshoot" comes first alphabetically
      expect(result[1].id).toBe('project3'); // "Social Media Campaign" comes second
      expect(result[2].id).toBe('project1'); // "Test Project 1" comes last
    });
    
    it('should sort projects by creation date in descending order', () => {
      const result = filterAndSortProjects(
        undefined, 
        { sortBy: 'createdAt', sortOrder: 'desc' }
      );
      expect(result.length).toBe(3);
      expect(result[0].id).toBe('project2'); // Created latest
      expect(result[1].id).toBe('project3'); // Created second latest
      expect(result[2].id).toBe('project1'); // Created earliest
    });
    
    it('should combine filtering and sorting', () => {
      const result = filterAndSortProjects(
        { tags: ['marketing'], createdBy: 'testuser' },
        { sortBy: 'name', sortOrder: 'asc' }
      );
      
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('project3'); // Social Media Campaign
      expect(result[1].id).toBe('project1'); // Test Project 1
    });
  });
});
