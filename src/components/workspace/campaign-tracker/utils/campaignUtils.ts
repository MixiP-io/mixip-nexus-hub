
import { Creator } from '../types';

// Calculate statistics from responses
export const calculateStats = (responses: Creator[]) => {
  return {
    totalReached: responses.length,
    viewed: responses.filter(r => r.viewedAt).length,
    responded: responses.filter(r => r.respondedAt).length,
    interested: responses.filter(r => r.status === 'interested' || r.status === 'shortlisted').length,
    shortlisted: responses.filter(r => r.status === 'shortlisted').length,
    declined: responses.filter(r => r.status === 'declined').length
  };
};

// Filter responses based on criteria
export const filterResponses = (
  responses: Creator[], 
  activeTab: string, 
  searchQuery: string, 
  activeRole: string | null
) => {
  return responses.filter(creator => {
    // Filter by tab
    if (activeTab !== 'all' && creator.status !== activeTab) {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !creator.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by role
    if (activeRole && creator.role !== activeRole) {
      return false;
    }
    
    return true;
  });
};

// Extract unique roles from responses
export const extractRoles = (responses: Creator[]) => {
  return Array.from(new Set(responses.map(r => r.role)));
};
