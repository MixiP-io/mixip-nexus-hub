
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { projects, updateProjects, currentUser, logProjects } from '../../data/projectStore';

describe('Project Store', () => {
  beforeEach(() => {
    // Spy on console.log
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('updateProjects', () => {
    it('should update the projects array with new data', () => {
      const originalProjects = [...projects];
      
      const newProjects = [
        {
          id: 'test-project',
          name: 'Test Project',
          assets: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'user1',
          owners: [],
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
      
      // Update the projects
      updateProjects(newProjects);
      
      // Check that projects array has been updated
      expect(projects).not.toEqual(originalProjects);
      expect(projects).toEqual(newProjects);
      expect(projects.length).toBe(1);
      expect(projects[0].id).toBe('test-project');
    });
  });
  
  describe('logProjects', () => {
    it('should log the current projects to the console', () => {
      logProjects();
      
      expect(console.log).toHaveBeenCalledWith(
        'Current projects:',
        expect.any(String) // JSON.stringify result
      );
    });
  });
  
  describe('currentUser', () => {
    it('should provide the current user information', () => {
      expect(currentUser).toHaveProperty('id');
      expect(currentUser).toHaveProperty('name');
      expect(currentUser).toHaveProperty('email');
    });
  });
});
