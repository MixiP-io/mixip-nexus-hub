
import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { CampaignFormProvider } from './context/CampaignFormContext';
import CampaignFormContent from './CampaignFormContent';

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
