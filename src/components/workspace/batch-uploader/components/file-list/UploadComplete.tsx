
import React, { useEffect } from 'react';
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
  console.log("UploadComplete rendering with:", { isOpen, fileCount, projectId, projectName });

  // Force the dialog to be visible when isOpen changes to true
  useEffect(() => {
    if (isOpen) {
      console.log("UploadComplete is open, ensuring dialog is visible");
    }
  }, [isOpen]);

  const handleNavigate = () => {
    console.log("Navigate to project:", projectId);
    navigateToProject(projectId);
    onClose();
  };

  // With shadcn/ui AlertDialog, we need to ensure open is directly controlled by the isOpen prop
  // and that we're not accidentally overriding the dialog's internal state
  return (
    <AlertDialog 
      open={isOpen}
      onOpenChange={(open) => {
        console.log("AlertDialog onOpenChange:", open);
        if (!open) onClose();
      }}
    >
      <AlertDialogContent className="bg-gray-800 border-gray-700">
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
