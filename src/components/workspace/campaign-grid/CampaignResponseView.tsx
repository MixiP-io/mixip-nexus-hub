
import React from 'react';
import CampaignResponseTracker from '../campaign-tracker';

interface CampaignResponseViewProps {
  campaignId: number;
  campaignTitle?: string;
  onBackClick: () => void;
}

const CampaignResponseView: React.FC<CampaignResponseViewProps> = ({ 
  campaignId, 
  campaignTitle, 
  onBackClick 
}) => {
  return (
    <div>
      <button 
        onClick={onBackClick}
        className="mb-4 flex items-center text-blue-400 hover:text-blue-300"
      >
        ← Back to Campaigns
      </button>
      <CampaignResponseTracker 
        campaignId={campaignId} 
        campaignTitle={campaignTitle}
      />
    </div>
  );
};

export default CampaignResponseView;
