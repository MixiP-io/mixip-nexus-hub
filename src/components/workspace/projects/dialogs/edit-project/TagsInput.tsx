
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = React.useState('');

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
  );
};

export default TagsInput;
