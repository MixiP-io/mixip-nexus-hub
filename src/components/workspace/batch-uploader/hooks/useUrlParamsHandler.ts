
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getProjectById } from '../utils/projectUtils';

export const useUrlParamsHandler = () => {
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  const [triggerFileInput, setTriggerFileInput] = useState<boolean>(false);
  
  // Handle URL parameters on component mount and when they change
  useEffect(() => {
    const projectParam = searchParams.get('project');
    const folderParam = searchParams.get('folder');
    const fromEmptyProject = searchParams.get('fromEmptyProject') === 'true';
    
    console.log('[CRITICAL] BatchUploader initialized with URL params:', { 
      project: projectParam, 
      folder: folderParam,
      fromEmptyProject: fromEmptyProject
    });
    
    if (projectParam) {
      const project = getProjectById(projectParam);
      if (project) {
        console.log('[BatchUploader] Setting project from URL param:', projectParam);
        setSelectedProject(projectParam);
        
        if (folderParam) {
          console.log('[CRITICAL] Setting folder from URL param:', folderParam);
          setSelectedFolder(folderParam);
          
          const folderName = folderParam === 'root' ? 'root folder' : 
            `folder "${project.subfolders?.find(f => f.id === folderParam)?.name || folderParam}"`;
          
          // Add a small delay to ensure the UI is ready
          setTimeout(() => {
            toast.info(`Upload files to ${project.name}: ${folderName}`);
            
            // If coming from empty project view, set a flag to trigger file input
            if (fromEmptyProject) {
              console.log('[CRITICAL] Coming from empty project view, will trigger file input');
              setTriggerFileInput(true);
            }
          }, 300);
        }
      } else {
        console.warn('[BatchUploader] Project from URL not found:', projectParam);
        toast.error('Selected project not found');
      }
    }
  }, [searchParams]);

  return {
    selectedProject,
    setSelectedProject,
    selectedFolder,
    setSelectedFolder,
    triggerFileInput,
    setTriggerFileInput
  };
};
