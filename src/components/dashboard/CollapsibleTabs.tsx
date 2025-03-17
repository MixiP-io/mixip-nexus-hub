
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type Tab = {
  id: string;
  label: string;
  permanent: boolean;
  active: boolean;
  aiPlatformOnly?: boolean;
};

const CollapsibleTabs: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { profile } = useAuth();
  
  const isAiPlatform = profile?.account_type === 'ai_platform';
  
  // Initial tabs configuration
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'projects', label: 'Projects', permanent: true, active: true, aiPlatformOnly: false },
    { id: 'assets', label: 'Assets', permanent: true, active: false, aiPlatformOnly: false },
    { id: 'campaigns', label: 'Campaigns', permanent: false, active: false, aiPlatformOnly: false },
    { id: 'assignments', label: 'Assignments', permanent: false, active: false, aiPlatformOnly: false },
    { id: 'collaborators', label: 'Collaborators', permanent: false, active: false, aiPlatformOnly: false },
    { id: 'uploader', label: 'Uploader', permanent: false, active: false, aiPlatformOnly: false },
    { id: 'analytics', label: 'Analytics', permanent: false, active: false, aiPlatformOnly: false },
    // AI Platform specific tabs
    { id: 'datasets', label: 'Datasets', permanent: true, active: false, aiPlatformOnly: true },
    { id: 'ai-models', label: 'AI Models', permanent: true, active: false, aiPlatformOnly: true },
    { id: 'api-config', label: 'API Config', permanent: false, active: false, aiPlatformOnly: true }
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
    
    // Preserve project selection when changing tabs
    const projectParam = searchParams.get('project');
    const newUrl = projectParam 
      ? `/dashboard/workspace?tab=${tabId}&project=${projectParam}`
      : `/dashboard/workspace?tab=${tabId}`;
    
    navigate(newUrl);
    
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Filter tabs based on user role and collapse state
  const visibleTabs = tabs
    .filter(tab => !tab.aiPlatformOnly || (tab.aiPlatformOnly && isAiPlatform))
    .filter(tab => isCollapsed ? (tab.permanent || tab.active) : true);

  return (
    <div className="relative flex justify-between items-center border-b border-gray-800 w-full bg-[#1A1F2C] text-white">
      <div className="flex flex-1">
        {visibleTabs.map(tab => (
          <button
            key={tab.id}
            className={`px-6 py-4 font-medium text-base transition-all ${
              tab.active 
                ? isAiPlatform && tab.aiPlatformOnly
                  ? 'border-b-2 border-green-400 text-green-400'
                  : 'border-b-2 border-mixip-blue text-mixip-blue' 
                : 'text-white hover:text-mixip-blue'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        
        <button
          className="px-4 py-4 text-white hover:text-mixip-blue transition-colors ml-auto"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand tabs" : "Collapse tabs"}
        >
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CollapsibleTabs;
