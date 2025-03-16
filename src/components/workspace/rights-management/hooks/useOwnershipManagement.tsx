
import { useState } from 'react';
import { ProjectOwner } from '../../batch-uploader/utils/types/projectTypes';

// Define a consistent User type that matches our needs
interface User {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UseOwnershipManagementProps {
  primaryOwner: ProjectOwner;
  additionalOwners: ProjectOwner[];
  setAdditionalOwners: (owners: ProjectOwner[]) => void;
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
}

export const useOwnershipManagement = ({
  primaryOwner,
  additionalOwners,
  setAdditionalOwners,
  ownershipSplit,
  setOwnershipSplit
}: UseOwnershipManagementProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Calculate remaining ownership percentages
  const additionalOwnersTotal = additionalOwners.reduce(
    (sum, owner) => sum + owner.royaltyPercentage, 
    0
  );
  
  const primaryOwnerPercentage = 100 - additionalOwnersTotal;
  
  // Sample users for demo - updated to match the User interface
  const sampleUsers: User[] = [
    { userId: 'user2', name: 'Jane Smith', email: 'jane@example.com' },
    { userId: 'user3', name: 'Alex Johnson', email: 'alex@example.com' },
    { userId: 'user4', name: 'Maria Garcia', email: 'maria@example.com' },
    { userId: 'user5', name: 'Raj Patel', email: 'raj@example.com' },
  ];
  
  const filteredUsers = sampleUsers.filter(
    user => 
      !additionalOwners.some(owner => owner.userId === user.userId) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
  };

  // Updated addOwner to use the same User type
  const addOwner = (user: User) => {
    // Default to adding 5% ownership
    const newOwnerPercentage = 5;
    
    // Adjust primary owner's percentage
    const updatedPrimaryPercentage = primaryOwnerPercentage - newOwnerPercentage;
    
    if (updatedPrimaryPercentage < 0) {
      return; // Prevent adding if it would make primary owner's percentage negative
    }
    
    setOwnershipSplit(updatedPrimaryPercentage);
    
    // Add the new owner
    const newOwner: ProjectOwner = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      royaltyPercentage: newOwnerPercentage
    };
    
    setAdditionalOwners([...additionalOwners, newOwner]);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const removeOwner = (index: number) => {
    const ownerToRemove = additionalOwners[index];
    const updatedOwners = [...additionalOwners];
    updatedOwners.splice(index, 1);
    
    // Return percentage to the primary owner
    setOwnershipSplit(primaryOwnerPercentage + ownerToRemove.royaltyPercentage);
    
    setAdditionalOwners(updatedOwners);
  };

  const updateOwnerPercentage = (index: number, percentage: number) => {
    const currentPercentage = additionalOwners[index].royaltyPercentage;
    const difference = percentage - currentPercentage;
    
    // Check if primary owner would have less than 0%
    if (primaryOwnerPercentage - difference < 0) {
      return;
    }
    
    const updatedOwners = [...additionalOwners];
    updatedOwners[index].royaltyPercentage = percentage;
    
    // Update primary owner percentage accordingly
    setOwnershipSplit(primaryOwnerPercentage - difference);
    
    setAdditionalOwners(updatedOwners);
  };

  return {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    toggleSearch,
    filteredUsers,
    addOwner,
    removeOwner,
    updateOwnerPercentage,
    primaryOwnerPercentage,
  };
};
