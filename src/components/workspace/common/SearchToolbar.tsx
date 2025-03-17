
import React, { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  children?: ReactNode;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
  children
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="relative flex-1 md:min-w-[300px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default SearchToolbar;
