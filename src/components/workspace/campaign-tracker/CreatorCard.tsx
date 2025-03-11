
import React from 'react';
import { Star, MapPin, Instagram, Globe, MessageCircle, UserPlus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Creator {
  id: number;
  name: string;
  role: string;
  avatar: string;
  location: string;
  rating: number;
  status: string;
  portfolio: string[];
  instagram: string;
  website: string;
  previousCollabs: number;
  viewedAt: Date | null;
  respondedAt: Date | null;
}

interface CreatorCardProps {
  creator: Creator;
  onViewProfile: () => void;
  onShortlist: () => void;
  onMessage: () => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  onViewProfile,
  onShortlist,
  onMessage
}) => {
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'interested': return 'bg-green-500';
      case 'shortlisted': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'declined': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch(status) {
      case 'interested': return 'Interested';
      case 'shortlisted': return 'Shortlisted';
      case 'pending': return 'Pending';
      case 'declined': return 'Declined';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all">
      {/* Status indicator */}
      <div className={`h-1 ${getStatusColor(creator.status)}`}></div>
      
      <div className="p-4">
        {/* Creator header */}
        <div className="flex items-center mb-3">
          <div className="relative">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="w-14 h-14 rounded-full object-cover mr-3"
            />
            {creator.previousCollabs > 0 && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" title={`${creator.previousCollabs} previous collaborations`}>
                {creator.previousCollabs}
              </div>
            )}
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-lg truncate">{creator.name}</h3>
            <div className="flex items-center text-sm">
              <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded mr-2">
                {creator.role.replace('-', ' ')}
              </span>
              <div className="flex items-center text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-xs">{creator.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span className="truncate">{creator.location}</span>
        </div>
        
        {/* Portfolio preview */}
        <div className="grid grid-cols-3 gap-1 mb-3">
          {creator.portfolio.slice(0, 3).map((image, index) => (
            <div key={index} className="aspect-square bg-gray-700 rounded overflow-hidden">
              <img 
                src={image} 
                alt={`Portfolio item ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Social links */}
        <div className="flex space-x-2 mb-3">
          <button className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded" title={creator.instagram}>
            <Instagram className="w-4 h-4" />
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded" title={creator.website}>
            <Globe className="w-4 h-4" />
          </button>
          <div className="flex-grow"></div>
          <div className={`px-2 py-1 rounded text-xs flex items-center ${getStatusColor(creator.status)} text-white`}>
            {getStatusText(creator.status)}
          </div>
        </div>
        
        {/* Action buttons - Improved with better contrast and visibility */}
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={onMessage}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
          {creator.status !== 'shortlisted' ? (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onShortlist}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Shortlist
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={onShortlist}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Shortlisted
            </Button>
          )}
          <Button 
            variant="default" 
            size="sm" 
            className="px-2 bg-gray-600 hover:bg-gray-700 text-white"
            onClick={onViewProfile}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
