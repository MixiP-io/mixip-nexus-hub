
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import RightsManagement from '../../rights-management';
import { UsageRights } from '../../rights-management/types';

interface RightsManagementTabProps {
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  usageRights: UsageRights;
  onUsageRightsChange: (key: keyof UsageRights) => void;
  setActiveTab: (tab: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  projectName: string;
}

const RightsManagementTab: React.FC<RightsManagementTabProps> = ({
  ownershipSplit,
  setOwnershipSplit,
  usageRights,
  onUsageRightsChange,
  setActiveTab,
  handleSubmit,
  isSubmitting,
  projectName,
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-4">
        <RightsManagement
          ownershipSplit={ownershipSplit}
          setOwnershipSplit={setOwnershipSplit}
          usageRights={usageRights}
          onUsageRightsChange={onUsageRightsChange}
        />
      </div>
      
      <DialogFooter className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setActiveTab("basic")}
          className="border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
        >
          Back
        </Button>
        
        <Button 
          type="submit" 
          disabled={!projectName.trim() || isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default RightsManagementTab;
