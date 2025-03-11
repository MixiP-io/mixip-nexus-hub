
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
    <>
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue={activeView} onValueChange={onActiveViewChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All Campaigns
            </TabsTrigger>
            <TabsTrigger value="incoming">
              <Inbox className="w-4 h-4 mr-2" />
              Incoming
            </TabsTrigger>
            <TabsTrigger value="outgoing">
              <Send className="w-4 h-4 mr-2" />
              Outgoing
            </TabsTrigger>
            <TabsTrigger value="inprogress">
              <Clock className="w-4 h-4 mr-2" />
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed">
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
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
    </>
  );
};

export default CampaignTabs;
