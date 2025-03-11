
import React from 'react';
import { Calendar, MapPin, Share2, Users } from 'lucide-react';
import { Campaign } from './types';

interface CampaignCardProps {
  campaign: Campaign;
  onViewResponses: (id: number) => void;
  onDistribute: (id: number) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ 
  campaign, 
  onViewResponses, 
  onDistribute 
}) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all">
      <div className="h-40 bg-gray-700 relative">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          {campaign.status}
        </div>
        {campaign.responseRate > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs flex items-center">
                <Users className="w-3 h-3 mr-1" /> Response Rate
              </span>
              <span className="text-xs font-medium">{campaign.responseRate}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
              <div 
                className="bg-green-500 h-1.5 rounded-full" 
                style={{ width: `${campaign.responseRate}%` }} 
              />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{campaign.title}</h3>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{campaign.location}</span>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewResponses(campaign.id)}
            className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md py-2 px-3 text-sm"
          >
            <Users className="w-4 h-4 mr-2" />
            View Responses
          </button>
          <button
            onClick={() => onDistribute(campaign.id)}
            className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md py-2 px-3 text-sm"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Distribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
