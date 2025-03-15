
import React from 'react';
import { CollaboratorGroup } from '../types';
import CollaboratorSearch from '../CollaboratorSearch';
import CollaboratorTabs from '../CollaboratorTabs';
import GroupList from '../GroupList';

// Import ViewOption type from the CollaboratorTabs component
type ViewOption = 'all' | 'internal' | 'external' | 'agencies' | 'talent' | 'favorites';

interface GroupListViewProps {
  groups: CollaboratorGroup[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchField: string;
  setSearchField: (field: any) => void;
  activeView: ViewOption; // Updated type from string to ViewOption
  setActiveView: (view: ViewOption) => void; // Updated type from any to ViewOption
  sortOption: string;
  setSortOption: (option: any) => void;
  onStartGroupCreation: () => void;
  onViewGroup: (groupId: number) => void;
  onToggleStar: (groupId: number) => void;
}

const GroupListView: React.FC<GroupListViewProps> = ({
  groups,
  searchQuery,
  setSearchQuery,
  searchField,
  setSearchField,
  activeView,
  setActiveView,
  sortOption,
  setSortOption,
  onStartGroupCreation,
  onViewGroup,
  onToggleStar
}) => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-white">Collaborators</h1>
        <p className="text-gray-400">Organize your professional network into meaningful groups</p>
      </div>
      
      <CollaboratorTabs
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      
      <CollaboratorSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchField={searchField}
        setSearchField={setSearchField}
      />
      
      <GroupList 
        groups={groups}
        onStartGroupCreation={onStartGroupCreation}
        onViewGroup={onViewGroup}
        onToggleStar={onToggleStar}
      />
    </div>
  );
};

export default GroupListView;
