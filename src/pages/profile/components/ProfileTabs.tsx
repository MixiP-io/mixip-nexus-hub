
import React from 'react';
import { User, Briefcase, Image, Lock, CreditCard } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  handleTabClick: (tabId: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, handleTabClick }) => {
  return (
    <div className="border-b border-gray-800 mt-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex">
          <button
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === "general" 
                ? 'border-b-2 border-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabClick("general")}
          >
            <User className="h-4 w-4 inline mr-2" />
            General
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === "professional" 
                ? 'border-b-2 border-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabClick("professional")}
          >
            <Briefcase className="h-4 w-4 inline mr-2" />
            Professional Info
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === "portfolio" 
                ? 'border-b-2 border-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabClick("portfolio")}
          >
            <Image className="h-4 w-4 inline mr-2" />
            Portfolio
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === "security" 
                ? 'border-b-2 border-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabClick("security")}
          >
            <Lock className="h-4 w-4 inline mr-2" />
            Security
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === "billing" 
                ? 'border-b-2 border-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabClick("billing")}
          >
            <CreditCard className="h-4 w-4 inline mr-2" />
            Billing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
