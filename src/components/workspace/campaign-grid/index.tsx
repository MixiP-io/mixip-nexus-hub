
import React, { useState } from 'react';
import CampaignForm from '../campaign-form';
import CampaignDistributeDialog from '../CampaignDistributeDialog';
import CampaignResponseTracker from '../campaign-tracker';
import { toast } from 'sonner';
import CampaignList from './CampaignList';
import { Campaign, initialCampaigns } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Inbox, Send, Clock, CheckCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignGridProps {
  isCreating?: boolean;
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ isCreating = false }) => {
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(isCreating);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [showDistributeDialog, setShowDistributeDialog] = useState(false);
  const [isViewingResponses, setIsViewingResponses] = useState(false);
  const [viewingCampaignId, setViewingCampaignId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<string>('all');
  
  // Campaign creation handlers
  const startCampaignCreation = () => {
    setIsCreatingCampaign(true);
  };
  
  const cancelCampaignCreation = () => {
    setIsCreatingCampaign(false);
  };

  const handleCampaignComplete = (campaignData: any) => {
    // Create a new campaign with the form data
    const newCampaign: Campaign = {
      id: campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1,
      title: campaignData.title,
      type: "New",
      status: "Draft",
      startDate: campaignData.startDate ? campaignData.startDate.toISOString().split('T')[0] : "",
      endDate: campaignData.endDate ? campaignData.endDate.toISOString().split('T')[0] : "",
      teamSize: campaignData.roles ? campaignData.roles.length : 0,
      location: campaignData.location || "Anywhere",
      image: "/placeholder.svg",
      responseRate: 0
    };
    
    // Add the new campaign to the list
    setCampaigns([...campaigns, newCampaign]);
    setIsCreatingCampaign(false);
    toast.success('Campaign created successfully!');
  };

  const handleDistributeCampaign = (campaignId: number) => {
    setSelectedCampaign(campaignId);
    setShowDistributeDialog(true);
  };

  const handleViewResponses = (campaignId: number) => {
    setViewingCampaignId(campaignId);
    setIsViewingResponses(true);
  };

  const handleBackToCampaigns = () => {
    setIsViewingResponses(false);
    setViewingCampaignId(null);
  };

  // Filter campaigns based on active view
  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeView === 'all') return true;
    
    switch (activeView) {
      case 'incoming':
        return campaign.status === 'New' || campaign.status === 'Draft';
      case 'outgoing':
        return campaign.status === 'Distributed';
      case 'inprogress':
        return campaign.status === 'In Progress' || campaign.status === 'Active';
      case 'completed':
        return campaign.status === 'Completed';
      default:
        return true;
    }
  });

  // If viewing responses for a specific campaign
  if (isViewingResponses && viewingCampaignId) {
    const campaign = campaigns.find(c => c.id === viewingCampaignId);
    return (
      <div>
        <button 
          onClick={handleBackToCampaigns}
          className="mb-4 flex items-center text-blue-400 hover:text-blue-300"
        >
          ← Back to Campaigns
        </button>
        <CampaignResponseTracker 
          campaignId={viewingCampaignId} 
          campaignTitle={campaign?.title}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      {isCreatingCampaign ? (
        <CampaignForm 
          isCreating={true} 
          onCancel={cancelCampaignCreation}
          onComplete={handleCampaignComplete}
        />
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Campaigns</h2>
            <p className="text-gray-400">Manage your marketing and creative campaigns</p>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <Tabs defaultValue={activeView} onValueChange={setActiveView}>
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
                  onStartCampaignCreation={startCampaignCreation}
                  onViewResponses={handleViewResponses}
                  onDistribute={handleDistributeCampaign}
                />
              </TabsContent>
              
              <TabsContent value="incoming">
                <CampaignList 
                  campaigns={filteredCampaigns}
                  onStartCampaignCreation={startCampaignCreation}
                  onViewResponses={handleViewResponses}
                  onDistribute={handleDistributeCampaign}
                />
              </TabsContent>
              
              <TabsContent value="outgoing">
                <CampaignList 
                  campaigns={filteredCampaigns}
                  onStartCampaignCreation={startCampaignCreation}
                  onViewResponses={handleViewResponses}
                  onDistribute={handleDistributeCampaign}
                />
              </TabsContent>
              
              <TabsContent value="inprogress">
                <CampaignList 
                  campaigns={filteredCampaigns}
                  onStartCampaignCreation={startCampaignCreation}
                  onViewResponses={handleViewResponses}
                  onDistribute={handleDistributeCampaign}
                />
              </TabsContent>
              
              <TabsContent value="completed">
                <CampaignList 
                  campaigns={filteredCampaigns}
                  onStartCampaignCreation={startCampaignCreation}
                  onViewResponses={handleViewResponses}
                  onDistribute={handleDistributeCampaign}
                />
              </TabsContent>
            </Tabs>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </>
      )}
      
      {/* Campaign Distribution Dialog */}
      <CampaignDistributeDialog 
        isOpen={showDistributeDialog}
        onClose={() => setShowDistributeDialog(false)}
      />
    </div>
  );
};

export default CampaignGrid;
