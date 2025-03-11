
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

import StatsCards from './components/StatsCards';
import SearchFilter from './components/SearchFilter';
import TabButtons from './components/TabButtons';
import CreatorsList from './components/CreatorsList';
import CreatorProfileModal from './CreatorProfileModal';
import useCampaignResponses from './hooks/useCampaignResponses';

interface CampaignResponseTrackerProps {
  campaignId?: number;
  campaignTitle?: string;
}

const CampaignResponseTracker: React.FC<CampaignResponseTrackerProps> = ({ 
  campaignId = 1, 
  campaignTitle = "Summer Collection Launch" 
}) => {
  const {
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
    handleSort,
    responses
  } = useCampaignResponses();

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{campaignTitle} - Responses</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
        </div>
        
        {/* Response Statistics */}
        <StatsCards stats={stats} />
        
        {/* Search and Filters */}
        <SearchFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortDirection={sortDirection}
          handleSort={handleSort}
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          roles={roles}
        />
        
        {/* Tabs */}
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Creator Cards Grid */}
      <CreatorsList 
        filteredResponses={filteredResponses}
        onViewProfile={handleViewProfile}
        onShortlist={handleShortlist}
        onMessage={handleMessage}
      />
      
      {/* Creator Profile Modal */}
      {showProfileModal && selectedCreator && (
        <CreatorProfileModal
          creator={responses.find(c => c.id === selectedCreator)!}
          onClose={handleCloseProfile}
          onShortlist={() => handleShortlist(selectedCreator)}
          onMessage={() => handleMessage(selectedCreator)}
        />
      )}
    </div>
  );
};

export default CampaignResponseTracker;
