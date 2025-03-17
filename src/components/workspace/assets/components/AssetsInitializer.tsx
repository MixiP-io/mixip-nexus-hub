
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import AssetsDebugPanel from './AssetsDebugPanel';

interface AssetsInitializerProps {
  selectedProjectId: string | null;
  selectedFolderId: string | null;
  currentFolderId: string;
  setCurrentFolderId: (folderId: string) => void;
  projectData: any | null;
}

const AssetsInitializer: React.FC<AssetsInitializerProps> = ({
  selectedProjectId,
  selectedFolderId,
  currentFolderId,
  setCurrentFolderId,
  projectData
}) => {
  useEffect(() => {
    console.log('[CRITICAL] [AssetsInitializer] Component rendered with:', { 
      projectId: selectedProjectId, 
      folderId: selectedFolderId,
      currentFolderId
    });
    
    // Update current folder when selectedFolderId changes
    if (selectedFolderId && selectedFolderId !== currentFolderId) {
      console.log('[CRITICAL] [AssetsInitializer] Setting current folder to:', selectedFolderId);
      setCurrentFolderId(selectedFolderId);
      
      // Show folder navigation toast
      if (selectedFolderId !== 'root' && projectData && projectData.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          toast.info(`Viewing folder: ${folder.name}`);
        }
      }
    }
    
    // Logging project data for debugging
    if (projectData) {
      console.log('[CRITICAL] [AssetsInitializer] Project data loaded:', projectData.name);
      
      // Check if we're viewing a specific folder
      if (selectedFolderId && selectedFolderId !== 'root' && projectData.subfolders) {
        const folder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
        if (folder) {
          console.log(`[CRITICAL] [AssetsInitializer] Viewing folder: ${folder.name} with ${folder.assets?.length || 0} assets`);
          
          // Log assets in folder for debugging
          if (folder.assets && folder.assets.length > 0) {
            console.log(`[CRITICAL] [AssetsInitializer] Sample assets in folder "${folder.name}":`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
            
            // Log all assets in the folder for debugging
            console.log(`[CRITICAL] [AssetsInitializer] All assets in folder "${folder.name}":`);
            folder.assets.forEach((asset: any, index: number) => {
              console.log(`Asset ${index + 1}: ID=${asset.id}, Name=${asset.name}, FolderId=${asset.folderId}`);
            });
          } else {
            console.log(`[CRITICAL] [AssetsInitializer] Folder "${folder.name}" has no assets`);
          }
        } else {
          console.log('[CRITICAL] [AssetsInitializer] Selected folder not found:', selectedFolderId);
        }
      } else {
        console.log('[CRITICAL] [AssetsInitializer] Viewing root folder with', projectData.assets?.length || 0, 'assets');
      }
    }
  }, [selectedProjectId, projectData, selectedFolderId, currentFolderId, setCurrentFolderId]);
  
  // Check localStorage for additional debugging
  useEffect(() => {
    if (selectedProjectId) {
      try {
        const projectsJson = localStorage.getItem('projects');
        if (projectsJson) {
          const projects = JSON.parse(projectsJson);
          const currentProject = projects.find((p: any) => p.id === selectedProjectId);
          if (currentProject) {
            console.log(`[CRITICAL] Found project in localStorage, checking for folder:`, selectedFolderId);
            
            if (selectedFolderId && selectedFolderId !== 'root' && currentProject.subfolders) {
              const folder = currentProject.subfolders.find((f: any) => f.id === selectedFolderId);
              if (folder) {
                console.log(`[CRITICAL] Found folder "${folder.name}" in localStorage with ${folder.assets?.length || 0} assets`);
                if (folder.assets && folder.assets.length > 0) {
                  console.log(`[CRITICAL] Sample assets from localStorage:`, JSON.stringify(folder.assets.slice(0, 2), null, 2));
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
