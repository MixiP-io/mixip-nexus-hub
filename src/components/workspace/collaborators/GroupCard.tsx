
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Star, Users } from 'lucide-react';
import { CollaboratorGroup } from './types';

interface GroupCardProps {
  group: CollaboratorGroup;
  onViewGroup: (id: number) => void;
  onToggleStar: (id: number) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ 
  group, 
  onViewGroup,
  onToggleStar
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

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer group"
      onClick={() => onViewGroup(group.id)}
    >
      <div className="h-40 bg-gray-700 relative" style={{ backgroundColor: `${group.color}20` }}>
        {/* Group color bar */}
        <div 
          className="absolute top-0 left-0 w-full h-1" 
          style={{ backgroundColor: group.color }}
        />
        
        {/* Member avatars collage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2 p-4">
            {group.members.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="w-12 h-12 border-2 border-gray-700">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
            ))}
            {group.members.length === 0 && (
              <div className="col-span-2 text-center text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">No members yet</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Group type badge */}
        <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          {group.type}
        </div>
        
        {/* Star button */}
        <button 
          className="absolute bottom-2 right-2 p-1 rounded-full bg-gray-800 text-gray-400 hover:text-yellow-400 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(group.id);
          }}
        >
          <Star 
            className={`w-4 h-4 ${group.isStarred ? 'text-yellow-400 fill-yellow-400' : ''}`} 
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{group.name}</h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{group.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-400">
            <Users className="w-4 h-4 mr-1" />
            <span>{group.memberCount} members</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatRelativeTime(group.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
