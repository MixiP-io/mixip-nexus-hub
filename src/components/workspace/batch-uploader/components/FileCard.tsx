
import React from 'react';
import { X, Image, Video, File, Check, CheckCircle2, AlertCircle, FileImage, FileWarning } from 'lucide-react';
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
      return <FileImage className="h-6 w-6 text-frameio-accent-blue" />;
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
              
              // Replace with the appropriate icon
              const container = target.parentElement;
              if (container) {
                const iconWrapper = document.createElement('div');
                iconWrapper.className = 'flex items-center justify-center h-full w-full';
                container.appendChild(iconWrapper);
                
                // Create the icon SVG element using React's createPortal would be better,
                // but for this fix we'll use a simpler approach
                const iconElement = document.createElement('div');
                iconElement.className = 'h-6 w-6 text-frameio-accent-blue';
                iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-image"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22"/></svg>';
                iconWrapper.appendChild(iconElement);
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
