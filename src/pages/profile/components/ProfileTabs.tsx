
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
    <div className="border-b border-gray-800 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "pb-4 px-1 font-medium text-base relative transition-colors",
              activeTab === tab.id
                ? "text-white" 
                : "text-gray-400 hover:text-gray-300"
            )}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="flex items-center">
              {tab.icon}
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
