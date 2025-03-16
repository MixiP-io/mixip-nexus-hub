
import { useCallback } from 'react';
import { toast } from 'sonner';
import { ProjectData } from '../../../batch-uploader/utils/types/projectTypes';

interface UseProjectEditEventsProps {
  projects: ProjectData[];
  setProjectToEdit: (project: ProjectData | null) => void;
  setEditProjectOpen: (open: boolean) => void;
  updateProjectDetails: (projectId: string, updates: Partial<ProjectData>) => void;
}

export const useProjectEditEvents = ({
  projects,
  setProjectToEdit,
  setEditProjectOpen,
  updateProjectDetails
}: UseProjectEditEventsProps) => {
  
  const handleEditProject = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      console.log('Setting project for edit:', project.name);
      setProjectToEdit(project);
      setEditProjectOpen(true);
    } else {
      console.error('Project not found for edit:', projectId);
      toast.error('Error: Project not found');
    }
  }, [projects, setProjectToEdit, setEditProjectOpen]);

  const handleProjectUpdated = useCallback((projectId: string, updates: Partial<ProjectData>) => {
    console.log('Handling project update:', projectId, updates);
    
    if (!projectId || !updates) {
      console.error('Invalid update parameters:', { projectId, updates });
      toast.error('Invalid update parameters');
      return;
    }
    
    try {
      // First close the dialog completely
      console.log('Proceeding with update after validation');
      
      // Update the project with minimal delay
      updateProjectDetails(projectId, updates);
      
      // Show success notification
      toast.success('Project updated successfully');
    } catch (err) {
      console.error('Error updating project:', err);
      toast.error('An error occurred while updating the project');
    }
  }, [updateProjectDetails]);

  return {
    handleEditProject,
    handleProjectUpdated
  };
};
