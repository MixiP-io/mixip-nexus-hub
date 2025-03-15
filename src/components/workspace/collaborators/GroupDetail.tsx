
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollaboratorGroup } from './types';
import { ArrowLeft, Edit, Trash2, UserPlus, Users } from 'lucide-react';

interface GroupDetailProps {
  group: CollaboratorGroup;
  onBack: () => void;
  onEdit: (groupId: number) => void;
  onDelete: (groupId: number) => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({
  group,
  onBack,
  onEdit,
  onDelete
}) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div>
      {/* Back button */}
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-blue-400 hover:text-blue-300"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Groups
      </button>
      
      {/* Group Header */}
      <div className="bg-gray-800 rounded-xl overflow-hidden mb-6">
        <div 
          className="h-24 relative flex items-end p-6"
          style={{ background: `linear-gradient(to right, ${group.color}40, ${group.color}10)` }}
        >
          {/* Color bar */}
          <div 
            className="absolute top-0 left-0 w-full h-1" 
            style={{ backgroundColor: group.color }}
          />
          
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-semibold">{group.name}</h2>
            
            <div className="flex space-x-2">
              <Button 
                variant="default" 
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => onEdit(group.id)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Group
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => onDelete(group.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Group
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-0">
          <p className="text-gray-400 mb-4">{group.description}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-700 px-3 py-1 rounded-full flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {group.memberCount} members
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-full">
              {group.type}
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-full">
              {group.privacy}
            </div>
          </div>
        </div>
      </div>
      
      {/* Members Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Members ({group.memberCount})</h3>
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Members
          </Button>
        </div>
        
        {group.members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.members.map(member => (
              <div 
                key={member.id} 
                className="bg-gray-800 rounded-lg p-4 flex items-center"
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-xl">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No members yet</h3>
            <p className="text-gray-400 mb-4">Add team members to this group</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Members
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
