
import { useState } from 'react';

// Define the types for form state
export interface CampaignFormState {
  // Step 1 - Basic Information
  campaignName: string;
  campaignDesc: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  locationType: 'remote' | 'onsite' | 'anywhere';
  
  // Step 2 - Team Requirements
  selectedRoles: string[];
  
  // Step 3 - Creative Direction
  deliverables: {
    id: number;
    title: string;
    description: string;
  }[];
  creativeDirection: string;
  attachedFile: File | null;
  
  // Step 4 - Rights Management
  ownershipSplit: number;
  usageRights: {
    primaryCampaign: boolean;
    secondaryBrand: boolean;
    extendedMarketing: boolean;
    derivativeWorks: boolean;
    merchandising: boolean;
    publicity: boolean;
    socialMedia: boolean;
    aiTraining: boolean;
  };
  
  // Step 5 - Distribution
  distributionMethod: 'platform' | 'specific' | 'external';
  selectedUsers: string[];
  externalEmails: string[];
  distributionMessage: string;
}

export const initialFormState: CampaignFormState = {
  // Step 1 - Basic Information
  campaignName: '',
  campaignDesc: '',
  startDate: undefined,
  endDate: undefined,
  location: '',
  locationType: 'anywhere',
  
  // Step 2 - Team Requirements
  selectedRoles: [],
  
  // Step 3 - Creative Direction
  deliverables: [
    { id: 1, title: 'High-res Photos', description: '10-15 edited images' },
    { id: 2, title: 'Social Cuts', description: '3 short video clips' }
  ],
  creativeDirection: '',
  attachedFile: null,
  
  // Step 4 - Rights Management
  ownershipSplit: 50,
  usageRights: {
    primaryCampaign: true,
    secondaryBrand: false,
    extendedMarketing: false,
    derivativeWorks: false,
    merchandising: false,
    publicity: false,
    socialMedia: false,
    aiTraining: false
  },
  
  // Step 5 - Distribution
  distributionMethod: 'platform',
  selectedUsers: [],
  externalEmails: [],
  distributionMessage: ''
};

export function useCampaignFormState() {
  const [formState, setFormState] = useState<CampaignFormState>(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);

  // Utility function to update form state
  const updateFormState = <K extends keyof CampaignFormState>(
    key: K, 
    value: CampaignFormState[K]
  ) => {
    setFormState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Specialized handlers for specific form fields
  const handleLocationTypeChange = (type: 'remote' | 'onsite' | 'anywhere') => {
    updateFormState('locationType', type);
    if (type === 'remote') updateFormState('location', 'Remote');
    if (type === 'anywhere') updateFormState('location', 'Anywhere');
  };

  const handleUsageRightsChange = (key: keyof CampaignFormState['usageRights']) => {
    setFormState(prev => ({
      ...prev,
      usageRights: {
        ...prev.usageRights,
        [key]: !prev.usageRights[key]
      }
    }));
  };

  return {
    formState,
    currentStep,
    setCurrentStep,
    updateFormState,
    handleLocationTypeChange,
    handleUsageRightsChange,
  };
}
