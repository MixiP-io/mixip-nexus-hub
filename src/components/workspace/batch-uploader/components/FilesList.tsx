import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import FileCard from './FileCard';
import { FilesListProps } from '../types/componentProps';

const FilesList: React.FC<FilesListProps> = ({
  files,
  isUploading,
  overallProgress,
  formatFileSize,
  calculateTotalSize,
  removeFile,
  clearAll,
  startUpload
}) => {
  const totalSize = formatFileSize(calculateTotalSize());
  const uploadedFiles = files.filter(f => f.status === 'complete').length;
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Selected Files</h3>
          <p className="text-sm text-gray-400">
            {files.length} file{files.length !== 1 ? 's' : ''} ({totalSize})
            {uploadedFiles > 0 && ` • ${uploadedFiles} uploaded`}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={clearAll}
            disabled={isUploading}
          >
            Clear All
          </Button>
          <Button 
            onClick={startUpload}
            disabled={isUploading || files.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Start Upload'}
          </Button>
        </div>
      </div>
      
      {/* Overall Progress */}
      {isUploading && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      )}
      
      {/* File Cards */}
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
    </div>
  );
};

export default FilesList;
