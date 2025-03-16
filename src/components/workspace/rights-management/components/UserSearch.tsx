
import React from 'react';
import { Search, X, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredUsers: User[];
  onAddUser: (user: User) => void;
  onCancel: () => void;
  compact?: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchQuery,
  setSearchQuery,
  filteredUsers,
  onAddUser,
  onCancel,
  compact = false
}) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search users by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9 bg-gray-700 border-gray-600 text-white"
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {filteredUsers.length > 0 ? (
        <div className={`max-h-${compact ? '24' : '32'} overflow-y-auto space-y-2`}>
          {filteredUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center">
                <div className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} bg-gray-600 rounded-full flex items-center justify-center text-white font-medium mr-2`}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-white`}>{user.name}</p>
                  {!compact && <p className="text-xs text-gray-400">{user.email}</p>}
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onAddUser(user)}
                className="text-green-500 hover:text-white hover:bg-green-600"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-2 text-gray-400 text-sm">
          No users found matching "{searchQuery}"
        </div>
      ) : null}
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={onCancel} className="text-gray-300 border-gray-600">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UserSearch;
