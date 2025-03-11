import React, { useState } from 'react';
import BatchUploader from './uploader/BatchUploader';

const CreativeContent: React.FC = () => {
  // Add a state to control which section is active
  const [activeSection, setActiveSection] = useState<'uploader' | 'other'>('uploader');

  return (
    <div className="flex-1 overflow-hidden bg-mixip-gray-dark flex flex-col">
      <div className="p-4 border-b border-gray-700 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === 'uploader'
              ? 'bg-mixip-blue text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => setActiveSection('uploader')}
        >
          Batch Uploader
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === 'other'
              ? 'bg-mixip-blue text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => setActiveSection('other')}
        >
          Other Content
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeSection === 'uploader' ? (
          <BatchUploader />
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Other Content</h2>
            <p>Other content will go here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeContent;
