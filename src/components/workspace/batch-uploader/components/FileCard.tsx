
import React from 'react';
import { X, Image, Video, File, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FileCardProps } from '../types/componentProps';
import { FileStatus } from '../types';

const FileCard: React.FC<FileCardProps> = ({ 
  file, 
  removeFile, 
  isUploading,
  formatFileSize 
}) => {
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-6 w-6 text-frameio-accent-blue" />;
    } else if (fileType.startsWith('video/')) {
      return <Video className="h-6 w-6 text-frameio-accent-green" />;
    } else {
      return <File className="h-6 w-6 text-frameio-text-secondary" />;
    }
  };
  
  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-frameio-accent-green" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-frameio-accent-red" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-frameio-bg-card rounded-md overflow-hidden flex flex-col border border-frameio-border-subtle shadow-frame-card">
      <div className="relative h-32 bg-frameio-bg-dark flex items-center justify-center">
        {file.preview ? (
          <img 
            src={file.preview} 
            alt={file.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              console.error(`Error loading image preview for ${file.name}`);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // Show the icon when image fails to load
              const container = target.parentElement;
              if (container) {
                container.appendChild(
                  document.createElementNS("http://www.w3.org/2000/svg", "svg")
                );
              }
            }}
          />
        ) : (
          getFileIcon(file.type)
        )}
        
        <button 
          className="absolute top-2 right-2 bg-frameio-bg-dark bg-opacity-70 rounded-full p-1 hover:bg-opacity-90 text-frameio-text-primary"
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
          <h4 className="font-medium text-sm truncate flex-1 text-frameio-text-primary" title={file.name}>
            {file.name}
          </h4>
          {getStatusIcon(file.status)}
        </div>
        
        <p className="text-xs text-frameio-text-secondary mb-2">
          {formatFileSize(file.size)}
        </p>
        
        {file.status !== 'complete' && (
          <Progress value={file.progress} className="h-1 mt-auto bg-frameio-border-subtle [&>div]:bg-frameio-accent-blue" />
        )}
        
        <div className="text-xs text-frameio-text-secondary mt-1">
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
