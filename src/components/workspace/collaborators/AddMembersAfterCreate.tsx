
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Check, Search, UserPlus, Users, ArrowLeft } from 'lucide-react';
import { CollaboratorGroup, Collaborator } from './types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddMembersAfterCreateProps {
  group: CollaboratorGroup;
  onComplete: () => void;
  onSkip: () => void;
  onAddMembers: (groupId: number, memberIds: number[]) => void;
  findAvailableCollaborators: (groupId: number | null, query: string) => Collaborator[];
}

const AddMembersAfterCreate: React.FC<AddMembersAfterCreateProps> = ({
  group,
  onComplete,
  onSkip,
  onAddMembers,
  findAvailableCollaborators
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<string>('name');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  
  // Get available collaborators based on search
  const availableCollaborators = findAvailableCollaborators(group.id, searchQuery);
  
  // Toggle user selection
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (selectedUsers.length > 0) {
      onAddMembers(group.id, selectedUsers);
    }
    onComplete();
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-white">Add Members to "{group.name}"</h1>
          <p className="text-gray-400">Select team members to add to your newly created group</p>
        </div>
        <Button 
          variant="link" 
          className="text-blue-400 hover:text-blue-300"
          onClick={onSkip}
        >
          Skip this step
        </Button>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-grow">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collaborators..."
                className="bg-gray-900 border-gray-700 pr-10 text-white pl-4 py-6"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="w-48">
            <Select 
              value={searchField} 
              onValueChange={setSearchField}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white h-12">
                <SelectValue placeholder="Search by..." />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="role">Role Type</SelectItem>
                <SelectItem value="skills">Speciality</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto pr-1 mt-6">
          {availableCollaborators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableCollaborators.map(collaborator => (
                <div 
                  key={collaborator.id}
                  className={`p-4 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    selectedUsers.includes(collaborator.id) 
                      ? 'bg-blue-900/30 border border-blue-500' 
                      : 'bg-gray-900 hover:bg-gray-700 border border-transparent'
                  }`}
                  onClick={() => toggleUserSelection(collaborator.id)}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                      <AvatarFallback>{getInitials(collaborator.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{collaborator.name}</h4>
                      <div className="flex items-center text-sm">
                        <span className="text-blue-400">{collaborator.role}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-gray-400">{collaborator.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedUsers.includes(collaborator.id) && (
                    <Check className="h-5 w-5 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-1">No matching collaborators found</h3>
              <p className="text-gray-400">Try a different search term or criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onSkip}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Skip for now
        </Button>
        
        <Button 
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {selectedUsers.length > 0 
            ? `Add ${selectedUsers.length} ${selectedUsers.length === 1 ? 'Member' : 'Members'}`
            : 'Continue without adding members'}
        </Button>
      </div>
    </div>
  );
};

export default AddMembersAfterCreate;
