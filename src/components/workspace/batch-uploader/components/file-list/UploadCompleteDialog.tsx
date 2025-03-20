
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface UploadCompleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileCount: number;
  totalSize: string;
  projectId: string;
  projectName: string;
  success: boolean;
  navigateToProject: (projectId: string, folderId?: string) => void;
  folderId: string;
}

const UploadCompleteDialog: React.FC<UploadCompleteDialogProps> = ({
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
  const handleGoToProject = () => {
    console.log(`Navigating to project ${projectId} folder ${folderId}`);
    navigateToProject(projectId, folderId);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
        <AlertDialogHeader>
          <div className="flex items-center mb-2">
            {success ? (
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            )}
            <AlertDialogTitle>
              {success ? 'Upload Complete' : 'Upload Failed'}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-400">
            {success ? (
              <>
                Successfully uploaded {fileCount} file{fileCount !== 1 ? 's' : ''} ({totalSize}) to <span className="font-medium text-white">{projectName}</span>.
              </>
            ) : (
              <>
                There was an error uploading your files to {projectName}.
                Please try again or contact support if the issue persists.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            Close
          </AlertDialogCancel>
          {success && (
            <AlertDialogAction 
              onClick={handleGoToProject}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Go to Project
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UploadCompleteDialog;
