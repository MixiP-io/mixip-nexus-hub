
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FolderOpen } from 'lucide-react';

interface UploadCompleteProps {
  isOpen: boolean;
  onClose: () => void;
  fileCount: number;
  totalSize: string;
  projectId: string;
  projectName: string;
  navigateToProject: (projectId: string) => void;
}

const UploadComplete: React.FC<UploadCompleteProps> = ({
  isOpen,
  onClose,
  fileCount,
  totalSize,
  projectId,
  projectName,
  navigateToProject
}) => {
  const handleNavigate = () => {
    navigateToProject(projectId);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload Complete!</AlertDialogTitle>
          <AlertDialogDescription>
            Successfully uploaded {fileCount} file{fileCount !== 1 ? 's' : ''} ({totalSize}) to "{projectName}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={handleNavigate} className="bg-green-600 hover:bg-green-700">
              <FolderOpen className="mr-2 h-4 w-4" />
              View Project Folder
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UploadComplete;
