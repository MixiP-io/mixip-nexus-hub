
import React, { useState } from 'react';
import { Plus, Trash2, UserPlus, DollarSign, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ProjectOwner } from '../batch-uploader/utils/types/projectTypes';
import OwnershipStructure from './OwnershipStructure';

interface OwnershipManagementProps {
  primaryOwner: ProjectOwner;
  additionalOwners: ProjectOwner[];
  setAdditionalOwners: (owners: ProjectOwner[]) => void;
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
}

const OwnershipManagement: React.FC<OwnershipManagementProps> = ({
  primaryOwner,
  additionalOwners,
  setAdditionalOwners,
  ownershipSplit,
  setOwnershipSplit
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Calculate remaining ownership percentages
  const additionalOwnersTotal = additionalOwners.reduce(
    (sum, owner) => sum + owner.royaltyPercentage, 
    0
  );
  
  const primaryOwnerPercentage = 100 - additionalOwnersTotal;
  
  // Sample users for demo - in a real app, this would come from an API
  const sampleUsers = [
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

  const addOwner = (user: { userId: string; name: string; email: string }) => {
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

  return (
    <div className="space-y-6">
      <OwnershipStructure 
        ownershipSplit={ownershipSplit}
        setOwnershipSplit={setOwnershipSplit}
        primaryOwnerName={primaryOwner.name}
        additionalOwnersCount={additionalOwners.length}
      />
      
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="font-medium text-white mb-4 flex items-center">
          <UserPlus className="w-5 h-5 mr-2" />
          Project Owners
        </h3>
        
        <div className="space-y-3">
          {/* Primary Owner (Creator) */}
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                {primaryOwner.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{primaryOwner.name}</p>
                <p className="text-xs text-gray-400">{primaryOwner.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-white font-medium">{primaryOwnerPercentage}%</span>
              <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded text-white">Creator</span>
            </div>
          </div>
          
          {/* Additional Owners */}
          {additionalOwners.map((owner, index) => (
            <div key={owner.userId} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                  {owner.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{owner.name}</p>
                  <p className="text-xs text-gray-400">{owner.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3">
                  <input 
                    type="number" 
                    min="1" 
                    max="99" 
                    value={owner.royaltyPercentage} 
                    onChange={(e) => updateOwnerPercentage(index, parseInt(e.target.value))}
                    className="w-16 bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-center" 
                  />
                  <span className="text-white ml-1">%</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeOwner(index)}
                  className="text-gray-400 hover:text-white hover:bg-gray-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {/* Add Owner Button or Search */}
          {!isSearchOpen ? (
            <Button 
              variant="outline" 
              onClick={toggleSearch}
              className="w-full border-dashed border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Owner
            </Button>
          ) : (
            <div className="p-3 bg-gray-700 rounded-lg space-y-3">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by name or email..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-600 border-gray-500 pl-9 text-white"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSearch}
                  className="ml-2 text-gray-400 hover:text-white hover:bg-gray-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              {filteredUsers.length > 0 ? (
                <div className="max-h-48 overflow-y-auto">
                  {filteredUsers.map(user => (
                    <div 
                      key={user.userId} 
                      className="flex items-center justify-between p-2 hover:bg-gray-600 rounded cursor-pointer"
                      onClick={() => addOwner(user)}
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium mr-2 text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2 text-gray-400 text-sm">
                  No users found. Try a different search.
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                <p className="text-xs text-gray-400">Can't find who you're looking for?</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="link" 
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                      >
                        Invite via email
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-700">
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
