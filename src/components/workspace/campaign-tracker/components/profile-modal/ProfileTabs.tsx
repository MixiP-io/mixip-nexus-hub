
import React from 'react';

interface ProfileTabsProps {
  activeTab: 'portfolio' | 'about' | 'availability';
  setActiveTab: (tab: 'portfolio' | 'about' | 'availability') => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-700">
      <div className="flex px-6">
        <button
          className={`px-4 py-3 font-medium ${activeTab === 'portfolio' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio
        </button>
        <button
          className={`px-4 py-3 font-medium ${activeTab === 'about' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('about')}
        >
          About & Experience
        </button>
        <button
          className={`px-4 py-3 font-medium ${activeTab === 'availability' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('availability')}
        >
          Availability & Rates
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;
