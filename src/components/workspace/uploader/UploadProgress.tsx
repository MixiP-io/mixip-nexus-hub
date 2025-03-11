
import React from 'react';
import { Upload, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadProgressProps } from './types';

const UploadProgress: React.FC<UploadProgressProps> = ({ 
  uploadStatus, 
  onStartUpload,
  onReset
}) => {
  const { 
    isUploading, 
    progress, 
    filesComplete, 
    totalFiles, 
    currentSpeed, 
    timeRemaining 
  } = uploadStatus;

  const getProgressBarColor = () => {
    if (progress === 100) return 'bg-green-500';
    if (isUploading) return 'bg-mixip-blue';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Upload Progress</h3>
        
        <div className="flex items-center space-x-3">
          {progress === 100 ? (
            <span className="text-xs flex items-center text-green-500">
              <Check className="h-3 w-3 mr-1" />
              Complete
            </span>
          ) : isUploading ? (
            <span className="text-xs text-mixip-blue">{`${filesComplete}/${totalFiles} files • ${currentSpeed} • ${timeRemaining} left`}</span>
          ) : totalFiles > 0 ? (
            <Button
              size="sm"
              className="bg-mixip-blue hover:bg-mixip-blue-dark text-xs h-7 px-3"
              onClick={onStartUpload}
            >
              <Upload className="h-3 w-3 mr-1" />
              Start Upload
            </Button>
          ) : null}
        </div>
      </div>
      
      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressBarColor()} transition-all duration-300`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{progress}% complete</span>
        {filesComplete > 0 && (
          <span>{filesComplete} of {totalFiles} files</span>
        )}
      </div>
    </div>
  );
};

export default UploadProgress;
