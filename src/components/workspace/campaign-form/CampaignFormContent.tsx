
import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { useCampaignForm } from './context/CampaignFormContext';
import FormProgress from './FormProgress';
import BasicsStep from './BasicsStep';
import TeamStep from './TeamStep';
import CreativeStep from './CreativeStep';
import RightsManagement from '../rights-management';
import DistributionStep from './DistributionStep';
import ReviewStep from './ReviewStep';

const CampaignFormContent: React.FC = () => {
  const { 
    formState, 
    currentStep, 
    onCancel,
    setCurrentStep
  } = useCampaignForm();

  // Render the appropriate step component based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicsStep
            onBack={onCancel}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <TeamStep
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <CreativeStep
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        );
      case 4:
        return (
          <RightsManagement 
            ownershipSplit={formState.ownershipSplit}
            setOwnershipSplit={(value) => useCampaignForm().updateFormState('ownershipSplit', value)}
            usageRights={formState.usageRights}
            onUsageRightsChange={useCampaignForm().handleUsageRightsChange}
            onBack={() => setCurrentStep(3)}
            onNext={() => setCurrentStep(5)}
          />
        );
      case 5:
        return (
          <DistributionStep
            onBack={() => setCurrentStep(4)}
            onNext={() => setCurrentStep(6)}
          />
        );
      case 6:
        return (
          <ReviewStep
            onBack={() => setCurrentStep(5)}
            onComplete={useCampaignForm().handleCompleteCampaign}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Megaphone className="mr-2 text-green-500" />
          {formState.campaignName ? formState.campaignName : 'New Campaign'}
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
    </>
  );
};

export default CampaignFormContent;
