
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import UploadCompleteDialog from './UploadCompleteDialog';
import { formatFileSize } from '../../utils/formatUtils';

interface UploadCompleteProps {
  isComplete: boolean;
  results: any;
  projectId: string | null;
  projectName: string | null;
  totalSize: number;
  fileCount: number;
  resetUpload: () => void;
  navigateToProject: (projectId: string, folderId?: string) => void;
}

const UploadComplete: React.FC<UploadCompleteProps> = ({
  isComplete,
  results,
  projectId,
  projectName,
  totalSize,
  fileCount,
  resetUpload,
  navigateToProject
}) => {
  // Dialog state
  const [showDialog, setShowDialog] = React.useState(true);
  
  // Early return if upload is not complete or no results
  if (!isComplete || !results) return null;
  
  // Format file size
  const formattedSize = formatFileSize(totalSize);
  
  // Determine success/failure display
  const isSuccess = results?.success;
  
  // Handle dialog close
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  
  // Project ID and name from results or props
  const resultProjectId = results?.projectId || projectId || '';
  const resultProjectName = results?.projectName || projectName || '';
  const resultFolderId = results?.folderId || 'root';

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-4">
        <div className="flex items-center mb-2">
          {isSuccess ? (
            <Check className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          )}
          <h3 className="text-lg font-medium text-white">
            {isSuccess ? 'Upload Complete' : 'Upload Failed'}
          </h3>
        </div>
        
        <p className="text-gray-300 mb-3">
          {isSuccess ? (
            <>Successfully uploaded {fileCount} file{fileCount !== 1 ? 's' : ''} ({formattedSize}) to <span className="font-medium text-white">{resultProjectName}</span>.</>
          ) : (
            <>There was an issue uploading your files to {resultProjectName}.</>
          )}
        </p>
        
        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={resetUpload}
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            New Upload
          </Button>
          
          {isSuccess && (
            <Button 
              onClick={() => navigateToProject(resultProjectId, resultFolderId)}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Go to Project
            </Button>
          )}
        </div>
      </div>
      
      <UploadCompleteDialog
        isOpen={showDialog}
        onClose={handleCloseDialog}
        fileCount={fileCount}
        totalSize={formattedSize}
        projectId={resultProjectId}
        projectName={resultProjectName}
        success={isSuccess}
        navigateToProject={navigateToProject}
        folderId={resultFolderId}
      />
    </>
  );
};

export default UploadComplete;
