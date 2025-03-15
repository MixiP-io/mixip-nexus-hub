
import React from 'react';
import { cn } from '@/lib/utils';

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
    <div className="border-b border-gray-800 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "pb-4 px-1 font-medium text-base relative transition-colors",
              activeView === tab.id
                ? "text-white" 
                : "text-gray-400 hover:text-gray-300"
            )}
            onClick={() => setActiveView(tab.id as ViewOption)}
          >
            {tab.label}
            {activeView === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorTabs;
