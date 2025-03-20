
import React from 'react';
import NoProjectSelected from './NoProjectSelected';
import AssetsDebugPanel from './AssetsDebugPanel';
import { AlertCircle } from 'lucide-react';

interface AssetsErrorStateProps {
  selectedProjectId: string | null;
  currentFolderId: string;
  projectData: any | null;
  error?: string | null;
}

const AssetsErrorState: React.FC<AssetsErrorStateProps> = ({
  selectedProjectId,
  currentFolderId,
  projectData,
  error
}) => {
  if (!selectedProjectId) {
    return <NoProjectSelected />;
  }

  if (error) {
    return (
      <div className="p-6">
        <AssetsDebugPanel 
          projectId={selectedProjectId}
          currentFolderId={currentFolderId || 'unknown'}
        />
        <div className="bg-destructive/15 border border-destructive rounded-md p-4 my-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h3 className="font-medium text-destructive">Error Loading Assets</h3>
          </div>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
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
