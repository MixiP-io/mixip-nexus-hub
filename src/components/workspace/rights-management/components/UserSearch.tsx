
import React from 'react';
import { Search, Trash2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface User {
  userId: string;
  name: string;
  email: string;
}

interface UserSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredUsers: User[];
  onAddUser: (user: User) => void;
  onCancel: () => void;
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchQuery,
  setSearchQuery,
  filteredUsers,
  onAddUser,
  onCancel
}) => {
  return (
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
          onClick={onCancel}
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
              onClick={() => onAddUser(user)}
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
  );
};

export default UserSearch;
