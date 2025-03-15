import { useState } from 'react';
import { CollaboratorGroup, GroupType, initialGroups, Collaborator, sampleCollaborators } from '../types';

type SortOption = 'recent' | 'alphabetical' | 'size' | 'type';
type ViewOption = 'all' | 'internal' | 'external' | 'agencies' | 'talent' | 'favorites';
type SearchField = 'name' | 'location' | 'role' | 'skills';

export const useCollaboratorGroups = () => {
  const [groups, setGroups] = useState<CollaboratorGroup[]>(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<SearchField>('name');
  const [activeView, setActiveView] = useState<ViewOption>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [lastCreatedGroupId, setLastCreatedGroupId] = useState<number | null>(null);

  const filteredGroups = groups.filter(group => {
    const matchesSearch = searchQuery === '' || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (activeView) {
      case 'all':
        return true;
      case 'internal':
        return group.type === 'Internal Team';
      case 'external':
        return group.type === 'External Network';
      case 'agencies':
        return group.type === 'Agencies';
      case 'talent':
        return group.type === 'Talent';
      case 'favorites':
        return group.isStarred === true;
      default:
        return true;
    }
  });

  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'size':
        return b.memberCount - a.memberCount;
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const addGroup = (newGroup: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    
    const groupToAdd: CollaboratorGroup = {
      ...newGroup,
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    
    setGroups([...groups, groupToAdd]);
    setIsCreatingGroup(false);
    setLastCreatedGroupId(newId);
  };

  const toggleStarGroup = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isStarred: !group.isStarred, updatedAt: new Date().toISOString() } 
        : group
    ));
  };

  const deleteGroup = (groupId: number) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const addMembersToGroup = (groupId: number, memberIds: number[]) => {
    setGroups(groups.map(group => {
      if (group.id !== groupId) return group;
      
      const newMembers = sampleCollaborators.filter(collaborator => 
        memberIds.includes(collaborator.id) && 
        !group.members.some(member => member.id === collaborator.id)
      );
      
      const updatedMembers = [...group.members, ...newMembers];
      
      return {
        ...group,
        members: updatedMembers,
        memberCount: updatedMembers.length,
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const findAvailableCollaborators = (groupId: number | null, query: string = '') => {
    const group = groupId ? groups.find(g => g.id === groupId) : null;
    const existingMemberIds = group ? group.members.map(m => m.id) : [];
    
    return sampleCollaborators.filter(collab => {
      if (existingMemberIds.includes(collab.id)) return false;
      
      if (!query) return true;
      
      const lowercaseQuery = query.toLowerCase();
      switch (searchField) {
        case 'name':
          return collab.name.toLowerCase().includes(lowercaseQuery);
        case 'location':
          return collab.location.toLowerCase().includes(lowercaseQuery);
        case 'role':
          return collab.role.toLowerCase().includes(lowercaseQuery);
        case 'skills':
          return collab.skills.some(skill => 
            skill.toLowerCase().includes(lowercaseQuery)
          );
        default:
          return (
            collab.name.toLowerCase().includes(lowercaseQuery) ||
            collab.location.toLowerCase().includes(lowercaseQuery) ||
            collab.role.toLowerCase().includes(lowercaseQuery) ||
            collab.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
          );
      }
    });
  };

  const clearLastCreatedGroupId = () => {
    setLastCreatedGroupId(null);
  };

  return {
    groups: sortedGroups,
    searchQuery,
    setSearchQuery,
    searchField,
    setSearchField,
    activeView,
    setActiveView,
    sortOption,
    setSortOption,
    isCreatingGroup,
    setIsCreatingGroup,
    addGroup,
    toggleStarGroup,
    deleteGroup,
    addMembersToGroup,
    findAvailableCollaborators,
    lastCreatedGroupId,
    clearLastCreatedGroupId
  };
};
