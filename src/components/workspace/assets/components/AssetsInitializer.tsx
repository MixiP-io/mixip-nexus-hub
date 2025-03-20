
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { ensureProjectDataIntegrity } from '../../batch-uploader/utils/data/store/projectIntegrity';
import { supabase } from '@/integrations/supabase/client';

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
  // Run data integrity check when component mounts or project changes
  useEffect(() => {
    if (selectedProjectId) {
      console.log('[AssetsInitializer] Running data integrity check for project:', selectedProjectId);
      ensureProjectDataIntegrity();
    }
  }, [selectedProjectId]);
  
  // Verify folder exists in database
  useEffect(() => {
    if (selectedProjectId && selectedFolderId && selectedFolderId !== 'root' && selectedFolderId !== currentFolderId) {
      const verifyFolderInDatabase = async () => {
        try {
          console.log(`[AssetsInitializer] Verifying folder in database: ${selectedFolderId}`);
          
          const { data, error } = await supabase
            .from('project_folders')
            .select('id, name')
            .eq('id', selectedFolderId)
            .eq('project_id', selectedProjectId)
            .single();
            
          if (error) {
            console.error('[AssetsInitializer] Folder verification error:', error);
            
            // Check if folder exists in local data
            if (projectData && projectData.subfolders) {
              const localFolder = projectData.subfolders.find((f: any) => f.id === selectedFolderId);
              if (localFolder) {
                console.log(`[AssetsInitializer] Folder found in local data: ${localFolder.name}`);
                toast.info(`Viewing folder: ${localFolder.name}`);
              }
            }
          } else if (data) {
            console.log(`[AssetsInitializer] Verified folder in database: ${data.name} (${data.id})`);
            toast.info(`Viewing folder: ${data.name}`);
          } else {
            console.log(`[AssetsInitializer] Folder not found in database: ${selectedFolderId}`);
            toast.info(`Viewing folder: ${selectedFolderId}`);
          }
        } catch (err) {
          console.error('[AssetsInitializer] Error in folder verification:', err);
        }
      };
      
      verifyFolderInDatabase();
    }
  }, [selectedProjectId, selectedFolderId, currentFolderId, projectData]);
  
  // Update current folder when selectedFolderId changes
  useEffect(() => {
    if (selectedFolderId && selectedFolderId !== currentFolderId) {
      console.log('[AssetsInitializer] Setting current folder to:', selectedFolderId);
      setCurrentFolderId(selectedFolderId);
      
      // If coming from root, show message
      if (currentFolderId === 'root' && selectedFolderId !== 'root') {
        console.log('[AssetsInitializer] Coming from root folder, showing navigation message');
      }
    }
  }, [selectedFolderId, currentFolderId, setCurrentFolderId]);
  
  // We return null as this component only has side effects
  return null;
};

export default AssetsInitializer;
