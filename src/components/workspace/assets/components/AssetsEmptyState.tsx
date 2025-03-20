
import React from 'react';
import { FolderOpen, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AssetsEmptyStateView from './AssetsEmptyStateView';

interface AssetsEmptyStateProps {
  projectName: string;
  hasAssetsInFolders: boolean;
  currentFolderId: string;
  foldersWithAssets: string[];
  handleBatchUpload: () => void;
  selectedProjectId: string | null;
  handleFolderSelect: (folderId: string, folderName?: string) => void;
  folderName?: string;
}

const AssetsEmptyState: React.FC<AssetsEmptyStateProps> = ({
  projectName,
  hasAssetsInFolders,
  currentFolderId,
  foldersWithAssets,
  handleBatchUpload,
  selectedProjectId,
  handleFolderSelect,
  folderName
}) => {
  // If we're in root folder and there are assets in subfolders
  if (currentFolderId === 'root' && hasAssetsInFolders) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <FolderOpen className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Assets in Root Folder</h3>
        <p className="text-gray-500 max-w-md mb-6">
          Project "{projectName}" has assets in the following folders: {foldersWithAssets.join(', ')}
        </p>
        <div className="flex gap-4">
          <Button onClick={handleBatchUpload} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Assets
          </Button>
        </div>
      </div>
    );
  }
  
  // If we're in a subfolder with no assets
  if (currentFolderId !== 'root') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <FolderOpen className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Folder is Empty</h3>
        <p className="text-gray-500 max-w-md mb-6">
          The folder "{folderName || currentFolderId}" doesn't contain any assets yet.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => handleFolderSelect('root')} className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Back to Root
          </Button>
          <Button onClick={handleBatchUpload} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Assets
          </Button>
        </div>
      </div>
    );
  }

  // Standard empty state for project with no assets anywhere
  return <AssetsEmptyStateView projectName={projectName} onUpload={handleBatchUpload} />;
};

export default AssetsEmptyState;
