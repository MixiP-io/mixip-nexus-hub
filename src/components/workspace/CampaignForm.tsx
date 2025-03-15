
import React from 'react';
import { CampaignFormProvider } from './campaign-form/context/CampaignFormContext';
import CampaignFormContent from './campaign-form/CampaignFormContent';

interface CampaignFormProps {
  isCreating: boolean;
  onCancel: () => void;
  onComplete: (campaignData: any) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ 
  isCreating, 
  onCancel, 
  onComplete 
}) => {
  return (
    <CampaignFormProvider onCancel={onCancel} onComplete={onComplete}>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full mb-8">
        <CampaignFormContent />
      </div>
    </CampaignFormProvider>
  );
};

export default CampaignForm;
