
import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderOpen, Upload } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AssetsEmptyStateView from './AssetsEmptyStateView';
import { toast } from 'sonner';

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
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleUpload = () => {
    handleBatchUpload();
    
    // If we have a selected project, also redirect to the uploader
    if (selectedProjectId) {
      try {
        // Update search params with uploader tab and selected project
        searchParams.set('tab', 'uploader');
        searchParams.set('project', selectedProjectId);
        searchParams.set('fromEmptyProject', 'true');
        setSearchParams(searchParams);
        
        toast.info('Redirecting to uploader...');
      } catch (e) {
        console.error("Error during redirect:", e);
      }
    }
  };
  
  const handleSwitchFolder = (folderId: string, folderName?: string) => {
    if (handleFolderSelect) {
      handleFolderSelect(folderId, folderName);
    }
  };
  
  // Switch between different empty states based on context
  if (currentFolderId === 'root' && hasAssetsInFolders) {
    // Root folder is empty but other folders have assets
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <FolderOpen className="h-20 w-20 text-gray-400" />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-medium">No Assets in Root Folder</h3>
          <p className="text-gray-400 max-w-md">
            The root folder of "{projectName}" doesn't have any assets,
            but there are assets in {foldersWithAssets.length} {foldersWithAssets.length === 1 ? 'folder' : 'folders'}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {/* Folder links */}
          {foldersWithAssets.map((name, index) => (
            <Button 
              key={index} 
              variant="outline" 
              onClick={() => handleSwitchFolder(`folder${index + 1}`, name)}
              className="flex items-center gap-2"
            >
              <FolderOpen className="h-4 w-4" />
              {name}
            </Button>
          ))}
          
          {/* Upload button */}
          <Button 
            variant="default" 
            onClick={handleUpload}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Assets
          </Button>
        </div>
      </div>
    );
  }
  
  // Regular empty state for folder
  return (
    <AssetsEmptyStateView 
      projectName={projectName}
      handleBatchUpload={handleUpload}
    />
  );
};

export default AssetsEmptyState;
