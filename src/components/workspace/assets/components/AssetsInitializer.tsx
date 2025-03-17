
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { ensureProjectDataIntegrity } from '../../batch-uploader/utils/data/store/projectIntegrity';

interface AssetsInitializerProps {
  selectedProjectId: string | null;
  selectedFolderId: string | null;
  currentFolderId: string;
  setCurrentFolderId: (folderId: string) => void;
  handleFolderChange?: (folderId: string, folderName?: string) => void;
  projectData: any | null;
}

const AssetsInitializer: React.FC<AssetsInitializerProps> = ({
  selectedProjectId,
  selectedFolderId,
  currentFolderId,
  setCurrentFolderId,
  handleFolderChange,
  projectData
}) => {
  // Run data integrity check when component mounts or project changes
  useEffect(() => {
    if (selectedProjectId) {
      console.log('[AssetsInitializer] Running data integrity check for project:', selectedProjectId);
      ensureProjectDataIntegrity();
    }
  }, [selectedProjectId]);
  
  useEffect(() => {
    console.log('[AssetsInitializer] Component rendered with:', { 
      projectId: selectedProjectId, 
      folderId: selectedFolderId,
      currentFolderId
    });
    
    // Update current folder when selectedFolderId changes
    if (selectedFolderId && selectedFolderId !== currentFolderId) {
      console.log('[AssetsInitializer] Setting current folder to:', selectedFolderId);
      
      // Use the new folder change handler if available
      if (handleFolderChange && projectData?.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          handleFolderChange(selectedFolderId, folder.name);
        } else {
          handleFolderChange(selectedFolderId);
        }
      } else {
        // Fall back to direct setter
        setCurrentFolderId(selectedFolderId);
        
        // Show folder navigation toast
        if (selectedFolderId !== 'root' && projectData && projectData.subfolders) {
          const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
          if (folder) {
            toast.info(`Viewing folder: ${folder.name}`);
          }
        }
      }
    }
    
    // Logging project data for debugging
    if (projectData) {
      console.log('[AssetsInitializer] Project data loaded:', projectData.name);
      
      // Check if we're viewing a specific folder
      if (selectedFolderId && selectedFolderId !== 'root' && projectData.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          console.log(`[AssetsInitializer] Viewing folder: ${folder.name} with ${folder.assets?.length || 0} assets`);
          
          // Log assets in folder for debugging
          if (folder.assets && folder.assets.length > 0) {
            console.log(`[AssetsInitializer] Sample assets in folder "${folder.name}":`, folder.assets.slice(0, 2));
          } else {
            console.log(`[AssetsInitializer] Folder "${folder.name}" has no assets`);
          }
        } else {
          console.log('[AssetsInitializer] Selected folder not found:', selectedFolderId);
        }
      } else {
        console.log('[AssetsInitializer] Viewing root folder with', projectData.assets?.length || 0, 'assets');
      }
    }
  }, [selectedProjectId, projectData, selectedFolderId, currentFolderId, setCurrentFolderId, handleFolderChange]);
  
  // Check localStorage for additional debugging
  useEffect(() => {
    if (selectedProjectId) {
      try {
        const projectsJson = localStorage.getItem('projects');
        if (projectsJson) {
          const projects = JSON.parse(projectsJson);
          const currentProject = projects.find((p: any) => p.id === selectedProjectId);
          if (currentProject) {
            console.log(`[AssetsInitializer] Found project in localStorage, checking for folder:`, selectedFolderId);
            
            if (selectedFolderId && selectedFolderId !== 'root' && currentProject.subfolders) {
              const folder = currentProject.subfolders.find((f: any) => f.id === selectedFolderId);
              if (folder) {
                console.log(`[AssetsInitializer] Found folder "${folder.name}" in localStorage with ${folder.assets?.length || 0} assets`);
                if (folder.assets && folder.assets.length > 0) {
                  console.log(`[AssetsInitializer] Sample assets from localStorage:`, folder.assets.slice(0, 2));
                }
              }
            }
          }
        }
      } catch (e) {
        console.error("Error checking localStorage:", e);
      }
    }
  }, [selectedProjectId, selectedFolderId]);
  
  // We return null as this component only has side effects
  return null;
};

export default AssetsInitializer;
