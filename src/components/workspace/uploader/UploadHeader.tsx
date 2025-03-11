
import React from 'react';
import { Upload, Check, FileCheck } from 'lucide-react';
import { UploadHeaderProps } from './types';

const UploadHeader: React.FC<UploadHeaderProps> = ({ files, uploadStatus }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Upload className="h-5 w-5 mr-2 text-mixip-blue" />
          <h2 className="text-lg font-medium">Batch Upload</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {uploadStatus.isUploading ? (
            <span className="text-sm flex items-center text-mixip-blue">
              <div className="h-2 w-2 rounded-full bg-mixip-blue animate-pulse mr-2"></div>
              Uploading...
            </span>
          ) : uploadStatus.progress === 100 && files.length > 0 ? (
            <span className="text-sm flex items-center text-green-500">
              <FileCheck className="h-4 w-4 mr-1" />
              Upload Complete
            </span>
          ) : files.length > 0 ? (
            <span className="text-sm text-gray-400">
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UploadHeader;
