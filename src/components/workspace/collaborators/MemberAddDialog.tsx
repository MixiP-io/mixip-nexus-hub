
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Check, Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Example users data - in a real application, this would come from an API
const availableUsers = [
  { id: 101, name: 'Alex Johnson', role: 'Designer', avatar: '' },
  { id: 102, name: 'Sam Williams', role: 'Developer', avatar: '' },
  { id: 103, name: 'Jamie Smith', role: 'Marketing', avatar: '' },
  { id: 104, name: 'Taylor Brown', role: 'Project Manager', avatar: '' },
  { id: 105, name: 'Casey Garcia', role: 'Content Creator', avatar: '' },
  { id: 106, name: 'Jordan Lee', role: 'UI/UX Designer', avatar: '' },
];

interface MemberAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMembers: (selectedUserIds: number[]) => void;
  groupId: number;
  existingMemberIds: number[];
}

const MemberAddDialog: React.FC<MemberAddDialogProps> = ({
  isOpen,
  onClose,
  onAddMembers,
  groupId,
  existingMemberIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  
  // Filter users based on search query and exclude existing members
  const filteredUsers = availableUsers
    .filter(user => !existingMemberIds.includes(user.id))
    .filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Toggle user selection
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  // Handle submission
  const handleSubmit = () => {
    onAddMembers(selectedUsers);
    setSelectedUsers([]);
    setSearchQuery('');
    onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Members to Group</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="bg-gray-800 border-gray-700 pr-10 text-white"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="max-h-[300px] overflow-y-auto pr-1">
          {filteredUsers.length > 0 ? (
            <div className="space-y-2">
              {filteredUsers.map(user => (
                <div 
                  key={user.id}
                  className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    selectedUsers.includes(user.id) 
                      ? 'bg-blue-900/30 border border-blue-500' 
                      : 'bg-gray-800 hover:bg-gray-700 border border-transparent'
                  }`}
                  onClick={() => toggleUserSelection(user.id)}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-400">{user.role}</p>
                    </div>
                  </div>
                  
                  {selectedUsers.includes(user.id) && (
                    <Check className="h-5 w-5 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <UserPlus className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>No matching users found</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
          <Button 
            type="button" 
            variant="default" 
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Cancel
          </Button>
          <Button 
            type="button"
            onClick={handleSubmit}
            disabled={selectedUsers.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add {selectedUsers.length} {selectedUsers.length === 1 ? 'Member' : 'Members'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberAddDialog;
