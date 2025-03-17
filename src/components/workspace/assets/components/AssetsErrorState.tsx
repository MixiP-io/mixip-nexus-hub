
import React from 'react';
import NoProjectSelected from './NoProjectSelected';
import AssetsDebugPanel from './AssetsDebugPanel';

interface AssetsErrorStateProps {
  selectedProjectId: string | null;
  currentFolderId: string;
  projectData: any | null;
}

const AssetsErrorState: React.FC<AssetsErrorStateProps> = ({
  selectedProjectId,
  currentFolderId,
  projectData
}) => {
  if (!selectedProjectId) {
    return <NoProjectSelected />;
  }

  if (!projectData) {
    return (
      <div className="p-6">
        <AssetsDebugPanel 
          projectId={selectedProjectId}
          currentFolderId={currentFolderId || 'unknown'}
        />
        <NoProjectSelected />
      </div>
    );
  }

  return null;
};

export default AssetsErrorState;
