
import React from 'react';
import PortfolioTab from './tabs/PortfolioTab';
import AboutTab from './tabs/AboutTab';
import AvailabilityTab from './tabs/AvailabilityTab';
import { Creator } from '../../types';

interface TabContentProps {
  activeTab: 'portfolio' | 'about' | 'availability';
  expandedCreatorData: any; // Using any for simplicity, but should be better typed in a real app
  creator: Creator;
}

const TabContent: React.FC<TabContentProps> = ({ 
  activeTab, 
  expandedCreatorData,
  creator 
}) => {
  return (
    <div className="flex-grow overflow-y-auto p-6">
      {activeTab === 'portfolio' && (
        <PortfolioTab portfolioItems={expandedCreatorData.portfolioExtended} />
      )}
      
      {activeTab === 'about' && (
        <AboutTab 
          bio={expandedCreatorData.bio}
          experience={expandedCreatorData.experience}
          specialties={expandedCreatorData.specialties}
          equipment={expandedCreatorData.equipment}
          reviews={expandedCreatorData.reviews}
        />
      )}
      
      {activeTab === 'availability' && (
        <AvailabilityTab 
          rateRange={expandedCreatorData.rateRange}
          availability={expandedCreatorData.availability}
        />
      )}
    </div>
  );
};

export default TabContent;
