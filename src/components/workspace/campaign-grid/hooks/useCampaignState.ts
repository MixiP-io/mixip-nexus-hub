
import { useState } from 'react';
import { Campaign, initialCampaigns } from '../types';
import { toast } from 'sonner';

export function useCampaignState(isCreating = false) {
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
  const getFilteredCampaigns = () => {
    return campaigns.filter(campaign => {
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
  };

  return {
    isCreatingCampaign,
    campaigns,
    selectedCampaign,
    showDistributeDialog,
    isViewingResponses,
    viewingCampaignId,
    activeView,
    setActiveView,
    startCampaignCreation,
    cancelCampaignCreation,
    handleCampaignComplete,
    handleDistributeCampaign,
    handleViewResponses,
    handleBackToCampaigns,
    setShowDistributeDialog,
    getFilteredCampaigns
  };
}
