
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid, List, Plus } from 'lucide-react';
import SearchToolbar from '@/components/workspace/common/SearchToolbar';

interface DatasetsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onRequestCustomDataset: () => void;
}

const DatasetsToolbar: React.FC<DatasetsToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  onViewModeChange,
  onRequestCustomDataset
}) => {
  return (
    <SearchToolbar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder="Search datasets..."
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange('grid')}
            className={viewMode === 'grid' ? 'bg-gray-700' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange('list')}
            className={viewMode === 'list' ? 'bg-gray-700' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={onRequestCustomDataset}>
          <Plus className="mr-2 h-4 w-4" />
          Request Custom Dataset
        </Button>
      </div>
    </SearchToolbar>
  );
};

export default DatasetsToolbar;
