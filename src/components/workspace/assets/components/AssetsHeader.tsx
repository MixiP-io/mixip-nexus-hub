
import React from 'react';
import { Search, LayoutGrid, List, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <h2 className="text-2xl font-semibold">{projectName}</h2>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search assets..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
      </div>
    </div>
  );
};

export default AssetsHeader;
