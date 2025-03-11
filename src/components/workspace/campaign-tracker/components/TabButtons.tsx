
import React from 'react';
import { CheckCircle, Clock, X, Users } from 'lucide-react';

interface TabButtonsProps {
  activeTab: 'all' | 'pending' | 'interested' | 'shortlisted' | 'declined';
  setActiveTab: (tab: 'all' | 'pending' | 'interested' | 'shortlisted' | 'declined') => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-700 mb-6">
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'all' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('all')}
      >
        All Responses
      </button>
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'pending' ? 'text-white border-b-2 border-yellow-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('pending')}
      >
        <Clock className="w-4 h-4 inline mr-1" />
        Pending
      </button>
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'interested' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('interested')}
      >
        <CheckCircle className="w-4 h-4 inline mr-1" />
        Interested
      </button>
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'shortlisted' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('shortlisted')}
      >
        <Users className="w-4 h-4 inline mr-1" />
        Shortlisted
      </button>
      <button
        className={`px-4 py-2 font-medium text-sm ${activeTab === 'declined' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'}`}
        onClick={() => setActiveTab('declined')}
      >
        <X className="w-4 h-4 inline mr-1" />
        Declined
      </button>
    </div>
  );
};

export default TabButtons;
