
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import GeneralTab from './tabs/general';
import ProfessionalTab from './tabs/ProfessionalTab';
import PortfolioTab from './tabs/PortfolioTab';
import SecurityTab from './tabs/SecurityTab';
import BillingTab from './tabs/BillingTab';
import VerificationTab from './tabs/VerificationTab';
import { useAuth } from '@/context/AuthContext';

const ProfileSettings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("general");
  const { profile } = useAuth();
  const isAIPlatform = profile?.account_type === 'ai_platform';

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
          <ProfileHeader />
          
          <div className="max-w-6xl mx-auto px-6 pt-6">
            <ProfileTabs activeTab={activeTab} handleTabClick={handleTabClick} />
          </div>

          <div className="max-w-6xl mx-auto px-6 py-6">
            {activeTab === "general" && <GeneralTab />}
            {activeTab === "professional" && <ProfessionalTab />}
            {activeTab === "portfolio" && <PortfolioTab />}
            {isAIPlatform && activeTab === "verification" && <VerificationTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "billing" && <BillingTab />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
