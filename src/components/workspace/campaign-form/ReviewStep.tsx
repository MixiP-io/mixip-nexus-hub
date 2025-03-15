
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useCampaignForm } from './context/CampaignFormContext';

interface ReviewStepProps {
  onBack: () => void;
  onComplete: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ onBack, onComplete }) => {
  const { formState } = useCampaignForm();
  const {
    campaignName,
    startDate,
    endDate,
    location,
    selectedRoles,
    deliverables,
    ownershipSplit,
    usageRights
  } = formState;

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-4">Campaign Summary</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-800 p-3 rounded">
            <h4 className="text-sm text-gray-400">Campaign Details</h4>
            <p className="font-medium text-white">{campaignName}</p>
            <p className="text-sm text-gray-300">
              {startDate && endDate 
                ? `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}` 
                : "Dates not set"}
            </p>
            <p className="text-sm text-gray-300">{location}</p>
          </div>
          
          <div className="bg-gray-800 p-3 rounded">
            <h4 className="text-sm text-gray-400">Team Roles</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedRoles.map(role => (
                <span key={role} className="px-2 py-1 bg-gray-700 rounded text-sm text-white">
                  {role}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 p-3 rounded">
            <h4 className="text-sm text-gray-400">Deliverables</h4>
            <ul className="mt-1 space-y-1">
              {deliverables.map(d => (
                <li key={d.id} className="text-sm text-white">{d.title}: {d.description}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 p-3 rounded">
            <h4 className="text-sm text-gray-400">Rights Management</h4>
            <p className="text-sm mt-1 text-white">Ownership Split: {ownershipSplit}% Brand / {100 - ownershipSplit}% Creators</p>
            <div className="mt-2">
              <h5 className="text-xs text-gray-400">Enabled Rights:</h5>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.entries(usageRights)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <span key={key} className="px-2 py-1 bg-gray-700 rounded text-sm text-white">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="text-white hover:text-white bg-gray-700/50 hover:bg-gray-700 font-medium"
        >
          Back
        </Button>
        <Button 
          onClick={onComplete}
          variant="default"
          className="bg-green-600 hover:bg-green-700"
        >
          Launch Campaign
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
