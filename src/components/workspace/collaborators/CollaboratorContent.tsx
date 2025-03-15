
import React, { useState, useEffect } from 'react';
import { useCollaboratorGroups } from './hooks/useCollaboratorGroups';
import { useGroupActions } from './hooks/useGroupActions';
import GroupFormView from './views/GroupFormView';
import AddMembersView from './views/AddMembersView';
import GroupDetailView from './views/GroupDetailView';
import GroupListView from './views/GroupListView';

// Define the ViewOption type
type ViewOption = 'all' | 'internal' | 'external' | 'agencies' | 'talent' | 'favorites';

const CollaboratorContent: React.FC = () => {
  const {
    groups,
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
  } = useCollaboratorGroups();
  
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [showAddMembersAfterCreate, setShowAddMembersAfterCreate] = useState(false);
  
  const groupActions = useGroupActions({
    groups,
    addGroup,
    toggleStarGroup,
    deleteGroup,
    addMembersToGroup,
    findAvailableCollaborators,
    setIsCreatingGroup,
    lastCreatedGroupId,
    clearLastCreatedGroupId
  });
  
  useEffect(() => {
    if (lastCreatedGroupId) {
      setShowAddMembersAfterCreate(true);
    }
  }, [lastCreatedGroupId]);
  
  const viewingGroup = viewingGroupId 
    ? groups.find(g => g.id === viewingGroupId) 
    : null;
    
  const editingGroup = editingGroupId 
    ? groups.find(g => g.id === editingGroupId) 
    : null;
    
  const newlyCreatedGroup = lastCreatedGroupId
    ? groups.find(g => g.id === lastCreatedGroupId)
    : null;

  if (isCreatingGroup || editingGroupId) {
    return (
      <GroupFormView
        isCreating={!editingGroupId}
        editingGroup={editingGroup}
        onCancel={() => groupActions.handleCancelGroupForm(setEditingGroupId)}
        onComplete={(groupData) => groupActions.handleCompleteGroupForm(
          groupData, 
          editingGroupId, 
          setEditingGroupId
        )}
      />
    );
  }
  
  if (showAddMembersAfterCreate && newlyCreatedGroup) {
    return (
      <AddMembersView
        group={newlyCreatedGroup}
        onComplete={() => {
          groupActions.handleCompleteAddMembers(setViewingGroupId);
          setShowAddMembersAfterCreate(false);
        }}
        onSkip={() => groupActions.handleSkipAddMembers(
          setViewingGroupId, 
          setShowAddMembersAfterCreate
        )}
        onAddMembers={groupActions.handleAddMembers}
        findAvailableCollaborators={findAvailableCollaborators}
      />
    );
  }
  
  if (viewingGroupId && viewingGroup) {
    return (
      <GroupDetailView
        group={viewingGroup}
        onBack={() => groupActions.handleBackToGroups(
          setViewingGroupId, 
          setEditingGroupId
        )}
        onEdit={(groupId) => groupActions.handleEditGroup(
          groupId, 
          setEditingGroupId, 
          setViewingGroupId
        )}
        onDelete={(groupId) => groupActions.handleDeleteGroup(
          groupId,
          setViewingGroupId
        )}
        onAddMembers={groupActions.handleAddMembers}
        findAvailableCollaborators={findAvailableCollaborators}
      />
    );
  }

  return (
    <GroupListView
      groups={groups}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchField={searchField}
      setSearchField={setSearchField}
      activeView={activeView}
      setActiveView={setActiveView}
      sortOption={sortOption}
      setSortOption={setSortOption}
      onStartGroupCreation={() => setIsCreatingGroup(true)}
      onViewGroup={(groupId) => groupActions.handleViewGroup(
        groupId, 
        setViewingGroupId
      )}
      onToggleStar={toggleStarGroup}
    />
  );
};

export default CollaboratorContent;
