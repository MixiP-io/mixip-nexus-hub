
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Tab = {
  id: string;
  label: string;
  permanent: boolean;
  active: boolean;
};

const CollapsibleTabs: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Initial tabs configuration
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'projects', label: 'Projects', permanent: true, active: true },
    { id: 'assets', label: 'Assets', permanent: true, active: false },
    { id: 'campaigns', label: 'Campaigns', permanent: false, active: false },
    { id: 'assignments', label: 'Assignments', permanent: false, active: false },
    { id: 'collaborators', label: 'Collaborators', permanent: false, active: false },
    { id: 'uploader', label: 'Uploader', permanent: false, active: false },
  ]);
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Update active tab based on URL params
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      console.log('Active tab from URL:', tabParam);
      setTabs(prevTabs => 
        prevTabs.map(tab => ({
          ...tab,
          active: tab.id === tabParam
        }))
      );
    }
  }, [searchParams]);
  
  const handleTabClick = (tabId: string) => {
    // Update URL and state
    console.log('Clicking on tab:', tabId);
    navigate(`/dashboard/workspace?tab=${tabId}`);
    
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Filter tabs based on collapse state
  const visibleTabs = isCollapsed
    ? tabs.filter(tab => tab.permanent || tab.active)
    : tabs;

  return (
    <div className="relative flex justify-between items-center border-b border-gray-800 w-full">
      <div className="flex flex-1">
        {visibleTabs.map(tab => (
          <button
            key={tab.id}
            className={`px-6 py-4 font-medium transition-colors ${
              tab.active 
                ? 'border-b-2 border-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        
        {isCollapsed && (
          <button
            className="px-4 py-4 text-gray-400 hover:text-white"
            onClick={toggleCollapse}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        )}
        
        {!isCollapsed && (
          <button
            className="px-4 py-4 text-gray-400 hover:text-white"
            onClick={toggleCollapse}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CollapsibleTabs;
