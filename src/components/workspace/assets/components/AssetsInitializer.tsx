
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { ensureProjectDataIntegrity } from '../../batch-uploader/utils/data/store/projectIntegrity';
import { supabase } from '@/integrations/supabase/client';

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
  
  // Verify folder exists in database
  useEffect(() => {
    if (selectedProjectId && selectedFolderId && selectedFolderId !== 'root') {
      const verifyFolderInDatabase = async () => {
        try {
          const { data, error } = await supabase
            .from('project_folders')
            .select('id, name')
            .eq('id', selectedFolderId)
            .eq('project_id', selectedProjectId)
            .single();
            
          if (error) {
            console.error('[AssetsInitializer] Folder verification error:', error);
          } else if (data) {
            console.log(`[AssetsInitializer] Verified folder in database: ${data.name} (${data.id})`);
          } else {
            console.log(`[AssetsInitializer] Folder not found in database: ${selectedFolderId}`);
          }
        } catch (err) {
          console.error('[AssetsInitializer] Error in folder verification:', err);
        }
      };
      
      verifyFolderInDatabase();
    }
  }, [selectedProjectId, selectedFolderId]);
  
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
          // If folder not found in project data, try to get it from the database
          const getFolderFromDatabase = async () => {
            if (selectedProjectId && selectedFolderId !== 'root') {
              try {
                const { data, error } = await supabase
                  .from('project_folders')
                  .select('name')
                  .eq('id', selectedFolderId)
                  .eq('project_id', selectedProjectId)
                  .single();
                  
                if (error) {
                  console.error('[AssetsInitializer] Error getting folder details:', error);
                  handleFolderChange(selectedFolderId);
                } else if (data) {
                  console.log(`[AssetsInitializer] Got folder name from database: ${data.name}`);
                  handleFolderChange(selectedFolderId, data.name);
                } else {
                  handleFolderChange(selectedFolderId);
                }
              } catch (err) {
                console.error('[AssetsInitializer] Database query error:', err);
                handleFolderChange(selectedFolderId);
              }
            } else {
              handleFolderChange(selectedFolderId);
            }
          };
          
          getFolderFromDatabase();
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
  
  // We return null as this component only has side effects
  return null;
};

export default AssetsInitializer;
