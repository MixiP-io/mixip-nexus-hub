
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, FolderOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssetsEmptyStateViewProps {
  hasAssetsInFolders: boolean;
  currentFolderId: string;
  projectName: string;
  foldersWithAssets: string[];
  handleBatchUpload: () => void;
  selectedProjectId: string | null;
}

const AssetsEmptyStateView: React.FC<AssetsEmptyStateViewProps> = ({
  hasAssetsInFolders,
  currentFolderId,
  projectName,
  foldersWithAssets,
  handleBatchUpload,
  selectedProjectId
}) => {
  const navigate = useNavigate();
  
  const goToUploader = () => {
    // Navigate to the batch uploader with project ID and folder ID as parameters
    const params = new URLSearchParams();
    
    if (selectedProjectId) {
      params.append('project', selectedProjectId);
    }
    
    params.append('folder', currentFolderId || 'root');
    params.append('fromEmptyProject', 'true');
    
    navigate(`/dashboard/workspace/batch-uploader?${params.toString()}`);
  };
  
  const renderFoldersList = () => {
    if (!hasAssetsInFolders || foldersWithAssets.length === 0) {
      return null;
    }
    
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center mb-2">
          <Info className="h-4 w-4 mr-2 text-blue-400" />
          <h4 className="text-sm font-medium">Assets found in other folders</h4>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          This folder is empty, but there are assets in other folders:
        </p>
        <ul className="space-y-1">
          {foldersWithAssets.map((folderName, index) => (
            <li key={index} className="text-sm flex items-center">
              <FolderOpen className="h-3 w-3 mr-2 text-blue-400" />
              <span>{folderName}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
      <div className="max-w-md">
        <h3 className="text-2xl font-bold mb-2">No Assets Found</h3>
        
        {currentFolderId === 'root' ? (
          <p className="text-gray-400 mb-6">
            This project doesn't have any assets yet. Upload some assets to get started.
          </p>
        ) : (
          <p className="text-gray-400 mb-6">
            This folder is empty. Upload some assets or choose another folder.
          </p>
        )}
        
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-2 justify-center">
          <Button 
            onClick={goToUploader}
            size="lg" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="h-5 w-5" />
            Upload Assets
          </Button>
        </div>
        
        {renderFoldersList()}
      </div>
    </div>
  );
};

export default AssetsEmptyStateView;
