
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, FolderOpen } from 'lucide-react';
import { UploadCompleteProps } from '../../types/componentProps';

const UploadComplete: React.FC<UploadCompleteProps> = ({
  isOpen,
  onClose,
  fileCount,
  totalSize,
  projectId,
  projectName,
  success,
  navigateToProject,
  folderId
}) => {
  const normalizedFolderId = folderId || 'root';
  
  const handleViewProject = () => {
    console.log(`Navigating to project ${projectId}, folder: ${normalizedFolderId}`);
    // Pass only projectId to navigateToProject as per its type definition
    navigateToProject(projectId);
    onClose();
  };

  const getFolderInfo = () => {
    if (!normalizedFolderId || normalizedFolderId === 'root') {
      return 'project root folder';
    }
    return `folder "${normalizedFolderId}"`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {success ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <AlertCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <DialogTitle className="text-xl font-semibold text-center">
            {success ? 'Upload Complete!' : 'Upload Failed'}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            {success ? (
              <>
                Successfully uploaded {fileCount} files ({totalSize}) to <strong>{projectName}</strong> in the {getFolderInfo()}.
              </>
            ) : (
              <>
                There was a problem with your upload. Please try again.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-800 px-4 py-3 rounded border border-gray-700 mb-4">
          <h3 className="text-sm font-medium mb-1 text-gray-300">Project Details</h3>
          <p className="text-sm text-gray-400">
            <strong>Name:</strong> {projectName}<br />
            <strong>Location:</strong> {getFolderInfo()}
          </p>
        </div>

        {success && (
          <div className="bg-blue-900/30 px-4 py-3 rounded border border-blue-800/50 mb-4">
            <h3 className="text-sm font-medium mb-1 text-blue-200">Where to find your assets</h3>
            <p className="text-sm text-blue-300">
              Your files have been uploaded to the {getFolderInfo()}. Click "View Assets" below to see them.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {success && (
            <Button
              className="w-full sm:w-auto flex items-center justify-center gap-2"
              onClick={handleViewProject}
            >
              <FolderOpen className="w-4 h-4" />
              View Assets
            </Button>
          )}
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            {success ? 'Upload More' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadComplete;
