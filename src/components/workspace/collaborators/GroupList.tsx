
import React from 'react';
import GroupCard from './GroupCard';
import CreateGroupCard from './CreateGroupCard';
import { CollaboratorGroup } from './types';

interface GroupListProps {
  groups: CollaboratorGroup[];
  onStartGroupCreation: () => void;
  onViewGroup: (id: number) => void;
  onToggleStar: (id: number) => void;
}

const GroupList: React.FC<GroupListProps> = ({ 
  groups, 
  onStartGroupCreation, 
  onViewGroup,
  onToggleStar
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {groups.map(group => (
        <GroupCard 
          key={group.id} 
          group={group} 
          onViewGroup={onViewGroup} 
          onToggleStar={onToggleStar} 
        />
      ))}
      
      <CreateGroupCard onClick={onStartGroupCreation} />
    </div>
  );
};

export default GroupList;
