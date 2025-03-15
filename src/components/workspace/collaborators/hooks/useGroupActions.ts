
import { toast } from 'sonner';
import { CollaboratorGroup } from '../types';

interface UseGroupActionsProps {
  groups: CollaboratorGroup[];
  addGroup: (groupData: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'>) => void;
  toggleStarGroup: (groupId: number) => void;
  deleteGroup: (groupId: number) => void;
  addMembersToGroup: (groupId: number, memberIds: number[]) => void;
  findAvailableCollaborators: (groupId: number | null, query: string) => any[];
  setIsCreatingGroup: (value: boolean) => void;
  lastCreatedGroupId: number | null;
  clearLastCreatedGroupId: () => void;
}

export const useGroupActions = ({
  groups,
  addGroup,
  toggleStarGroup,
  deleteGroup,
  addMembersToGroup,
  findAvailableCollaborators,
  setIsCreatingGroup,
  lastCreatedGroupId,
  clearLastCreatedGroupId
}: UseGroupActionsProps) => {
  // Handler for viewing a group
  const handleViewGroup = (groupId: number, setViewingGroupId: (id: number | null) => void) => {
    setViewingGroupId(groupId);
    // Clear newly created status if applicable
    if (lastCreatedGroupId === groupId) {
      clearLastCreatedGroupId();
    }
  };
  
  // Handler for editing a group
  const handleEditGroup = (
    groupId: number, 
    setEditingGroupId: (id: number | null) => void,
    setViewingGroupId: (id: number | null) => void
  ) => {
    setEditingGroupId(groupId);
    setViewingGroupId(null);
  };
  
  // Handler for deleting a group with confirmation
  const handleDeleteGroup = (
    groupId: number,
    setViewingGroupId: (id: number | null) => void
  ) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      deleteGroup(groupId);
      setViewingGroupId(null);
      toast.success('Group deleted successfully');
    }
  };
  
  // Handler for going back to the group list
  const handleBackToGroups = (
    setViewingGroupId: (id: number | null) => void,
    setEditingGroupId: (id: number | null) => void
  ) => {
    setViewingGroupId(null);
    setEditingGroupId(null);
    // Also clear newly created status if going back
    clearLastCreatedGroupId();
  };
  
  // Handler for canceling group creation or editing
  const handleCancelGroupForm = (
    setEditingGroupId: (id: number | null) => void
  ) => {
    setIsCreatingGroup(false);
    setEditingGroupId(null);
  };
  
  // Handler for completing group creation or editing
  const handleCompleteGroupForm = (
    groupData: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'>,
    editingGroupId: number | null,
    setEditingGroupId: (id: number | null) => void
  ) => {
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
  
  // Handler for completing the add members after create process
  const handleCompleteAddMembers = (
    setViewingGroupId: (id: number | null) => void
  ) => {
    if (lastCreatedGroupId) {
      // Switch to viewing the new group
      setViewingGroupId(lastCreatedGroupId);
      clearLastCreatedGroupId();
    }
  };
  
  // Handler for skipping the add members step
  const handleSkipAddMembers = (
    setViewingGroupId: (id: number | null) => void,
    setShowAddMembersAfterCreate: (show: boolean) => void
  ) => {
    if (lastCreatedGroupId) {
      // Switch to viewing the new group
      setViewingGroupId(lastCreatedGroupId);
      clearLastCreatedGroupId();
    }
    setShowAddMembersAfterCreate(false);
  };

  return {
    handleViewGroup,
    handleEditGroup,
    handleDeleteGroup,
    handleBackToGroups,
    handleCancelGroupForm,
    handleCompleteGroupForm,
    handleAddMembers,
    handleCompleteAddMembers,
    handleSkipAddMembers
  };
};
