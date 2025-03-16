
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FolderOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UploadCompleteProps {
  isOpen: boolean;
  onClose: () => void;
  fileCount: number;
  totalSize: string;
  projectId: string;
  projectName: string;
  success: boolean;
  navigateToProject: (projectId: string) => void;
  folderId?: string;
}

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
  console.log("UploadComplete rendering with:", { 
    isOpen, 
    fileCount, 
    projectId, 
    projectName, 
    success, 
    folderId 
  });

  // Force the dialog to be visible when isOpen changes to true
  useEffect(() => {
    if (isOpen) {
      console.log("UploadComplete is open, ensuring dialog is visible");
      // Add a toast notification to ensure user knows the upload completed
      if (success) {
        const folderInfo = folderId && folderId !== 'root' ? ` in folder "${folderId}"` : '';
        toast.success(`Upload complete: ${fileCount} files added to ${projectName}${folderInfo}`, {
          description: `Click "View Project Folder" to see your files.`,
          duration: 5000,
        });
      } else {
        toast.error(`Upload failed: No files were added to ${projectName}`, {
          description: `Please try again.`,
          duration: 5000,
        });
      }
    }
  }, [isOpen, fileCount, projectName, success, folderId]);

  const handleNavigate = () => {
    console.log("Navigate to project:", projectId);
    if (projectId) {
      navigateToProject(projectId);
      onClose();
    } else {
      console.error("Cannot navigate: No project ID provided");
      toast.error("Error: Cannot navigate to project");
    }
  };

  return (
    <AlertDialog 
      open={isOpen}
      onOpenChange={(open) => {
        console.log("AlertDialog onOpenChange:", open);
        if (!open) onClose();
      }}
    >
      <AlertDialogContent className={`border-gray-700 ${success ? 'bg-gray-800' : 'bg-gray-800 border-red-800/50'}`}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {success ? (
              <><CheckCircle className="h-5 w-5 text-green-500" /> Upload Complete!</>
            ) : (
              <><AlertTriangle className="h-5 w-5 text-amber-500" /> Upload Failed</>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {success ? (
              <>
                Successfully uploaded {fileCount} file{fileCount !== 1 ? 's' : ''} ({totalSize}) to "{projectName}"
                {folderId && folderId !== 'root' ? ` in folder "${folderId}"` : ''}.
              </>
            ) : (
              <>Failed to upload files to "{projectName}". No files were successfully processed.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button 
            onClick={handleNavigate} 
            className={success ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
            disabled={!projectId}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            View Project Folder
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UploadComplete;
