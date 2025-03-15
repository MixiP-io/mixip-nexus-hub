
import React from 'react';
import { Search, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortDirection: 'asc' | 'desc';
  handleSort: () => void;
  activeRole: string | null;
  setActiveRole: (role: string | null) => void;
  roles: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  sortDirection,
  handleSort,
  activeRole,
  setActiveRole,
  roles
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search creators..."
          className="pl-10 pr-4 py-2 w-full rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Button
        onClick={handleSort}
        variant="default"
        className="bg-gradient-to-b from-mixip-blue to-mixip-blue-dark text-white shadow-sm hover:from-mixip-blue-dark hover:to-mixip-blue-dark transition-all duration-200"
      >
        {sortDirection === 'asc' ? 
          <ArrowDownAZ className="w-4 h-4 mr-2" /> : 
          <ArrowUpAZ className="w-4 h-4 mr-2" />
        }
        Sort {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
      </Button>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={activeRole === null ? "default" : "outline"}
          size="sm"
          className={activeRole === null ? "bg-mixip-blue hover:bg-mixip-blue-dark text-white" : "text-white hover:text-white bg-gray-700/50 hover:bg-gray-700"}
          onClick={() => setActiveRole(null)}
        >
          All Roles
        </Button>
        {roles.map(role => (
          <Button
            key={role}
            variant={activeRole === role ? "default" : "outline"}
            size="sm"
            className={activeRole === role ? "bg-mixip-blue hover:bg-mixip-blue-dark text-white" : "text-white hover:text-white bg-gray-700/50 hover:bg-gray-700"}
            onClick={() => setActiveRole(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
