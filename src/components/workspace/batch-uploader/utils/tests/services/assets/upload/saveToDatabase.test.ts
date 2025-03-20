
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { saveProjectAssetsToDatabase } from '../../../../services/assets/upload/saveProjectAssetsToDatabase';
import { supabase } from '@/integrations/supabase/client';

describe('Asset Database Service', () => {
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
    
    // Mock Supabase
    vi.mock('@/integrations/supabase/client', () => ({
      supabase: {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
        insert: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: { id: 'folder-id' }, error: null })
      }
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
  
  it('should save assets to the database for root folder', async () => {
    const projectId = 'project1';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, preview: 'data:image/jpeg;base64,test', licenseType: 'standard' }
    ];
    const normalizedFolderId = 'root';
    const folderName = 'Root';
    
    // Mock successful insert
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue({
        data: [{ id: 'db-asset-1' }],
        error: null
      })
    } as any);
    
    const result = await saveProjectAssetsToDatabase(projectId, assets, normalizedFolderId, folderName);
    
    expect(supabase.from).toHaveBeenCalledWith('assets');
    expect(result.folderDbId).toBeNull();
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Successfully saved 1 assets to database'));
  });
  
  it('should check and create folder if needed for non-root folder', async () => {
    const projectId = 'project1';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, preview: 'data:image/jpeg;base64,test', licenseType: 'standard' }
    ];
    const normalizedFolderId = 'folder1';
    const folderName = 'Test Folder';
    
    // Mock folder check
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: null,
        error: null
      })
    } as any));
    
    // Mock folder check by name
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: null,
        error: null
      })
    } as any));
    
    // Mock folder creation
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: 'new-folder-id' },
        error: null
      })
    } as any));
    
    // Mock asset insert
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue({
        data: [{ id: 'db-asset-1' }],
        error: null
      })
    } as any));
    
    const result = await saveProjectAssetsToDatabase(projectId, assets, normalizedFolderId, folderName);
    
    expect(supabase.from).toHaveBeenCalledWith('project_folders');
    expect(result.folderDbId).toBe('new-folder-id');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Created new folder in database'));
  });
  
  it('should handle insert errors', async () => {
    const projectId = 'project1';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, preview: 'data:image/jpeg;base64,test', licenseType: 'standard' }
    ];
    const normalizedFolderId = 'root';
    const folderName = 'Root';
    
    // Mock insert error
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue({
        data: null,
        error: new Error('Insert error')
      })
    } as any);
    
    await saveProjectAssetsToDatabase(projectId, assets, normalizedFolderId, folderName);
    
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error inserting assets into database'));
    expect(toast.error).toHaveBeenCalledWith('Error saving assets to database');
  });
  
  it('should find existing folder by ID', async () => {
    const projectId = 'project1';
    const assets = [
      { id: 'asset1', name: 'Asset 1', type: 'image/jpeg', size: 1000, preview: 'data:image/jpeg;base64,test', licenseType: 'standard' }
    ];
    const normalizedFolderId = 'existing-folder';
    const folderName = 'Existing Folder';
    
    // Mock folder exists
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: { id: 'existing-folder', name: 'Existing Folder' },
        error: null
      })
    } as any));
    
    // Mock asset insert
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue({
        data: [{ id: 'db-asset-1' }],
        error: null
      })
    } as any));
    
    const result = await saveProjectAssetsToDatabase(projectId, assets, normalizedFolderId, folderName);
    
    expect(result.folderDbId).toBe('existing-folder');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Found folder by ID in database'));
  });
});
