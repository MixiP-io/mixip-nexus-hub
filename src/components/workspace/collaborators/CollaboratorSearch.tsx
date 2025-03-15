
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CollaboratorSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: any) => void;
  searchField: string;
  setSearchField: (field: any) => void;
}

const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  searchField,
  setSearchField
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search groups..."
          className="bg-gray-800 border-gray-700 pr-10 h-11 text-white"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex gap-3">
        <Select 
          value={searchField} 
          onValueChange={setSearchField}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-36 h-11">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="role">Role Type</SelectItem>
            <SelectItem value="skills">Speciality</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={sortOption} 
          onValueChange={setSortOption}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-48 h-11">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="recent">Recently Updated</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="size">Group Size</SelectItem>
            <SelectItem value="type">Group Type</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CollaboratorSearch;
