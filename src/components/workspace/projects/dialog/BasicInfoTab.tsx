
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface BasicInfoTabProps {
  projectName: string;
  setProjectName: (name: string) => void;
  projectDescription: string;
  setProjectDescription: (description: string) => void;
  projectTags: string[];
  setProjectTags: (tags: string[]) => void;
  setActiveTab: (tab: string) => void;
  setIsOpen: (open: boolean) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  projectTags,
  setProjectTags,
  setActiveTab,
  setIsOpen,
}) => {
  const [tagInput, setTagInput] = React.useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !projectTags.includes(tagInput.trim())) {
      setProjectTags([...projectTags, tagInput.trim()]);
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
    setProjectTags(projectTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="project-name" className="text-gray-200">Project Name</Label>
        <Input
          id="project-name"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="project-description" className="text-gray-200">Project Description</Label>
        <Textarea
          id="project-description"
          placeholder="Enter project description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="project-tags" className="text-gray-200">Tags</Label>
        <div className="flex items-center">
          <Input
            id="project-tags"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          />
          <Button 
            type="button" 
            onClick={handleAddTag}
            className="ml-2 bg-gray-600 hover:bg-gray-500 text-white"
          >
            Add
          </Button>
        </div>
        
        {projectTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {projectTags.map((tag, index) => (
              <div key={index} className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-full">
                <span>{tag}</span>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeTag(tag)}
                  className="ml-1 h-5 w-5 p-0 hover:bg-gray-500 rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setIsOpen(false)}
          className="border-gray-500 bg-gray-700 text-gray-100 hover:bg-gray-600 hover:text-white"
        >
          Cancel
        </Button>
        
        <Button 
          type="button" 
          onClick={() => setActiveTab("rights")}
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={!projectName.trim()}
        >
          Next: Rights Management
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoTab;
