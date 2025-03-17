
import React from 'react';
import NavigationTabs from '@/components/workspace/common/NavigationTabs';

type ViewOption = 'all' | 'internal' | 'external' | 'agencies' | 'talent' | 'favorites';

interface CollaboratorTabsProps {
  activeView: ViewOption;
  setActiveView: (view: ViewOption) => void;
}

const CollaboratorTabs: React.FC<CollaboratorTabsProps> = ({
  activeView,
  setActiveView
}) => {
  const tabs = [
    { id: 'all', label: 'All Groups' },
    { id: 'internal', label: 'Internal Teams' },
    { id: 'external', label: 'External Network' },
    { id: 'agencies', label: 'Agencies' },
    { id: 'talent', label: 'Talent' },
    { id: 'favorites', label: 'Favorites' }
  ];

  return (
    <NavigationTabs 
      tabs={tabs}
      activeTab={activeView}
      onTabChange={(tabId) => setActiveView(tabId as ViewOption)}
    />
  );
};

export default CollaboratorTabs;
