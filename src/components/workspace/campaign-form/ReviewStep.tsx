
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface UsageRights {
  primaryCampaign: boolean;
  secondaryBrand: boolean;
  extendedMarketing: boolean;
  derivativeWorks: boolean;
  merchandising: boolean;
  publicity: boolean;
  socialMedia: boolean;
  aiTraining: boolean;
}

interface Deliverable {
  id: number;
  title: string;
  description: string;
}

interface ReviewStepProps {
  campaignName: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  selectedRoles: string[];
  deliverables: Deliverable[];
  ownershipSplit: number;
  usageRights: UsageRights;
  onBack: () => void;
  onComplete: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  campaignName,
  startDate,
  endDate,
  location,
  selectedRoles,
  deliverables,
  ownershipSplit,
  usageRights,
  onBack,
  onComplete
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-4">Campaign Summary</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-800 p-3 rounded">
            <h4 className="text-sm text-gray-400">Campaign Details</h4>
            <p className="font-medium">{campaignName}</p>
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
                <span key={role} className="px-2 py-1 bg-gray-700 rounded text-sm">
                  {role}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 p-3 rounded">
            <h4 className="text-sm text-gray-400">Deliverables</h4>
            <ul className="mt-1 space-y-1">
              {deliverables.map(d => (
                <li key={d.id} className="text-sm">{d.title}: {d.description}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 p-3 rounded">
            <h4 className="text-sm text-gray-400">Rights Management</h4>
            <p className="text-sm mt-1">Ownership Split: {ownershipSplit}% Brand / {100 - ownershipSplit}% Creators</p>
            <div className="mt-2">
              <h5 className="text-xs text-gray-400">Enabled Rights:</h5>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.entries(usageRights)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <span key={key} className="px-2 py-1 bg-gray-700 rounded text-sm">
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
