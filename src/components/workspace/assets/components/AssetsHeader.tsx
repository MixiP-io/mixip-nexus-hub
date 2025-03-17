
import React from 'react';
import { LayoutGrid, List, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/workspace/SectionHeader';
import SearchToolbar from '@/components/workspace/common/SearchToolbar';

interface AssetsHeaderProps {
  projectName: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  handleBatchRights: () => void;
  handleBatchUpload: () => void;
}

const AssetsHeader: React.FC<AssetsHeaderProps> = ({
  projectName,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  handleBatchRights,
  handleBatchUpload
}) => {
  return (
    <>
      <SectionHeader 
        title={projectName}
        description="Manage and organize your media assets"
      />
      
      <SearchToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search assets..."
      >
        <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-gray-700' : ''}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-gray-700' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="outline"
          className="border-gray-700"
          onClick={handleBatchRights}
        >
          <User className="mr-2 h-4 w-4" />
          Manage Rights
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleBatchUpload}>
          <Plus className="mr-2 h-4 w-4" />
          Add Assets
        </Button>
      </SearchToolbar>
    </>
  );
};

export default AssetsHeader;
