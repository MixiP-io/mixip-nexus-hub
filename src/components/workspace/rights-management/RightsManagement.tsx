
import React from 'react';
import OwnershipStructure from './OwnershipStructure';
import OwnershipManagement from './OwnershipManagement';
import UsageRightsMatrix from './UsageRightsMatrix';
import { Button } from '@/components/ui/button';
import { UsageRights } from './types';
import { ProjectOwner } from '../batch-uploader/utils/types/projectTypes';

interface RightsManagementProps {
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  usageRights: UsageRights;
  onUsageRightsChange: (key: keyof UsageRights) => void;
  onBack?: () => void;
  onNext?: () => void;
  primaryOwner?: ProjectOwner;
  additionalOwners?: ProjectOwner[];
  setAdditionalOwners?: (owners: ProjectOwner[]) => void;
  showOwnershipManagement?: boolean;
}

const RightsManagement: React.FC<RightsManagementProps> = ({
  ownershipSplit,
  setOwnershipSplit,
  usageRights,
  onUsageRightsChange,
  onBack,
  onNext,
  primaryOwner,
  additionalOwners = [],
  setAdditionalOwners,
  showOwnershipManagement = false
}) => {
  // Default primary owner if none provided
  const defaultPrimaryOwner: ProjectOwner = primaryOwner || {
    userId: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    royaltyPercentage: ownershipSplit
  };

  return (
    <div className="space-y-6">
      {showOwnershipManagement && setAdditionalOwners ? (
        <OwnershipManagement 
          primaryOwner={defaultPrimaryOwner}
          additionalOwners={additionalOwners}
          setAdditionalOwners={setAdditionalOwners}
          ownershipSplit={ownershipSplit}
          setOwnershipSplit={setOwnershipSplit}
        />
      ) : (
        <OwnershipStructure 
          ownershipSplit={ownershipSplit}
          setOwnershipSplit={setOwnershipSplit}
          primaryOwnerName={primaryOwner?.name}
          additionalOwnersCount={additionalOwners.length}
        />
      )}
      
      <UsageRightsMatrix 
        usageRights={usageRights}
        onUsageRightsChange={onUsageRightsChange}
      />
      
      {(onBack || onNext) && (
        <div className="flex justify-between pt-4">
          {onBack && (
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              Back
            </Button>
          )}
          {onNext && (
            <Button 
              onClick={onNext}
              variant="default"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RightsManagement;
