
import React from 'react';
import { 
  File, 
  Image, 
  Video, 
  Music, 
  FileText, 
  X, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FileCardProps } from './types';
import { cn } from '@/lib/utils';

const FileCard: React.FC<FileCardProps> = ({ file, onRemove, isUploading }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const type = file.type;
    if (type.startsWith('image/')) return <Image className="h-8 w-8 text-mixip-blue" />;
    if (type.startsWith('video/')) return <Video className="h-8 w-8 text-mixip-orange" />;
    if (type.startsWith('audio/')) return <Music className="h-8 w-8 text-mixip-purple" />;
    if (type.startsWith('text/')) return <FileText className="h-8 w-8 text-mixip-mint" />;
    return <File className="h-8 w-8 text-gray-400" />;
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'complete':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'uploading':
        return (
          <div className="h-4 w-4 rounded-full border-2 border-mixip-blue border-t-transparent animate-spin"></div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={cn(
        "relative group rounded-lg overflow-hidden border hover:shadow-md transition-all duration-200",
        file.status === 'complete' 
          ? "border-green-600 bg-gray-800" 
          : file.status === 'error'
          ? "border-red-600 bg-gray-800"
          : "border-gray-700 bg-gray-800"
      )}
    >
      <div className="aspect-square relative overflow-hidden">
        {file.thumbnailUrl ? (
          <img 
            src={file.thumbnailUrl} 
            alt={file.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            {getFileIcon()}
          </div>
        )}
        
        {/* Progress overlay for uploading files */}
        {file.status === 'uploading' && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-white font-medium text-lg">{file.progress}%</div>
          </div>
        )}
        
        {/* Remove button */}
        {!isUploading && (
          <button
            onClick={() => onRemove(file.id)}
            className="absolute top-2 right-2 h-6 w-6 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="p-2">
        <div className="truncate text-sm font-medium">
          {file.name}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">{formatFileSize(file.size)}</span>
          <div className="flex items-center">
            {getStatusIcon()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
