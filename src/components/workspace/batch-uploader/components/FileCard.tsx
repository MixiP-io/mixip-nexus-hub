
import React, { useState, useEffect } from 'react';
import { X, Image, Video, File, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FileCardProps } from '../types/componentProps';
import { FileStatus } from '../types';

const FileCard: React.FC<FileCardProps> = ({ 
  file, 
  removeFile, 
  isUploading,
  formatFileSize 
}) => {
  const [previewError, setPreviewError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(file.preview);
  
  // Update preview URL when file.preview changes
  useEffect(() => {
    setPreviewUrl(file.preview);
    setPreviewError(false);
  }, [file.preview]);
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-6 w-6 text-blue-400" />;
    } else if (fileType.startsWith('video/')) {
      return <Video className="h-6 w-6 text-purple-400" />;
    } else {
      return <File className="h-6 w-6 text-gray-400" />;
    }
  };
  
  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const handlePreviewError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load preview for ${file.name}`);
    setPreviewError(true);
    e.currentTarget.style.display = 'none';
    e.currentTarget.parentElement?.classList.add('fallback-preview');
  };

  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden flex flex-col">
      <div className="relative h-32 bg-gray-800 flex items-center justify-center">
        {previewUrl && !previewError ? (
          <img 
            src={previewUrl} 
            alt={file.name}
            className="h-full w-full object-cover"
            onError={handlePreviewError}
          />
        ) : (
          getFileIcon(file.type)
        )}
        
        <button 
          className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 rounded-full p-1 hover:bg-opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            removeFile(file.id);
          }}
          disabled={isUploading}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-medium text-sm truncate flex-1" title={file.name}>
            {file.name}
          </h4>
          {getStatusIcon(file.status)}
        </div>
        
        <p className="text-xs text-gray-400 mb-2">
          {formatFileSize(file.size)}
        </p>
        
        {file.status !== 'complete' && (
          <Progress value={file.progress} className="h-1 mt-auto" />
        )}
        
        <div className="text-xs text-gray-400 mt-1">
          {file.status === 'queued' && 'Ready to upload'}
          {file.status === 'uploading' && `Uploading ${Math.round(file.progress)}%`}
          {file.status === 'processing' && 'Processing...'}
          {file.status === 'complete' && 'Upload complete'}
          {file.status === 'error' && 'Upload failed'}
        </div>
      </div>
    </div>
  );
};

export default FileCard;
