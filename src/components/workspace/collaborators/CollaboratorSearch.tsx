
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface CollaboratorSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: 'recent' | 'alphabetical' | 'size' | 'type';
  setSortOption: (option: 'recent' | 'alphabetical' | 'size' | 'type') => void;
}

const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search groups..."
          className="pl-12 pr-4 py-3 w-full rounded-xl bg-gray-800 border border-gray-700 focus:border-gray-600 focus:outline-none text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <ToggleGroup type="single" defaultValue="recent">
          <ToggleGroupItem 
            value="recent" 
            onClick={() => setSortOption('recent')}
            className="bg-gray-800 hover:bg-gray-700 data-[state=on]:bg-gray-700"
          >
            Recent
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="popular" 
            onClick={() => setSortOption('alphabetical')}
            className="bg-gray-800 hover:bg-gray-700 data-[state=on]:bg-gray-700"
          >
            Popular
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default CollaboratorSearch;
