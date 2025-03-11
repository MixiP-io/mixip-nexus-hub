
import React from 'react';
import { Megaphone } from 'lucide-react';

interface CreateCampaignCardProps {
  onClick: () => void;
}

const CreateCampaignCard: React.FC<CreateCampaignCardProps> = ({ onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="h-40 bg-gray-700 flex items-center justify-center">
        <Megaphone className="w-10 h-10 text-gray-500" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">Create New Campaign</h3>
        <p className="text-sm text-gray-400">Set up a new marketing or creative campaign</p>
      </div>
    </div>
  );
};

export default CreateCampaignCard;
