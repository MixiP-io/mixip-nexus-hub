
import { useCallback } from 'react';

interface UseFolderEventsProps {
  setSelectedProjectId: (id: string | null) => void;
  setCreateSubfolderOpen: (open: boolean) => void;
  refreshProjects: () => void;
}

export const useFolderEvents = ({
  setSelectedProjectId,
  setCreateSubfolderOpen,
  refreshProjects
}: UseFolderEventsProps) => {
  
  const handleAddSubfolder = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setCreateSubfolderOpen(true);
  }, [setSelectedProjectId, setCreateSubfolderOpen]);

  const handleFolderCreated = useCallback(() => {
    setCreateSubfolderOpen(false);
    refreshProjects();
  }, [setCreateSubfolderOpen, refreshProjects]);

  return {
    handleAddSubfolder,
    handleFolderCreated
  };
};
