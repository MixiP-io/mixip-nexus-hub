
import React from 'react';
import { CollaboratorGroup, Collaborator } from '../types';
import GroupDetail from '../GroupDetail';

interface GroupDetailViewProps {
  group: CollaboratorGroup;
  onBack: () => void;
  onEdit: (groupId: number) => void;
  onDelete: (groupId: number) => void;
  onAddMembers: (groupId: number, memberIds: number[]) => void;
  findAvailableCollaborators: (groupId: number | null, query: string) => Collaborator[];
}

const GroupDetailView: React.FC<GroupDetailViewProps> = ({
  group,
  onBack,
  onEdit,
  onDelete,
  onAddMembers,
  findAvailableCollaborators
}) => {
  return (
    <div className="p-6">
      <GroupDetail 
        group={group}
        onBack={onBack}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddMembers={onAddMembers}
        findAvailableCollaborators={findAvailableCollaborators}
      />
    </div>
  );
};

export default GroupDetailView;
