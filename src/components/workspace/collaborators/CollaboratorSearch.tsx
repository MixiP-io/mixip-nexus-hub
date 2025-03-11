
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search groups..."
          className="pl-10 pr-4 py-2 w-full rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          className={sortOption === 'recent' ? 'bg-gray-700' : ''}
          onClick={() => setSortOption('recent')}
        >
          Recent
        </Button>
        <Button
          variant="outline"
          className={sortOption === 'alphabetical' ? 'bg-gray-700' : ''}
          onClick={() => setSortOption('alphabetical')}
        >
          A-Z
        </Button>
        <Button
          variant="outline"
          className={sortOption === 'size' ? 'bg-gray-700' : ''}
          onClick={() => setSortOption('size')}
        >
          Size
        </Button>
        <Button
          variant="outline"
          className={sortOption === 'type' ? 'bg-gray-700' : ''}
          onClick={() => setSortOption('type')}
        >
          Type
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default CollaboratorSearch;
