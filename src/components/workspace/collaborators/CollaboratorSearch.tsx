
import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import SearchToolbar from '@/components/workspace/common/SearchToolbar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <SearchToolbar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder="Search groups..."
    >
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
    </SearchToolbar>
  );
};

export default CollaboratorSearch;
