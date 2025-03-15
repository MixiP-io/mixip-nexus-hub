
import { useState } from 'react';
import { CollaboratorGroup, GroupType, initialGroups } from '../types';

type SortOption = 'recent' | 'alphabetical' | 'size' | 'type';
type ViewOption = 'all' | 'internal' | 'external' | 'agencies' | 'talent' | 'favorites';

export const useCollaboratorGroups = () => {
  const [groups, setGroups] = useState<CollaboratorGroup[]>(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<ViewOption>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  // Handle filtering groups by type/view
  const filteredGroups = groups.filter(group => {
    // First apply search filter
    const matchesSearch = searchQuery === '' || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Then apply view filter
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
  
  // Handle sorting groups
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

  // Function to add a new group
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
  };

  // Function to toggle starred status
  const toggleStarGroup = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isStarred: !group.isStarred, updatedAt: new Date().toISOString() } 
        : group
    ));
  };

  // Function to delete a group
  const deleteGroup = (groupId: number) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };
  
  // Function to add members to a group
  const addMembersToGroup = (groupId: number, memberIds: number[]) => {
    setGroups(groups.map(group => {
      if (group.id !== groupId) return group;
      
      // Get available users that match the IDs (in a real app, this would fetch from an API)
      const availableUsers = [
        { id: 101, name: 'Alex Johnson', role: 'Designer', avatar: '' },
        { id: 102, name: 'Sam Williams', role: 'Developer', avatar: '' },
        { id: 103, name: 'Jamie Smith', role: 'Marketing', avatar: '' },
        { id: 104, name: 'Taylor Brown', role: 'Project Manager', avatar: '' },
        { id: 105, name: 'Casey Garcia', role: 'Content Creator', avatar: '' },
        { id: 106, name: 'Jordan Lee', role: 'UI/UX Designer', avatar: '' },
      ];
      
      // Find the users to add
      const newMembers = availableUsers.filter(user => 
        memberIds.includes(user.id) && 
        !group.members.some(member => member.id === user.id)
      );
      
      // Update the group with new members
      const updatedMembers = [...group.members, ...newMembers];
      
      return {
        ...group,
        members: updatedMembers,
        memberCount: updatedMembers.length,
        updatedAt: new Date().toISOString()
      };
    }));
  };

  return {
    groups: sortedGroups,
    searchQuery,
    setSearchQuery,
    activeView,
    setActiveView,
    sortOption,
    setSortOption,
    isCreatingGroup,
    setIsCreatingGroup,
    addGroup,
    toggleStarGroup,
    deleteGroup,
    addMembersToGroup
  };
};
