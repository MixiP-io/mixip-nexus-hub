
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { projects, updateProjects, currentUser, logProjects } from '../../data/projectStore';
import { ensureProjectDataIntegrity } from '../../data/store/projectIntegrity';

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
  
  describe('ensureProjectDataIntegrity', () => {
    it('should fix project data structure issues', () => {
      // Setup test with a broken project
      const brokenProjects = [
        {
          id: 'broken-project',
          name: 'Broken Project',
          // Missing assets array
          // Missing subfolders array
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'user1',
          owners: []
          // Missing licensing
        }
      ];
      
      updateProjects(brokenProjects);
      
      // Run integrity check
      ensureProjectDataIntegrity();
      
      // Verify fixed project
      expect(projects[0]).toHaveProperty('assets');
      expect(Array.isArray(projects[0].assets)).toBe(true);
      expect(projects[0]).toHaveProperty('subfolders');
      expect(Array.isArray(projects[0].subfolders)).toBe(true);
      expect(projects[0]).toHaveProperty('licensing');
      expect(projects[0].licensing).toHaveProperty('type');
      expect(projects[0].licensing).toHaveProperty('usageRights');
    });
  });
});
