
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileTabsProps {
  activeTab: string;
  handleTabClick: (tabId: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, handleTabClick }) => {
  const { profile } = useAuth();
  const isAIPlatform = profile?.account_type === 'ai_platform';

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList className="w-full bg-mixip-gray-medium rounded-lg p-1 overflow-x-auto flex-nowrap">
        <TabsTrigger 
          value="general" 
          onClick={() => handleTabClick('general')}
          className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
        >
          General
        </TabsTrigger>
        <TabsTrigger 
          value="professional" 
          onClick={() => handleTabClick('professional')}
          className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
        >
          Professional
        </TabsTrigger>
        {!isAIPlatform && (
          <TabsTrigger 
            value="portfolio" 
            onClick={() => handleTabClick('portfolio')}
            className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Portfolio
          </TabsTrigger>
        )}
        {isAIPlatform && (
          <TabsTrigger 
            value="verification" 
            onClick={() => handleTabClick('verification')}
            className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Verification
          </TabsTrigger>
        )}
        <TabsTrigger 
          value="security" 
          onClick={() => handleTabClick('security')}
          className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
        >
          Security
        </TabsTrigger>
        <TabsTrigger 
          value="billing" 
          onClick={() => handleTabClick('billing')}
          className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
        >
          Billing
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
