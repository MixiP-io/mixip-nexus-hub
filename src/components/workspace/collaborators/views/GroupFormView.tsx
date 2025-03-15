
import React from 'react';
import { CollaboratorGroup } from '../types';
import GroupForm from '../group-form/GroupForm';

interface GroupFormViewProps {
  isCreating: boolean;
  editingGroup: CollaboratorGroup | undefined;
  onCancel: () => void;
  onComplete: (groupData: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const GroupFormView: React.FC<GroupFormViewProps> = ({
  isCreating,
  editingGroup,
  onCancel,
  onComplete
}) => {
  return (
    <div className="p-6">
      <GroupForm 
        isCreating={isCreating}
        onCancel={onCancel}
        onComplete={onComplete}
        existingGroup={editingGroup}
      />
    </div>
  );
};

export default GroupFormView;
