
import React from 'react';
import { User, Briefcase, Image, Lock, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileTabsProps {
  activeTab: string;
  handleTabClick: (tabId: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, handleTabClick }) => {
  const tabs = [
    { id: 'general', label: 'General', icon: <User className="h-4 w-4 mr-2" /> },
    { id: 'professional', label: 'Professional Info', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Image className="h-4 w-4 mr-2" /> },
    { id: 'security', label: 'Security', icon: <Lock className="h-4 w-4 mr-2" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4 mr-2" /> }
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap bg-gray-800 p-1 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex-1 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-sm transition-colors",
              activeTab === tab.id
                ? "bg-gray-700 text-white" 
                : "text-gray-400 hover:text-gray-300"
            )}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="flex items-center">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
