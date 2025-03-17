
import React from 'react';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchToolbar from '@/components/workspace/common/SearchToolbar';

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
    <SearchToolbar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder="Search projects..."
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
      <Button className="bg-green-600 hover:bg-green-700" onClick={onCreateProject}>
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </Button>
    </SearchToolbar>
  );
};

export default ProjectToolbar;
