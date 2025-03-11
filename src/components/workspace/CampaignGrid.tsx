import React, { useState } from 'react';
import { Plus, Megaphone, Calendar, MapPin, Share2 } from 'lucide-react';
import CampaignForm from './campaign-form';
import CampaignDistributeDialog from './CampaignDistributeDialog';
import { toast } from 'sonner';

// Sample campaign data
const initialCampaigns = [
  {
    id: 1,
    title: "Summer Collection Launch",
    type: "Photoshoot",
    status: "Active",
    startDate: "2023-07-15",
    endDate: "2023-08-15",
    teamSize: 8,
    location: "Miami, FL",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Product Showcase",
    type: "Video",
    status: "Planning",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    teamSize: 5,
    location: "New York, NY",
    image: "/placeholder.svg"
  }
];

interface CampaignGridProps {
  isCreating?: boolean;
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ isCreating = false }) => {
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(isCreating);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [showDistributeDialog, setShowDistributeDialog] = useState(false);
  
  // Campaign creation handlers
  const startCampaignCreation = () => {
    setIsCreatingCampaign(true);
  };
  
  const cancelCampaignCreation = () => {
    setIsCreatingCampaign(false);
  };

  const handleCampaignComplete = (campaignData: any) => {
    // Create a new campaign with the form data
    const newCampaign = {
      id: campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1,
      title: campaignData.title,
      type: "New",
      status: "Draft",
      startDate: campaignData.startDate ? campaignData.startDate.toISOString().split('T')[0] : "",
      endDate: campaignData.endDate ? campaignData.endDate.toISOString().split('T')[0] : "",
      teamSize: campaignData.roles ? campaignData.roles.length : 0,
      location: campaignData.location || "Anywhere",
      image: "/placeholder.svg"
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
            <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
            <p className="text-gray-400">Manage your marketing and creative campaigns</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all">
                <div className="h-40 bg-gray-700 relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                    {campaign.status}
                  </div>
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
                  
                  <button
                    onClick={() => handleDistributeCampaign(campaign.id)}
                    className="mt-3 w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md py-2 px-3 text-sm"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Distribute Campaign
                  </button>
                </div>
              </div>
            ))}
            
            {/* Create New Campaign Card */}
            <div 
              className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer"
              onClick={startCampaignCreation}
            >
              <div className="h-40 bg-gray-700 flex items-center justify-center">
                <Megaphone className="w-10 h-10 text-gray-500" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">Create New Campaign</h3>
                <p className="text-sm text-gray-400">Set up a new marketing or creative campaign</p>
              </div>
            </div>
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
