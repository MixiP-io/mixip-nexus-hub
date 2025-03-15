
import React from 'react';
import FileCard from '../FileCard';
import { UploadFile } from '../../types';

interface FileGridProps {
  files: UploadFile[];
  removeFile: (id: string) => void;
  isUploading: boolean;
  formatFileSize: (bytes: number) => string;
}

const FileGrid: React.FC<FileGridProps> = ({ 
  files, 
  removeFile, 
  isUploading, 
  formatFileSize 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {files.map((file) => (
        <FileCard 
          key={file.id}
          file={file}
          removeFile={removeFile}
          isUploading={isUploading}
          formatFileSize={formatFileSize}
        />
      ))}
    </div>
  );
};

export default FileGrid;
