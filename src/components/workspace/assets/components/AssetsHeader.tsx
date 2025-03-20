
import React from 'react';
import { Search, GridIcon, List, Upload, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface AssetsHeaderProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleBatchUpload: () => void;
  handleBatchRights: () => void;
  projectName: string;
  folderName?: string;
}

const AssetsHeader: React.FC<AssetsHeaderProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  handleBatchUpload,
  handleBatchRights,
  projectName,
  folderName = 'Root'
}) => {
  return (
    <div className="p-6 pt-0 border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">
          {projectName}
          {folderName && folderName !== 'Root' && (
            <span className="text-gray-500 dark:text-gray-400"> / {folderName}</span>
          )}
        </h1>
        
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <GridIcon className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Button variant="outline" size="sm" onClick={handleBatchRights}>
              <Shield className="h-4 w-4 mr-2" />
              Manage Rights
            </Button>
            
            <Button size="sm" onClick={handleBatchUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Assets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsHeader;
