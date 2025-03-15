
import React from 'react';
import { Search, LayoutGrid, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProjectToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onCreateProject: () => void;
}

const ProjectToolbar: React.FC<ProjectToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onCreateProject
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
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
        <Button className="bg-green-600 hover:bg-green-700" onClick={onCreateProject}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectToolbar;
