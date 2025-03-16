
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getProjectById } from '../../../batch-uploader/utils/services/projectService';
import { ProjectData } from '../../../batch-uploader/utils/types/projectTypes';

export const useEditProject = (
  project: ProjectData, 
  isOpen: boolean, 
  setIsOpen: (open: boolean) => void,
  onUpdateProject: (updates: Partial<ProjectData>) => void
) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
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
        console.log('Project loaded successfully for editing');
      } else {
        console.error('Project not found for editing:', project.id);
        toast.error('Error: Project not found');
        setIsOpen(false);
      }
    }
  }, [project, isOpen, setIsOpen]);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event propagation
    
    if (!name.trim()) {
      toast.error('Project name is required');
      return;
    }
    
    console.log('Updating project:', project.id);
    
    const updates: Partial<ProjectData> = {
      name,
      description,
      tags
    };
    
    // Call the onUpdateProject prop with the updates
    onUpdateProject(updates);
  };
  
  return {
    name,
    setName,
    description,
    setDescription,
    tags,
    setTags,
    handleSave
  };
};
