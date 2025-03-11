import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Inbox, Send, Clock, CheckCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CampaignList from './CampaignList';
import { Campaign } from './types';

interface CampaignTabsProps {
  activeView: string;
  onActiveViewChange: (value: string) => void;
  filteredCampaigns: Campaign[];
  onStartCampaignCreation: () => void;
  onViewResponses: (id: number) => void;
  onDistribute: (id: number) => void;
}

const CampaignTabs: React.FC<CampaignTabsProps> = ({
  activeView,
  onActiveViewChange,
  filteredCampaigns,
  onStartCampaignCreation,
  onViewResponses,
  onDistribute
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className="bg-transparent text-white hover:bg-mixip-blue hover:text-white flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue={activeView} onValueChange={onActiveViewChange} className="w-full">
        <TabsList className="w-full justify-start mb-4 bg-transparent">
          <TabsTrigger value="all" className="data-[state=active]:bg-mixip-blue">
            All Campaigns
          </TabsTrigger>
          <TabsTrigger value="incoming" className="data-[state=active]:bg-mixip-blue">
            <Inbox className="w-4 h-4 mr-2" />
            Incoming
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="data-[state=active]:bg-mixip-blue">
            <Send className="w-4 h-4 mr-2" />
            Outgoing
          </TabsTrigger>
          <TabsTrigger value="inprogress" className="data-[state=active]:bg-mixip-blue">
            <Clock className="w-4 h-4 mr-2" />
            In Progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-mixip-blue">
            <CheckCircle className="w-4 h-4 mr-2" />
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <CampaignList 
            campaigns={filteredCampaigns}
            onStartCampaignCreation={onStartCampaignCreation}
            onViewResponses={onViewResponses}
            onDistribute={onDistribute}
          />
        </TabsContent>
        
        <TabsContent value="incoming">
          <CampaignList 
            campaigns={filteredCampaigns}
            onStartCampaignCreation={onStartCampaignCreation}
            onViewResponses={onViewResponses}
            onDistribute={onDistribute}
          />
        </TabsContent>
        
        <TabsContent value="outgoing">
          <CampaignList 
            campaigns={filteredCampaigns}
            onStartCampaignCreation={onStartCampaignCreation}
            onViewResponses={onViewResponses}
            onDistribute={onDistribute}
          />
        </TabsContent>
        
        <TabsContent value="inprogress">
          <CampaignList 
            campaigns={filteredCampaigns}
            onStartCampaignCreation={onStartCampaignCreation}
            onViewResponses={onViewResponses}
            onDistribute={onDistribute}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <CampaignList 
            campaigns={filteredCampaigns}
            onStartCampaignCreation={onStartCampaignCreation}
            onViewResponses={onViewResponses}
            onDistribute={onDistribute}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignTabs;
