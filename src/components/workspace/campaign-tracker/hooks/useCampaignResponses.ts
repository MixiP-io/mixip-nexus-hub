
import { useState } from 'react';
import { Creator } from '../types';
import sampleResponses from '../data/sampleResponses';
import { calculateStats, filterResponses, extractRoles } from '../utils/campaignUtils';
import { useResponseActions } from './useResponseActions';
import { useFilterSort } from './useFilterSort';

const useCampaignResponses = () => {
  const [responses] = useState<Creator[]>(sampleResponses);
  
  // Import filtering and sorting functionality
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    activeRole,
    setActiveRole,
    sortDirection,
    handleSort
  } = useFilterSort();

  // Import action handlers
  const {
    selectedCreator,
    showProfileModal,
    handleViewProfile,
    handleCloseProfile,
    handleShortlist,
    handleMessage
  } = useResponseActions();

  // Calculate statistics
  const stats = calculateStats(responses);

  // Filter responses based on active tab, search query, and role
  const filteredResponses = filterResponses(responses, activeTab, searchQuery, activeRole);

  // Extract unique roles for filtering
  const roles = extractRoles(responses);

  return {
    responses,
    filteredResponses,
    stats,
    activeTab,
    setActiveTab,
    selectedCreator,
    showProfileModal,
    searchQuery,
    setSearchQuery,
    activeRole,
    setActiveRole,
    sortDirection,
    roles,
    handleViewProfile,
    handleCloseProfile,
    handleShortlist,
    handleMessage,
    handleSort
  };
};

export default useCampaignResponses;
