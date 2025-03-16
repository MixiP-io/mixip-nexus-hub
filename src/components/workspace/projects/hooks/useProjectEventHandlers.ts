
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';
import { useProjectCrudEvents } from './events/useProjectCrudEvents';
import { useFolderEvents } from './events/useFolderEvents';
import { useProjectEditEvents } from './events/useProjectEditEvents';
import { useCoverImageEvents } from './events/useCoverImageEvents';
import { useSearchEvents } from './events/useSearchEvents';

export interface UseProjectEventHandlersProps {
  projects: ProjectData[];
  setSelectedProjectId: (id: string | null) => void;
  setCreateProjectOpen: (open: boolean) => void;
  setCreateSubfolderOpen: (open: boolean) => void;
  setProjectToDelete: (id: string | null) => void;
  setProjectToDeleteName: (name: string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setProjectToEdit: (project: ProjectData | null) => void;
  setEditProjectOpen: (open: boolean) => void;
  setProjectForCoverImage: (id: string | null) => void;
  setSetCoverImageOpen: (open: boolean) => void;
  refreshProjects: () => void;
  createNewProject: (name: string) => void;
  deleteSelectedProject: (id: string) => void;
  projectToDeleteName: string;
  updateProjectDetails: (projectId: string, updates: Partial<ProjectData>) => void;
}

export interface UseProjectEventHandlersResult {
  handleCreateProject: (name: string) => void;
  handleProjectClick: (projectId: string) => void;
  handleDeleteProject: (projectId: string) => void;
  confirmDeleteProject: () => void;
  handleEditProject: (projectId: string) => void;
  handleAddSubfolder: (projectId: string) => void;
  handleFolderCreated: () => void;
  handleSetCoverImage: (projectId: string) => void;
  handleProjectUpdated: (projectId: string, updates: Partial<ProjectData>) => void;
  searchProjects: (term: string) => void;
}

export const useProjectEventHandlers = ({
  projects,
  setSelectedProjectId,
  setCreateProjectOpen,
  setCreateSubfolderOpen,
  setProjectToDelete,
  setProjectToDeleteName,
  setDeleteDialogOpen,
  setProjectToEdit,
  setEditProjectOpen,
  setProjectForCoverImage,
  setSetCoverImageOpen,
  refreshProjects,
  createNewProject,
  deleteSelectedProject,
  projectToDeleteName,
  updateProjectDetails
}: UseProjectEventHandlersProps): UseProjectEventHandlersResult => {
  
  // Use our smaller, focused hooks
  const { 
    handleCreateProject, 
    handleProjectClick, 
    handleDeleteProject, 
    confirmDeleteProject 
  } = useProjectCrudEvents({
    projects,
    setCreateProjectOpen,
    setSelectedProjectId,
    setProjectToDelete,
    setProjectToDeleteName,
    setDeleteDialogOpen,
    createNewProject,
    deleteSelectedProject,
    projectToDeleteName
  });

  const { 
    handleAddSubfolder, 
    handleFolderCreated 
  } = useFolderEvents({
    setSelectedProjectId,
    setCreateSubfolderOpen,
    refreshProjects
  });

  const { 
    handleEditProject, 
    handleProjectUpdated 
  } = useProjectEditEvents({
    projects,
    setProjectToEdit,
    setEditProjectOpen,
    updateProjectDetails
  });

  const { 
    handleSetCoverImage 
  } = useCoverImageEvents({
    setProjectForCoverImage,
    setSetCoverImageOpen
  });

  const { 
    searchProjects 
  } = useSearchEvents();

  return {
    handleCreateProject,
    handleProjectClick,
    handleDeleteProject,
    confirmDeleteProject,
    handleEditProject,
    handleAddSubfolder,
    handleFolderCreated,
    handleSetCoverImage,
    handleProjectUpdated,
    searchProjects
  };
};
