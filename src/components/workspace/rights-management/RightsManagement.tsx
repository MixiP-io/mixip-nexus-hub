
import React from 'react';
import OwnershipStructure from './OwnershipStructure';
import UsageRightsMatrix from './UsageRightsMatrix';
import { Button } from '@/components/ui/button';
import { UsageRights } from './types';

interface RightsManagementProps {
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  usageRights: UsageRights;
  onUsageRightsChange: (key: keyof UsageRights) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const RightsManagement: React.FC<RightsManagementProps> = ({
  ownershipSplit,
  setOwnershipSplit,
  usageRights,
  onUsageRightsChange,
  onBack,
  onNext
}) => {
  return (
    <div className="space-y-6">
      <OwnershipStructure 
        ownershipSplit={ownershipSplit}
        setOwnershipSplit={setOwnershipSplit}
      />
      
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
            >
              Back
            </Button>
          )}
          {onNext && (
            <Button 
              onClick={onNext}
              variant="default"
              className="bg-green-600 hover:bg-green-700"
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
