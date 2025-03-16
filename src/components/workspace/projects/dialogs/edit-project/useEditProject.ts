
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getProjectById } from '../../../batch-uploader/utils/services/projectService';
import { ProjectData } from '../../../batch-uploader/utils/types/projectTypes';

export const useEditProject = (
  project: ProjectData, 
  isOpen: boolean, 
  setIsOpen: (open: boolean) => void,
  onUpdateProject: (projectId: string, updates: Partial<ProjectData>) => void
) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load project data when the dialog opens
  useEffect(() => {
    if (project && isOpen) {
      console.log('Loading project for editing:', project.id);
      // Fetch the latest project data to ensure we're working with current state
      const currentProject = getProjectById(project.id);
      
      if (currentProject) {
        setName(currentProject.name || '');
        setDescription(currentProject.description || '');
        setTags(currentProject.tags || []);
        console.log('Project loaded successfully for editing', {
          name: currentProject.name,
          description: currentProject.description,
          tags: currentProject.tags
        });
      } else {
        console.error('Project not found for editing:', project.id);
        toast.error('Error: Project not found');
        setIsOpen(false);
      }
    }
  }, [project, isOpen, setIsOpen]);
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event propagation
    
    if (isSubmitting) {
      console.log('Already submitting, ignoring duplicate request');
      return;
    }
    
    if (!name.trim()) {
      toast.error('Project name is required');
      return;
    }
    
    if (!project || !project.id) {
      console.error('Invalid project for update');
      toast.error('Error: Invalid project');
      return;
    }
    
    setIsSubmitting(true);
    console.log('Updating project:', project.id);
    
    const updates: Partial<ProjectData> = {
      name,
      description,
      tags
    };
    
    // First close the dialog
    setIsOpen(false);
    
    // Wait for dialog animation to complete
    setTimeout(() => {
      try {
        // Then pass both the project ID and updates to the handler
        onUpdateProject(project.id, updates);
      } catch (error) {
        console.error('Error updating project:', error);
        toast.error('Failed to update project');
      } finally {
        setIsSubmitting(false);
      }
    }, 300);
  };
  
  return {
    name,
    setName,
    description,
    setDescription,
    tags,
    setTags,
    handleSave,
    isSubmitting
  };
};
