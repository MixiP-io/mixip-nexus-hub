
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileListHeaderProps {
  filesCount: number;
  totalSize: string;
  uploadedFiles: number;
  isUploading: boolean;
  clearAll: () => void;
  startUpload: () => void;
}

const FileListHeader: React.FC<FileListHeaderProps> = ({
  filesCount,
  totalSize,
  uploadedFiles,
  isUploading,
  clearAll,
  startUpload
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-medium">Selected Files</h3>
        <p className="text-sm text-gray-400">
          {filesCount} file{filesCount !== 1 ? 's' : ''} ({totalSize})
          {uploadedFiles > 0 && ` • ${uploadedFiles} uploaded`}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={clearAll}
          disabled={isUploading}
          className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600" // Added styling to ensure visibility
        >
          Clear All
        </Button>
        <Button 
          onClick={startUpload}
          disabled={isUploading || filesCount === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? 'Uploading...' : 'Start Upload'}
        </Button>
      </div>
    </div>
  );
};

export default FileListHeader;
