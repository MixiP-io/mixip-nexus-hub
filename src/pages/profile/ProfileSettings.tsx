
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import GeneralTab from './tabs/GeneralTab';
import ProfessionalTab from './tabs/ProfessionalTab';
import PortfolioTab from './tabs/PortfolioTab';
import SecurityTab from './tabs/SecurityTab';
import BillingTab from './tabs/BillingTab';

const ProfileSettings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("general");
  const [profileCompletion, setProfileCompletion] = useState(72);

  useEffect(() => {
    // Get the tab from URL params if available
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabClick = (tabId: string) => {
    // Update URL and state
    setSearchParams({ tab: tabId });
    setActiveTab(tabId);
  };

  return (
    <div className="flex h-screen bg-mixip-gray-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          <ProfileHeader profileCompletion={profileCompletion} />
          
          <ProfileTabs activeTab={activeTab} handleTabClick={handleTabClick} />

          <div className="max-w-6xl mx-auto px-6 py-8">
            {activeTab === "general" && <GeneralTab />}
            {activeTab === "professional" && <ProfessionalTab />}
            {activeTab === "portfolio" && <PortfolioTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "billing" && <BillingTab />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
