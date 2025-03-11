
import React from 'react';
import CampaignCard from './CampaignCard';
import CreateCampaignCard from './CreateCampaignCard';
import { Campaign } from './types';

interface CampaignListProps {
  campaigns: Campaign[];
  onStartCampaignCreation: () => void;
  onViewResponses: (id: number) => void;
  onDistribute: (id: number) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ 
  campaigns, 
  onStartCampaignCreation, 
  onViewResponses, 
  onDistribute 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {campaigns.map(campaign => (
        <CampaignCard 
          key={campaign.id} 
          campaign={campaign} 
          onViewResponses={onViewResponses} 
          onDistribute={onDistribute} 
        />
      ))}
      
      <CreateCampaignCard onClick={onStartCampaignCreation} />
    </div>
  );
};

export default CampaignList;
