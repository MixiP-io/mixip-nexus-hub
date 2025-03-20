
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { processAssetsByFolder } from '../../../../services/assets/upload/folderProcessing';
import { supabase } from '@/integrations/supabase/client';
import { 
  addAssetsToRootFolder, 
  addAssetsToSpecificFolder, 
  createNewFolderWithAssets 
} from '../../../../services/assets/folder-operations';

describe('Folder Processing Service', () => {
  beforeEach(() => {
    // Mock Supabase
    vi.mock('@/integrations/supabase/client', () => ({
      supabase: {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null })
      }
    }));
    
    // Mock folder operations
    vi.mock('../../../../services/assets/folder-operations', () => ({
      addAssetsToRootFolder: vi.fn((projects, idx, assets) => projects),
      addAssetsToSpecificFolder: vi.fn(() => ({ folderFound: true, locationAdded: 'test-folder' })),
      createNewFolderWithAssets: vi.fn(() => ({ folderFound: true, locationAdded: 'new-folder' }))
    }));
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Set up console spy to test logging
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should process assets for root folder', async () => {
    const mockProjects = [{ id: 'project1', name: 'Test Project' }];
    const projectIndex = 0;
    const normalizedFolderId = 'root';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, uploadedAt: new Date(), licenseType: 'standard' }
    ];
    
    const result = await processAssetsByFolder(mockProjects, projectIndex, normalizedFolderId, assets);
    
    expect(addAssetsToRootFolder).toHaveBeenCalledWith(mockProjects, projectIndex, assets);
    expect(result.folderFound).toBe(true);
    expect(result.locationAdded).toBe('root');
    expect(result.folderName).toBe('root');
  });
  
  it('should look up folder in database if not root', async () => {
    const mockProjects = [{ id: 'project1', name: 'Test Project' }];
    const projectIndex = 0;
    const normalizedFolderId = 'folder1';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, uploadedAt: new Date(), licenseType: 'standard' }
    ];
    
    // Mock database lookup success
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: { id: 'folder1', name: 'Database Folder' },
        error: null
      })
    } as any);
    
    const result = await processAssetsByFolder(mockProjects, projectIndex, normalizedFolderId, assets);
    
    expect(supabase.from).toHaveBeenCalledWith('project_folders');
    expect(addAssetsToSpecificFolder).toHaveBeenCalledWith(mockProjects, projectIndex, normalizedFolderId, assets);
    expect(result.folderName).toBe('Database Folder');
  });
  
  it('should handle folder lookup errors', async () => {
    const mockProjects = [{ id: 'project1', name: 'Test Project' }];
    const projectIndex = 0;
    const normalizedFolderId = 'folder1';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, uploadedAt: new Date(), licenseType: 'standard' }
    ];
    
    // Mock database lookup error
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: null,
        error: new Error('Database error')
      })
    } as any);
    
    const result = await processAssetsByFolder(mockProjects, projectIndex, normalizedFolderId, assets);
    
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error checking folder by ID'));
    expect(addAssetsToSpecificFolder).toHaveBeenCalledWith(mockProjects, projectIndex, normalizedFolderId, assets);
  });
  
  it('should create a new folder if folder not found', async () => {
    const mockProjects = [{ id: 'project1', name: 'Test Project' }];
    const projectIndex = 0;
    const normalizedFolderId = 'nonexistent';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, uploadedAt: new Date(), licenseType: 'standard' }
    ];
    
    // Mock specific folder not found
    vi.mocked(addAssetsToSpecificFolder).mockReturnValueOnce({ folderFound: false, locationAdded: normalizedFolderId });
    
    const result = await processAssetsByFolder(mockProjects, projectIndex, normalizedFolderId, assets);
    
    expect(createNewFolderWithAssets).toHaveBeenCalledWith(mockProjects, projectIndex, normalizedFolderId, assets);
    expect(result.folderFound).toBe(true);
    expect(result.locationAdded).toBe('new-folder');
    expect(result.folderName).toBe('new-folder');
  });
});
