
import React from 'react';
import { CollaboratorGroup, Collaborator } from '../types';
import AddMembersAfterCreate from '../AddMembersAfterCreate';

interface AddMembersViewProps {
  group: CollaboratorGroup;
  onComplete: () => void;
  onSkip: () => void;
  onAddMembers: (groupId: number, memberIds: number[]) => void;
  findAvailableCollaborators: (groupId: number | null, query: string) => Collaborator[];
}

const AddMembersView: React.FC<AddMembersViewProps> = ({
  group,
  onComplete,
  onSkip,
  onAddMembers,
  findAvailableCollaborators
}) => {
  return (
    <div className="p-6">
      <AddMembersAfterCreate 
        group={group}
        onComplete={onComplete}
        onSkip={onSkip}
        onAddMembers={onAddMembers}
        findAvailableCollaborators={findAvailableCollaborators}
      />
    </div>
  );
};

export default AddMembersView;
