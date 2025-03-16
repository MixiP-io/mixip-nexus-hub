
import React from 'react';
import { Plus, UserPlus, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectOwner } from '../batch-uploader/utils/types/projectTypes';
import OwnershipStructure from './OwnershipStructure';
import OwnerCard from './components/OwnerCard';
import UserSearch from './components/UserSearch';
import { useOwnershipManagement } from './hooks/useOwnershipManagement';

interface OwnershipManagementProps {
  primaryOwner: ProjectOwner;
  additionalOwners: ProjectOwner[];
  setAdditionalOwners: (owners: ProjectOwner[]) => void;
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  compact?: boolean;
}

const OwnershipManagement: React.FC<OwnershipManagementProps> = ({
  primaryOwner,
  additionalOwners,
  setAdditionalOwners,
  ownershipSplit,
  setOwnershipSplit,
  compact = false
}) => {
  const {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    toggleSearch,
    filteredUsers,
    addOwner,
    removeOwner,
    updateOwnerPercentage,
    primaryOwnerPercentage,
  } = useOwnershipManagement({
    primaryOwner,
    additionalOwners,
    setAdditionalOwners,
    ownershipSplit,
    setOwnershipSplit
  });

  return (
    <div className={`space-y-${compact ? '3' : '6'}`}>
      <OwnershipStructure 
        ownershipSplit={ownershipSplit}
        setOwnershipSplit={setOwnershipSplit}
        primaryOwnerName={primaryOwner.name}
        additionalOwnersCount={additionalOwners.length}
        compact={compact}
      />
      
      <div className={`bg-gray-800 p-${compact ? '3' : '4'} rounded-lg border border-gray-700`}>
        <h3 className="font-medium text-white mb-3 flex items-center">
          <UserPlus className="w-5 h-5 mr-2" />
          Project Owners
        </h3>
        
        <div className={`space-y-${compact ? '2' : '3'}`}>
          {/* Primary Owner (Creator) */}
          <OwnerCard 
            owner={{...primaryOwner, royaltyPercentage: primaryOwnerPercentage}} 
            isPrimary={true} 
            compact={compact}
          />
          
          {/* Additional Owners */}
          {additionalOwners.map((owner, index) => (
            <OwnerCard 
              key={owner.userId} 
              owner={owner}
              onRemove={() => removeOwner(index)}
              onPercentageChange={(percentage) => updateOwnerPercentage(index, percentage)}
              compact={compact}
            />
          ))}
          
          {/* Add Owner Button or Search */}
          {!isSearchOpen ? (
            <Button 
              variant="outline" 
              onClick={toggleSearch}
              className="w-full border-dashed border-gray-600 text-white hover:text-white hover:bg-gray-700 bg-gray-700/50 font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Owner
            </Button>
          ) : (
            <UserSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredUsers={filteredUsers}
              onAddUser={addOwner}
              onCancel={toggleSearch}
              compact={compact}
            />
          )}
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300">Total</p>
            <p className="text-sm font-medium text-white">100%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipManagement;
