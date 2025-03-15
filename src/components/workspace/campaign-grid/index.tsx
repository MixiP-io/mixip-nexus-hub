
import React from 'react';
import CampaignForm from '../campaign-form';
import CampaignDistributeDialog from '../CampaignDistributeDialog';
import CampaignResponseView from './CampaignResponseView';
import CampaignHeader from './CampaignHeader';
import CampaignTabs from './CampaignTabs';
import { useCampaignState } from './hooks/useCampaignState';
import { ViewOption } from './types/viewOption';

interface CampaignGridProps {
  isCreating?: boolean;
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ isCreating = false }) => {
  const {
    isCreatingCampaign,
    campaigns,
    selectedCampaign,
    showDistributeDialog,
    isViewingResponses,
    viewingCampaignId,
    activeView,
    setActiveView,
    startCampaignCreation,
    cancelCampaignCreation,
    handleCampaignComplete,
    handleDistributeCampaign,
    handleViewResponses,
    handleBackToCampaigns,
    setShowDistributeDialog,
    getFilteredCampaigns
  } = useCampaignState(isCreating);

  // Get filtered campaigns based on active view
  const filteredCampaigns = getFilteredCampaigns();

  // If viewing responses for a specific campaign
  if (isViewingResponses && viewingCampaignId) {
    const campaign = campaigns.find(c => c.id === viewingCampaignId);
    return (
      <CampaignResponseView
        campaignId={viewingCampaignId}
        campaignTitle={campaign?.title}
        onBackClick={handleBackToCampaigns}
      />
    );
  }

  return (
    <div className="p-6">
      {isCreatingCampaign ? (
        <CampaignForm 
          isCreating={true} 
          onCancel={cancelCampaignCreation}
          onComplete={handleCampaignComplete}
        />
      ) : (
        <>
          <CampaignHeader />
          
          <CampaignTabs
            activeView={activeView}
            setActiveView={setActiveView}
            filteredCampaigns={filteredCampaigns}
            onStartCampaignCreation={startCampaignCreation}
            onViewResponses={handleViewResponses}
            onDistribute={handleDistributeCampaign}
          />
        </>
      )}
      
      {/* Campaign Distribution Dialog */}
      <CampaignDistributeDialog 
        isOpen={showDistributeDialog}
        onClose={() => setShowDistributeDialog(false)}
      />
    </div>
  );
};

export default CampaignGrid;
