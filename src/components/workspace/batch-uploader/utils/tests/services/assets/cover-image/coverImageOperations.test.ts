
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { updateProjectCoverIfNeeded } from '../../../../services/assets/coverImageOperations';
import { setProjectCoverImage } from '../../../../services/assets/coverImageService';
import { projects, updateProjects } from '../../../../data/projectStore';

describe('Cover Image Operations', () => {
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
    
    vi.mock('../../../../data/projectStore', () => ({
      projects: [
        {
          id: 'project1',
          name: 'Test Project',
          assets: [
            { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', preview: 'data:image/jpeg;base64,test', size: 1000, uploadedAt: new Date() }
          ],
          updatedAt: new Date()
        },
        {
          id: 'project2',
          name: 'Project With Cover',
          assets: [
            { id: 'asset2', name: 'Asset 2', type: 'image/png', preview: 'data:image/png;base64,test', size: 1000, uploadedAt: new Date() }
          ],
          coverImage: 'data:image/png;base64,existing',
          updatedAt: new Date()
        }
      ],
      updateProjects: vi.fn()
    }));
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Set up console spy to test logging
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('updateProjectCoverIfNeeded', () => {
    it('should update cover image if project does not have one', () => {
      const updatedProjects = [...projects];
      const projectIndex = 0; // Project without cover image
      const assets = [
        { id: 'asset1', name: 'Test Image', type: 'image/jpeg', preview: 'data:image/jpeg;base64,test', size: 1000, uploadedAt: new Date() }
      ];
      
      updateProjectCoverIfNeeded(projectIndex, assets, updatedProjects);
      
      expect(updatedProjects[projectIndex].coverImage).toBe('data:image/jpeg;base64,test');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Setting cover image from asset'));
    });
    
    it('should not update cover image if project already has one', () => {
      const updatedProjects = [...projects];
      const projectIndex = 1; // Project with existing cover image
      const assets = [
        { id: 'asset2', name: 'Test Image', type: 'image/jpeg', preview: 'data:image/jpeg;base64,new', size: 1000, uploadedAt: new Date() }
      ];
      
      const existingCover = updatedProjects[projectIndex].coverImage;
      updateProjectCoverIfNeeded(projectIndex, assets, updatedProjects);
      
      expect(updatedProjects[projectIndex].coverImage).toBe(existingCover);
    });
    
    it('should not update cover if no image assets with preview are found', () => {
      const updatedProjects = [...projects];
      const projectIndex = 0; // Project without cover image
      const assets = [
        { id: 'asset1', name: 'Text File', type: 'text/plain', preview: null, size: 1000, uploadedAt: new Date() }
      ];
      
      updateProjectCoverIfNeeded(projectIndex, assets, updatedProjects);
      
      expect(updatedProjects[projectIndex].coverImage).toBeUndefined();
    });
  });
  
  describe('setProjectCoverImage', () => {
    it('should set a project cover image from an asset', () => {
      const success = setProjectCoverImage('project1', 'asset1');
      
      expect(success).toBe(true);
      expect(updateProjects).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Project cover image updated');
    });
    
    it('should return false if project not found', () => {
      const success = setProjectCoverImage('nonexistent', 'asset1');
      
      expect(success).toBe(false);
      expect(updateProjects).not.toHaveBeenCalled();
    });
    
    it('should return false if asset not found in project', () => {
      const success = setProjectCoverImage('project1', 'nonexistent');
      
      expect(success).toBe(false);
      expect(updateProjects).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
