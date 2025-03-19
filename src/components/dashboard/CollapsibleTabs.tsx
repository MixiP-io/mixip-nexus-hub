import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type Tab = {
  id: string;
  label: string;
  permanent: boolean;
  active: boolean;
  aiPlatformOnly?: boolean;
  path?: string;
};

const CollapsibleTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { profile } = useAuth();
  
  const isAiPlatform = profile?.account_type === 'ai_platform';
  
  // Initial tabs configuration
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'projects', label: 'Projects', permanent: true, active: true, aiPlatformOnly: false, path: '/dashboard/workspace?tab=projects' },
    { id: 'assets', label: 'Assets', permanent: true, active: false, aiPlatformOnly: false, path: '/dashboard/workspace?tab=assets' },
    { id: 'campaigns', label: 'Campaigns', permanent: false, active: false, aiPlatformOnly: false, path: '/dashboard/workspace?tab=campaigns' },
    { id: 'assignments', label: 'Assignments', permanent: false, active: false, aiPlatformOnly: false, path: '/dashboard/workspace?tab=assignments' },
    { id: 'collaborators', label: 'Collaborators', permanent: false, active: false, aiPlatformOnly: false, path: '/dashboard/workspace?tab=collaborators' },
    { id: 'uploader', label: 'Uploader', permanent: false, active: false, aiPlatformOnly: false, path: '/dashboard/workspace?tab=uploader' },
    { id: 'analytics', label: 'Analytics', permanent: false, active: false, aiPlatformOnly: false, path: '/dashboard/workspace?tab=analytics' },
    // AI Platform specific tabs
    { id: 'datasets', label: 'Datasets', permanent: true, active: false, aiPlatformOnly: true, path: '/ai-platform/datasets' },
    { id: 'ai-models', label: 'AI Models', permanent: true, active: false, aiPlatformOnly: true, path: '/ai-platform/models' },
    { id: 'api-config', label: 'API Config', permanent: false, active: false, aiPlatformOnly: true, path: '/ai-platform/api-config' }
  ]);
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Update active tab based on URL params and path
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const path = window.location.pathname;
    
    setTabs(prevTabs => 
      prevTabs.map(tab => {
        // Check if we're on a specific path that matches a tab
        if (tab.path && path.includes(tab.path.split('?')[0])) {
          return { ...tab, active: true };
        }
        // Otherwise use the tab parameter
        else if (tabParam && tab.id === tabParam) {
          return { ...tab, active: true };
        } else {
          return { ...tab, active: false };
        }
      })
    );
  }, [searchParams, location.pathname]);
  
  const handleTabClick = (tab: Tab) => {
    // Navigate using the path if provided
    if (tab.path) {
      navigate(tab.path);
    }
    
    // Update active state
    setTabs(tabs.map(t => ({
      ...t,
      active: t.id === tab.id
    })));
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // If on AI Platform path, don't show the tabs
  if (isAiPlatform && location.pathname.includes('/ai-platform')) {
    return null;
  }
  
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
            onClick={() => handleTabClick(tab)}
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
