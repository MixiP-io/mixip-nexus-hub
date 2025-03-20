
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { getProjectById } from '@/components/workspace/batch-uploader/utils/projectUtils';

/**
 * Hook to load project data with retries
 */
export const useProjectLoader = () => {
  const [projectData, setProjectData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load project with retries
  const loadProjectWithRetries = useCallback(async (projectId: string, maxRetries = 3) => {
    if (!projectId) return null;
    
    setIsLoading(true);
    
    let retries = 0;
    let project = null;
    
    while (retries < maxRetries) {
      try {
        console.log(`[useProjectLoader] Loading project from Supabase, attempt ${retries + 1}`);
        
        // First try to get from local store
        project = getProjectById(projectId);
        
        if (project) {
          console.log(`[useProjectLoader] Loaded project from local store: ${project.name}`);
          setProjectData(project);
          setIsLoading(false);
          return project;
        }
        
        // If not in local store, try Supabase
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            subfolders:project_folders(*)
          `)
          .eq('id', projectId)
          .single();
          
        if (error) {
          console.error(`[useProjectLoader] Error loading project: ${error.message}`);
          throw error;
        }
        
        if (data) {
          console.log(`[useProjectLoader] Loaded project from Supabase: ${data.name}`);
          setProjectData(data);
          setIsLoading(false);
          return data;
        }
        
        // If we get here, project not found
        console.log(`[useProjectLoader] Project not found: ${projectId}`);
        break;
      } catch (err) {
        console.error(`[useProjectLoader] Error: ${err}`);
        retries++;
        
        if (retries >= maxRetries) {
          console.log(`[useProjectLoader] Max retries (${maxRetries}) reached, giving up`);
          toast.error('Failed to load project after multiple attempts');
          break;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    setIsLoading(false);
    return null;
  }, []);
  
  return {
    projectData,
    isLoading,
    setIsLoading,
    loadProjectWithRetries
  };
};
