
import React from 'react';
import { cn } from '@/lib/utils';
import { ViewOption } from './types/viewOption';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import CampaignList from './CampaignList';
import { Campaign } from './types';

interface CampaignTabsProps {
  activeView: ViewOption;
  setActiveView: (view: ViewOption) => void;
  filteredCampaigns: Campaign[];
  onStartCampaignCreation: () => void;
  onViewResponses: (id: number) => void;
  onDistribute: (id: number) => void;
}

const CampaignTabs: React.FC<CampaignTabsProps> = ({
  activeView,
  setActiveView,
  filteredCampaigns,
  onStartCampaignCreation,
  onViewResponses,
  onDistribute
}) => {
  const tabs = [
    { id: 'all', label: 'All Campaigns' },
    { id: 'incoming', label: 'Incoming' },
    { id: 'outgoing', label: 'Outgoing' },
    { id: 'inprogress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-800 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "pb-4 px-1 font-medium text-base relative transition-colors",
                activeView === tab.id
                  ? "text-white" 
                  : "text-gray-400 hover:text-gray-300"
              )}
              onClick={() => setActiveView(tab.id as ViewOption)}
            >
              {tab.label}
              {activeView === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <Button 
          variant="outline" 
          className="bg-transparent text-white hover:bg-mixip-blue hover:text-white flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
      
      <CampaignList 
        campaigns={filteredCampaigns}
        onStartCampaignCreation={onStartCampaignCreation}
        onViewResponses={onViewResponses}
        onDistribute={onDistribute}
      />
    </div>
  );
};

export default CampaignTabs;
