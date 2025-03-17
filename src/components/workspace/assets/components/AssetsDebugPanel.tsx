
import React from 'react';

interface AssetsDebugPanelProps {
  projectId: string;
  currentFolderId: string;
}

const AssetsDebugPanel: React.FC<AssetsDebugPanelProps> = ({ 
  projectId,
  currentFolderId
}) => {
  // Only render in development environment
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-lg mb-4">
      <p>Debug Information:</p>
      <p>Project ID: {projectId}</p>
      <p>Current Folder ID: {currentFolderId}</p>
    </div>
  );
};

export default AssetsDebugPanel;
