
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BatchUploader from './uploader/BatchUploader';

const CreativeContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active section from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get('tab');
  
  // Set default tab or use the one from URL
  const [activeSection, setActiveSection] = useState<'projects' | 'campaigns' | 'uploader' | 'assets' | 'rights'>(
    (tabFromUrl as any) || 'projects'
  );

  // Update URL when tab changes
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('tab', activeSection);
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  }, [activeSection, location.pathname, navigate]);

  const handleTabChange = (tab: 'projects' | 'campaigns' | 'uploader' | 'assets' | 'rights') => {
    setActiveSection(tab);
  };

  return (
    <div className="flex-1 overflow-hidden bg-mixip-gray-dark flex flex-col">
      <div className="p-4 border-b border-gray-700 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === 'projects'
              ? 'bg-mixip-blue text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => handleTabChange('projects')}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === 'campaigns'
              ? 'bg-mixip-blue text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => handleTabChange('campaigns')}
        >
          Campaigns
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === 'assets'
              ? 'bg-mixip-blue text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => handleTabChange('assets')}
        >
          Assets
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === 'uploader'
              ? 'bg-mixip-blue text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => handleTabChange('uploader')}
        >
          Batch Uploader
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === 'rights'
              ? 'bg-mixip-blue text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => handleTabChange('rights')}
        >
          Rights Management
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeSection === 'uploader' ? (
          <BatchUploader />
        ) : activeSection === 'projects' ? (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <p>Projects content will go here</p>
          </div>
        ) : activeSection === 'campaigns' ? (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Campaigns</h2>
            <p>Campaigns content will go here</p>
          </div>
        ) : activeSection === 'assets' ? (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Assets</h2>
            <p>Assets content will go here</p>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Rights Management</h2>
            <p>Rights management content will go here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeContent;
