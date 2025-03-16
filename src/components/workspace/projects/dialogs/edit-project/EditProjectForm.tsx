
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import TagsInput from './TagsInput';
import { ProjectData } from '../../../batch-uploader/utils/types/projectTypes';

interface EditProjectFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  onSave: (e: React.FormEvent) => void;
  setIsOpen: (open: boolean) => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  name,
  setName,
  description,
  setDescription,
  tags,
  setTags,
  onSave,
  setIsOpen
}) => {
  return (
    <form onSubmit={onSave} className="space-y-4 py-4">
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
      
      <TagsInput tags={tags} setTags={setTags} />
      
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700"
        >
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
};

export default EditProjectForm;
