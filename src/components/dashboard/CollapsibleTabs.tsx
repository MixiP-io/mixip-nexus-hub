
import React, { useState, useEffect } from 'react';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [showTabSettings, setShowTabSettings] = useState(false);
  
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
    if (showTabSettings) setShowTabSettings(false);
  };
  
  const toggleTabVisibility = (tabId: string) => {
    // This would update user preferences in a real app
    console.log(`Toggle visibility for tab: ${tabId}`);
  };
  
  // Filter tabs based on collapse state
  const visibleTabs = isCollapsed
    ? tabs.filter(tab => tab.permanent || tab.active)
    : tabs;

  return (
    <div className="relative flex justify-between items-center border-b border-gray-800 w-full">
      <div className="flex">
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
      
      <div className="relative pr-6">
        <button
          className="text-gray-400 hover:text-white p-2 rounded-full"
          onClick={() => setShowTabSettings(!showTabSettings)}
        >
          <Settings className="w-5 h-5" />
        </button>
        
        {showTabSettings && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="p-3 text-sm text-white font-medium border-b border-gray-700">
              Tab Settings
            </div>
            <div className="py-1" role="menu">
              {tabs.filter(tab => !tab.permanent).map(tab => (
                <div 
                  key={tab.id}
                  className="flex items-center justify-between px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  <span>{tab.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={true} // In a real app, this would be based on user settings
                      onChange={() => toggleTabVisibility(tab.id)}
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:ring-1 peer-focus:ring-mixip-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mixip-blue"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleTabs;
