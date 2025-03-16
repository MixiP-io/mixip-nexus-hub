
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import RightsManagement from '../../rights-management';
import { UsageRights } from '../../rights-management/types';
import { ProjectOwner } from '../../batch-uploader/utils/types/projectTypes';
import { useIsMobile } from '@/hooks/use-mobile';

interface RightsManagementTabProps {
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  usageRights: UsageRights;
  onUsageRightsChange: (key: keyof UsageRights) => void;
  setActiveTab: (tab: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  projectName: string;
  primaryOwner: ProjectOwner;
  additionalOwners: ProjectOwner[];
  setAdditionalOwners: (owners: ProjectOwner[]) => void;
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
  primaryOwner,
  additionalOwners,
  setAdditionalOwners
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
      <div className="space-y-4">
        <RightsManagement
          ownershipSplit={ownershipSplit}
          setOwnershipSplit={setOwnershipSplit}
          usageRights={usageRights}
          onUsageRightsChange={onUsageRightsChange}
          primaryOwner={primaryOwner}
          additionalOwners={additionalOwners}
          setAdditionalOwners={setAdditionalOwners}
          showOwnershipManagement={true}
          compact={isMobile}
        />
      </div>
      
      <DialogFooter className="sticky bottom-0 pt-4 flex justify-between bg-gray-800 border-t border-gray-700 mt-6 py-3">
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
