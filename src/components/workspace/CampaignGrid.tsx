
import React, { useState } from 'react';
import { Plus, Megaphone, X, Calendar, MapPin, Users, FileText } from 'lucide-react';

// Sample campaign data
const campaigns = [
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
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  
  // Campaign creation handlers
  const startCampaignCreation = () => {
    setIsCreatingCampaign(true);
    setCurrentStep(1);
    setCampaignName('');
  };
  
  const cancelCampaignCreation = () => {
    setIsCreatingCampaign(false);
    setCurrentStep(1);
  };
  
  // Render the campaign creation form based on the current step
  const renderCampaignForm = () => {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Megaphone className="mr-2 text-green-500" />
            {campaignName ? campaignName : 'New Campaign'}
          </h2>
          <button 
            onClick={cancelCampaignCreation}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Multi-step progress indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep ? 'bg-green-600' : 
                step < currentStep ? 'bg-gray-600' : 'bg-gray-700'
              }`}>
                {step}
              </div>
              <span className="text-xs mt-1 text-gray-400">
                {step === 1 ? 'Basics' : 
                 step === 2 ? 'Team' : 
                 step === 3 ? 'Creative' : 
                 step === 4 ? 'Rights' : 
                 step === 5 ? 'Selection' : 'Launch'}
              </span>
            </div>
          ))}
        </div>
        
        {/* Step 1: Campaign Basics */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Campaign Name</label>
              <input 
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white"
                placeholder="Enter campaign name..."
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Campaign Description</label>
              <textarea 
                className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24"
                placeholder="Describe your campaign..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Start Date</label>
                <div className="flex items-center bg-gray-700 border border-gray-600 rounded p-3">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <input 
                    type="date"
                    className="bg-transparent text-white w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">End Date</label>
                <div className="flex items-center bg-gray-700 border border-gray-600 rounded p-3">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <input 
                    type="date"
                    className="bg-transparent text-white w-full"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Location</label>
              <div className="flex items-center bg-gray-700 border border-gray-600 rounded p-3">
                <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                <input 
                  type="text"
                  className="bg-transparent text-white w-full"
                  placeholder="Enter primary location..."
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <button 
                onClick={cancelCampaignCreation}
                className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                disabled={!campaignName.trim()}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Team Requirements - Just a preview */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Roles
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-3 rounded border border-gray-600">
                  <div className="font-medium">Photographer</div>
                  <div className="text-sm text-gray-400">Primary content creator</div>
                </div>
                <div className="bg-gray-800 p-3 rounded border border-gray-600">
                  <div className="font-medium">Videographer</div>
                  <div className="text-sm text-gray-400">Motion content specialist</div>
                </div>
              </div>
              
              <button className="mt-4 flex items-center text-green-500 hover:text-green-400">
                <Plus className="w-4 h-4 mr-1" />
                Add another role
              </button>
            </div>
            
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Deliverables & Creative Direction - Just a preview */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Deliverables
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800 p-3 rounded border border-gray-600">
                  <div className="font-medium">High-res Photos</div>
                  <div className="text-sm text-gray-400">10-15 edited images</div>
                </div>
                <div className="bg-gray-800 p-3 rounded border border-gray-600">
                  <div className="font-medium">Social Cuts</div>
                  <div className="text-sm text-gray-400">3 short video clips</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded border border-gray-600">
                <label className="block text-gray-400 mb-2">Creative Direction</label>
                <textarea 
                  className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24"
                  placeholder="Provide creative direction for your team..."
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Simplified form - just showing first 3 steps */}
        {currentStep > 3 && (
          <div className="text-center p-8">
            <p className="text-gray-400 mb-4">Additional steps would be implemented based on the complete wireframes.</p>
            <button 
              onClick={cancelCampaignCreation}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
            >
              Complete Campaign Setup (Demo)
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {isCreatingCampaign ? (
        renderCampaignForm()
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
            <p className="text-gray-400">Manage your marketing and creative campaigns</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer">
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
    </div>
  );
};

export default CampaignGrid;
