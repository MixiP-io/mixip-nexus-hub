
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { addFilesToProject } from '../../../../../services/assets/upload/addFilesToProject';
import { projects, updateProjects, logProjects } from '../../../../../data/projectStore';
import { setupMockProjects, setupMockFiles, setupCommonMocks } from './testSetup';

describe('Asset Upload Service - addFilesToProject', () => {
  let mockProjects: any[];
  let mockFiles: any[];
  
  beforeEach(() => {
    // Setup common mocks
    setupCommonMocks();
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Set up console spy to test logging
    vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Setup test data
    mockProjects = setupMockProjects();
    mockFiles = setupMockFiles();
    
    // Set up the mocked projects array
    vi.mocked(projects).splice(0, projects.length, ...mockProjects);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should add files to project root when folderId is "root"', async () => {
    const result = await addFilesToProject('project1', mockFiles, 'standard', 'root');
    
    expect(updateProjects).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Adding files to project: project1, folder: root')
    );
    expect(logProjects).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.count).toBe(2); // Only 2 complete files
    expect(result.location).toBe('test-folder');
  });
  
  it('should add files to a specific folder when folderId is provided', async () => {
    const result = await addFilesToProject('project1', mockFiles, 'exclusive', 'folder1');
    
    expect(updateProjects).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.location).toBe('test-folder');
  });
  
  it('should create a new folder when folder not found', async () => {
    const result = await addFilesToProject('project1', mockFiles, 'standard', 'nonexistent-folder');
    
    expect(updateProjects).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.location).toBe('test-folder');
  });
  
  it('should reject with error when project does not exist', async () => {
    await expect(
      addFilesToProject('nonexistent', mockFiles, 'standard', 'root')
    ).rejects.toThrow('Project not found: nonexistent');
  });
  
  it('should resolve without adding anything when no files are completed', async () => {
    const incompleteFiles = [mockFiles[2]]; // Only the incomplete file
    const result = await addFilesToProject('project1', incompleteFiles, 'standard', 'root');
    
    expect(console.log).toHaveBeenCalledWith('[assetService] No completed files to add to project');
    expect(result.success).toBe(false);
    expect(result.count).toBe(0);
    expect(result.location).toBe('test-folder');
  });
});
