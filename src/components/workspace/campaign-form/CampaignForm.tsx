
import React, { useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import { toast } from 'sonner';
import BasicsStep from './BasicsStep';
import TeamStep from './TeamStep';
import CreativeStep from './CreativeStep';
import RightsManagement from '../RightsManagement';
import DistributionStep from './DistributionStep';
import ReviewStep from './ReviewStep';
import FormProgress from './FormProgress';

interface CampaignFormProps {
  isCreating: boolean;
  onCancel: () => void;
  onComplete: (campaignData: any) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ isCreating, onCancel, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [campaignDesc, setCampaignDesc] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState<'remote' | 'onsite' | 'anywhere'>('anywhere');
  
  // Step 2 - Team Requirements
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  
  // Step 3 - Creative Direction
  const [deliverables, setDeliverables] = useState([
    { id: 1, title: 'High-res Photos', description: '10-15 edited images' },
    { id: 2, title: 'Social Cuts', description: '3 short video clips' }
  ]);
  const [creativeDirection, setCreativeDirection] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  
  // Step 4 - Rights Management
  const [ownershipSplit, setOwnershipSplit] = useState(50);
  const [usageRights, setUsageRights] = useState({
    primaryCampaign: true,
    secondaryBrand: false,
    extendedMarketing: false,
    derivativeWorks: false,
    merchandising: false,
    publicity: false,
    socialMedia: false,
    aiTraining: false
  });
  
  // Step 5 - Distribution
  const [distributionMethod, setDistributionMethod] = useState<'platform' | 'specific' | 'external'>('platform');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [externalEmails, setExternalEmails] = useState<string[]>([]);
  const [distributionMessage, setDistributionMessage] = useState('');

  const handleLocationTypeChange = (type: 'remote' | 'onsite' | 'anywhere') => {
    setLocationType(type);
    if (type === 'remote') setLocation('Remote');
    if (type === 'anywhere') setLocation('Anywhere');
  };

  const handleUsageRightsChange = (key: keyof typeof usageRights) => {
    setUsageRights(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCompleteCampaign = () => {
    // Prepare campaign data
    const campaignData = {
      title: campaignName,
      description: campaignDesc,
      startDate,
      endDate,
      location,
      locationType,
      roles: selectedRoles,
      deliverables,
      creativeDirection,
      // In a real application, you would handle file upload to storage
      attachedFileName: attachedFile?.name,
      // Rights management data
      ownershipSplit,
      usageRights,
      // Distribution data
      distributionMethod,
      selectedUsers,
      externalEmails,
      distributionMessage,
      status: 'Draft',
      image: '/placeholder.svg'
    };
    
    onComplete(campaignData);
    toast.success('Campaign created successfully!');
  };

  // Render the appropriate step component based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicsStep
            campaignName={campaignName}
            setCampaignName={setCampaignName}
            campaignDesc={campaignDesc}
            setCampaignDesc={setCampaignDesc}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            location={location}
            setLocation={setLocation}
            locationType={locationType}
            handleLocationTypeChange={handleLocationTypeChange}
            onBack={onCancel}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <TeamStep
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <CreativeStep
            deliverables={deliverables}
            setDeliverables={setDeliverables}
            creativeDirection={creativeDirection}
            setCreativeDirection={setCreativeDirection}
            attachedFile={attachedFile}
            setAttachedFile={setAttachedFile}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        );
      case 4:
        return (
          <RightsManagement 
            ownershipSplit={ownershipSplit} 
            setOwnershipSplit={setOwnershipSplit}
            usageRights={usageRights}
            onUsageRightsChange={handleUsageRightsChange}
            onBack={() => setCurrentStep(3)}
            onNext={() => setCurrentStep(5)}
          />
        );
      case 5:
        return (
          <DistributionStep
            distributionMethod={distributionMethod}
            setDistributionMethod={setDistributionMethod}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            externalEmails={externalEmails}
            setExternalEmails={setExternalEmails}
            distributionMessage={distributionMessage}
            setDistributionMessage={setDistributionMessage}
            onBack={() => setCurrentStep(4)}
            onNext={() => setCurrentStep(6)}
          />
        );
      case 6:
        return (
          <ReviewStep
            campaignName={campaignName}
            startDate={startDate}
            endDate={endDate}
            location={location}
            selectedRoles={selectedRoles}
            deliverables={deliverables}
            ownershipSplit={ownershipSplit}
            usageRights={usageRights}
            onBack={() => setCurrentStep(5)}
            onComplete={handleCompleteCampaign}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Megaphone className="mr-2 text-green-500" />
          {campaignName ? campaignName : 'New Campaign'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <FormProgress currentStep={currentStep} />
      
      {renderStep()}
    </div>
  );
};

export default CampaignForm;
