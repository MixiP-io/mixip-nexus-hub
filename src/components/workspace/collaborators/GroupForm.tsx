
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CollaboratorGroup, GroupType, CollaboratorGroupPrivacy } from './types';

interface GroupFormProps {
  isCreating: boolean;
  onCancel: () => void;
  onComplete: (groupData: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'>) => void;
  existingGroup?: CollaboratorGroup;
}

type FormData = {
  name: string;
  description: string;
  type: GroupType;
  privacy: CollaboratorGroupPrivacy;
  color: string;
};

const colorOptions = [
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#0EA5E9', label: 'Blue' },
  { value: '#F97316', label: 'Orange' },
  { value: '#D946EF', label: 'Pink' },
  { value: '#10B981', label: 'Green' },
  { value: '#F59E0B', label: 'Yellow' },
  { value: '#EC4899', label: 'Magenta' },
  { value: '#6366F1', label: 'Indigo' },
];

const GroupForm: React.FC<GroupFormProps> = ({ 
  isCreating, 
  onCancel, 
  onComplete,
  existingGroup
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: existingGroup ? {
      name: existingGroup.name,
      description: existingGroup.description,
      type: existingGroup.type,
      privacy: existingGroup.privacy,
      color: existingGroup.color || '#8B5CF6',
    } : {
      name: '',
      description: '',
      type: 'Internal Team',
      privacy: 'Private',
      color: '#8B5CF6',
    }
  });
  const [selectedColor, setSelectedColor] = useState<string>(
    existingGroup?.color || '#8B5CF6'
  );

  const onSubmit = (data: FormData) => {
    // Create a new group object from form data
    const groupData: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      description: data.description,
      type: data.type,
      privacy: data.privacy,
      color: selectedColor,
      memberCount: existingGroup?.memberCount || 0,
      members: existingGroup?.members || [],
      isStarred: existingGroup?.isStarred || false,
    };
    
    onComplete(groupData);
  };

  const watchName = watch('name');

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl overflow-hidden p-6 text-gray-200 border border-gray-700">
      <h2 className="text-xl font-semibold mb-6 text-white">
        {isCreating ? 'Create New Collaborator Group' : 'Edit Group'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Basic Information Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-100">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-200">Group Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Creative Team, NYC Photographers"
                  className="mt-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  {...register("name", { required: "Group name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
                <div className="text-sm text-gray-400 mt-1">
                  {watchName?.length || 0}/50 characters
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-gray-200">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose of this group"
                  className="mt-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  {...register("description")}
                />
              </div>
              
              <div>
                <Label className="text-gray-200">Group Type</Label>
                <RadioGroup defaultValue={existingGroup?.type || "Internal Team"} className="mt-2">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="Internal Team" 
                        id="internal" 
                        {...register("type")}
                        className="border-gray-600"
                      />
                      <Label htmlFor="internal" className="cursor-pointer text-gray-200">Internal Team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="External Network" 
                        id="external" 
                        {...register("type")}
                        className="border-gray-600"
                      />
                      <Label htmlFor="external" className="cursor-pointer text-gray-200">External Network</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="Agencies" 
                        id="agencies" 
                        {...register("type")}
                        className="border-gray-600"
                      />
                      <Label htmlFor="agencies" className="cursor-pointer text-gray-200">Agencies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="Talent" 
                        id="talent" 
                        {...register("type")}
                        className="border-gray-600"
                      />
                      <Label htmlFor="talent" className="cursor-pointer text-gray-200">Talent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="Custom" 
                        id="custom" 
                        {...register("type")}
                        className="border-gray-600"
                      />
                      <Label htmlFor="custom" className="cursor-pointer text-gray-200">Custom</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="privacy" className="text-gray-200">Privacy Setting</Label>
                <Select 
                  defaultValue={existingGroup?.privacy || "Private"}
                  onValueChange={(value) => {
                    // This would typically be handled by react-hook-form
                    // but for simplicity in this example we're handling it directly
                  }}
                >
                  <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select privacy level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="Public">Public - Visible to everyone</SelectItem>
                    <SelectItem value="Private">Private - Only visible to you</SelectItem>
                    <SelectItem value="Shared">Shared - Visible to specific people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-gray-200">Group Color</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                        selectedColor === color.value ? 'ring-2 ring-white' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-gray-600 text-gray-200 hover:text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-b from-mixip-blue to-mixip-blue-dark hover:from-mixip-blue-dark hover:to-mixip-blue-dark"
            >
              {isCreating ? 'Create Group' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GroupForm;
