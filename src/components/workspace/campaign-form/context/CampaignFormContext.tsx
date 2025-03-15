
import React, { createContext, useContext, ReactNode } from 'react';
import { useCampaignFormState, CampaignFormState } from '../hooks/useCampaignFormState';
import { ProjectOwner } from '../../batch-uploader/utils/types/projectTypes';

interface CampaignFormContextType {
  formState: CampaignFormState;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateFormState: <K extends keyof CampaignFormState>(key: K, value: CampaignFormState[K]) => void;
  handleLocationTypeChange: (type: 'remote' | 'onsite' | 'anywhere') => void;
  handleUsageRightsChange: (key: keyof CampaignFormState['usageRights']) => void;
  setAdditionalOwners: (owners: ProjectOwner[]) => void;
  handleCompleteCampaign: () => void;
  onCancel: () => void;
}

const CampaignFormContext = createContext<CampaignFormContextType | undefined>(undefined);

interface CampaignFormProviderProps {
  children: ReactNode;
  onCancel: () => void;
  onComplete: (campaignData: any) => void;
}

export const CampaignFormProvider: React.FC<CampaignFormProviderProps> = ({ 
  children, 
  onCancel,
  onComplete
}) => {
  const { 
    formState, 
    currentStep, 
    setCurrentStep, 
    updateFormState,
    handleLocationTypeChange,
    handleUsageRightsChange,
    setAdditionalOwners
  } = useCampaignFormState();
  
  const handleCompleteCampaign = () => {
    // Prepare campaign data from formState
    const campaignData = {
      title: formState.campaignName,
      description: formState.campaignDesc,
      startDate: formState.startDate,
      endDate: formState.endDate,
      location: formState.location,
      locationType: formState.locationType,
      roles: formState.selectedRoles,
      deliverables: formState.deliverables,
      creativeDirection: formState.creativeDirection,
      // In a real application, you would handle file upload to storage
      attachedFileName: formState.attachedFile?.name,
      // Rights management data
      ownershipSplit: formState.ownershipSplit,
      usageRights: formState.usageRights,
      primaryOwner: formState.primaryOwner,
      additionalOwners: formState.additionalOwners,
      // Distribution data
      distributionMethod: formState.distributionMethod,
      selectedUsers: formState.selectedUsers,
      externalEmails: formState.externalEmails,
      distributionMessage: formState.distributionMessage,
      status: 'Draft',
      image: '/placeholder.svg'
    };
    
    onComplete(campaignData);
  };

  return (
    <CampaignFormContext.Provider
      value={{
        formState,
        currentStep,
        setCurrentStep,
        updateFormState,
        handleLocationTypeChange,
        handleUsageRightsChange,
        setAdditionalOwners,
        handleCompleteCampaign,
        onCancel
      }}
    >
      {children}
    </CampaignFormContext.Provider>
  );
};

export const useCampaignForm = () => {
  const context = useContext(CampaignFormContext);
  if (context === undefined) {
    throw new Error('useCampaignForm must be used within a CampaignFormProvider');
  }
  return context;
};
