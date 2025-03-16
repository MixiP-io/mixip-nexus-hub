
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { updateProject, getProjectById } from '../../batch-uploader/utils/services/projectService';

interface EditProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  project: any;
  onUpdateProject: () => void;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  isOpen,
  setIsOpen,
  project,
  onUpdateProject
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
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
  
  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Project name is required');
      return;
    }
    
    if (!project || !project.id) {
      toast.error('Project ID is missing');
      return;
    }
    
    console.log('Updating project:', project.id);
    
    // Use the updateProject utility function instead of directly manipulating localStorage
    const success = updateProject(project.id, {
      name,
      description,
      tags,
      updatedAt: new Date()
    });
    
    if (success) {
      toast.success('Project updated successfully');
      onUpdateProject();
      setIsOpen(false);
    } else {
      toast.error('Error updating project');
    }
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Edit Project Details</DialogTitle>
          <DialogDescription className="text-gray-300">
            Update the details of your project
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex items-center">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tags (press Enter)"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button 
                type="button" 
                onClick={handleAddTag}
                className="ml-2 bg-gray-600 hover:bg-gray-500 text-white"
              >
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-full">
                    <span>{tag}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeTag(tag)}
                      className="ml-1 h-5 w-5 p-0 hover:bg-gray-500 rounded-full"
                    >
                      <span className="sr-only">Remove</span>
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
