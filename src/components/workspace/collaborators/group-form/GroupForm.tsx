
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CollaboratorGroup } from '../types';
import { FormData, GroupFormProps } from './types';
import BasicInformation from './BasicInformation';
import FormActions from './FormActions';

const GroupForm: React.FC<GroupFormProps> = ({ 
  isCreating, 
  onCancel, 
  onComplete,
  existingGroup
}) => {
  const methods = useForm<FormData>({
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
  
  const { handleSubmit, watch } = methods;
  const [selectedColor, setSelectedColor] = useState<string>(
    existingGroup?.color || '#8B5CF6'
  );

  // Use watch to get the name field value as a string
  const watchName = watch('name');

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

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl overflow-hidden p-6 text-gray-200 border border-gray-700">
      <h2 className="text-xl font-semibold mb-6 text-white">
        {isCreating ? 'Create New Collaborator Group' : 'Edit Group'}
      </h2>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <BasicInformation 
              watchName={watchName} 
              selectedColor={selectedColor} 
              setSelectedColor={setSelectedColor} 
            />
            
            <FormActions isCreating={isCreating} onCancel={onCancel} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default GroupForm;
