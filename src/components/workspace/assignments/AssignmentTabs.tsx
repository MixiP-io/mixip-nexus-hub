
import React from 'react';
import { cn } from '@/lib/utils';

type ViewOption = 'incoming' | 'outgoing' | 'active' | 'completed' | 'team';

interface AssignmentTabsProps {
  activeView: ViewOption;
  setActiveView: (view: ViewOption) => void;
  userType: 'creator' | 'agency' | 'brand';
}

const AssignmentTabs: React.FC<AssignmentTabsProps> = ({
  activeView,
  setActiveView,
  userType
}) => {
  const tabs = [
    { id: 'incoming', label: 'Incoming' },
    { id: 'outgoing', label: 'Outgoing' },
    { id: 'active', label: 'In Progress' },
    { id: 'completed', label: 'Completed' }
  ];
  
  // Only add team tab for agency users
  if (userType === 'agency') {
    tabs.push({ id: 'team', label: 'Team Assignments' });
  }

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

export default AssignmentTabs;
