
import React from 'react';
import { Star, MapPin, Instagram, Globe, Camera, Video, Edit2, Music, MessageCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Creator } from '../../types';

interface ProfileHeaderProps {
  creator: Creator;
  onMessage: () => void;
  onShortlist: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ creator, onMessage, onShortlist }) => {
  // Get role icon
  const getRoleIcon = () => {
    switch(creator.role) {
      case 'photographer': return <Camera className="w-5 h-5" />;
      case 'videographer': return <Video className="w-5 h-5" />;
      case 'photo-editor': return <Edit2 className="w-5 h-5" />;
      case 'audio-engineer': return <Music className="w-5 h-5" />;
      default: return <Camera className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gray-700 p-6">
      <div className="flex items-start">
        <img 
          src={creator.avatar} 
          alt={creator.name} 
          className="w-20 h-20 rounded-full object-cover mr-5 border-2 border-white"
        />
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-1">{creator.name}</h2>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="flex items-center bg-gray-600 px-3 py-1 rounded">
              {getRoleIcon()}
              <span className="ml-1.5">{creator.role.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="ml-1 font-medium">{creator.rating}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{creator.location}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`https://instagram.com/${creator.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">
              <Instagram className="w-4 h-4 mr-1.5" />
              {creator.instagram}
            </a>
            <a href={`https://${creator.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">
              <Globe className="w-4 h-4 mr-1.5" />
              {creator.website}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={onMessage} className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button onClick={onShortlist} variant={creator.status === 'shortlisted' ? 'secondary' : 'outline'} className={creator.status === 'shortlisted' ? 'bg-blue-600' : ''}>
            <UserPlus className="w-4 h-4 mr-2" />
            {creator.status === 'shortlisted' ? 'Shortlisted' : 'Shortlist'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
