
import React from 'react';
import { FileGridProps } from './types';
import FileCard from './FileCard';

const FileGrid: React.FC<FileGridProps> = ({ files, onRemoveFile, isUploading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map(file => (
        <FileCard 
          key={file.id} 
          file={file} 
          onRemove={onRemoveFile}
          isUploading={isUploading}
        />
      ))}
    </div>
  );
};

export default FileGrid;
