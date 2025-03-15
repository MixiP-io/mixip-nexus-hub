
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useCollaboratorGroups } from './hooks/useCollaboratorGroups';
import { CollaboratorGroup } from './types';
import CollaboratorSearch from './CollaboratorSearch';
import CollaboratorTabs from './CollaboratorTabs';
import GroupList from './GroupList';
import GroupForm from './group-form/GroupForm';
import GroupDetail from './GroupDetail';

const CollaboratorContent: React.FC = () => {
  const {
    groups,
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
  } = useCollaboratorGroups();
  
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  
  // Find the group currently being viewed
  const viewingGroup = viewingGroupId 
    ? groups.find(g => g.id === viewingGroupId) 
    : null;
    
  // Find the group currently being edited
  const editingGroup = editingGroupId 
    ? groups.find(g => g.id === editingGroupId) 
    : null;

  // Handler for viewing a group
  const handleViewGroup = (groupId: number) => {
    setViewingGroupId(groupId);
  };
  
  // Handler for editing a group
  const handleEditGroup = (groupId: number) => {
    setEditingGroupId(groupId);
    setViewingGroupId(null);
  };
  
  // Handler for deleting a group with confirmation
  const handleDeleteGroup = (groupId: number) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      deleteGroup(groupId);
      setViewingGroupId(null);
      toast.success('Group deleted successfully');
    }
  };
  
  // Handler for going back to the group list
  const handleBackToGroups = () => {
    setViewingGroupId(null);
    setEditingGroupId(null);
  };
  
  // Handler for canceling group creation or editing
  const handleCancelGroupForm = () => {
    setIsCreatingGroup(false);
    setEditingGroupId(null);
  };
  
  // Handler for completing group creation or editing
  const handleCompleteGroupForm = (groupData: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingGroupId) {
      // TODO: Add update logic when implementing editing
      setEditingGroupId(null);
      toast.success('Group updated successfully');
    } else {
      addGroup(groupData);
      toast.success('New group created successfully');
    }
  };
  
  // Handler for adding members to a group
  const handleAddMembers = (groupId: number, memberIds: number[]) => {
    addMembersToGroup(groupId, memberIds);
    toast.success(`${memberIds.length} ${memberIds.length === 1 ? 'member' : 'members'} added successfully`);
  };

  // If creating or editing a group, show the form
  if (isCreatingGroup || editingGroupId) {
    return (
      <div className="p-6">
        <GroupForm 
          isCreating={!editingGroupId}
          onCancel={handleCancelGroupForm}
          onComplete={handleCompleteGroupForm}
          existingGroup={editingGroup}
        />
      </div>
    );
  }
  
  // If viewing a specific group, show the group detail
  if (viewingGroupId && viewingGroup) {
    return (
      <div className="p-6">
        <GroupDetail 
          group={viewingGroup}
          onBack={handleBackToGroups}
          onEdit={handleEditGroup}
          onDelete={handleDeleteGroup}
          onAddMembers={handleAddMembers}
        />
      </div>
    );
  }

  // Otherwise, show the group list
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
      />
      
      <GroupList 
        groups={groups}
        onStartGroupCreation={() => setIsCreatingGroup(true)}
        onViewGroup={handleViewGroup}
        onToggleStar={toggleStarGroup}
      />
    </div>
  );
};

export default CollaboratorContent;
