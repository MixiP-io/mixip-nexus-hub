
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  File, 
  Image, 
  Video, 
  Folder, 
  Plus,
  CloudUpload, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

type UploadSource = 'local' | 'dropbox' | 'google-drive' | 'box' | 'icloud';

type FileStatus = 'queued' | 'uploading' | 'processing' | 'complete' | 'error';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  source: UploadSource;
  file?: File;
  preview?: string;
}

const BatchUploader: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [activeSource, setActiveSource] = useState<UploadSource>('local');
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const sources = [
    { id: 'local', name: 'My Device', icon: <Folder className="h-5 w-5" /> },
    { id: 'dropbox', name: 'Dropbox', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'google-drive', name: 'Google Drive', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'box', name: 'Box', icon: <CloudUpload className="h-5 w-5" /> },
    { id: 'icloud', name: 'iCloud', icon: <CloudUpload className="h-5 w-5" /> },
  ];
  
  const handleSourceChange = (source: UploadSource) => {
    setActiveSource(source);
    
    if (source !== 'local') {
      toast.info(`${source} integration coming soon`);
    }
  };
  
  const triggerFileInput = (e?: React.MouseEvent) => {
    // If this was triggered by an event, prevent default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Ensure the file input exists and click it
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File selection triggered", event.target.files);
    const selectedFiles = event.target.files;
    
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }
    
    const newFiles: UploadFile[] = Array.from(selectedFiles).map(file => {
      // Create object URL for preview
      const preview = file.type.startsWith('image/') 
        ? URL.createObjectURL(file) 
        : undefined;
        
      return {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'queued',
        source: 'local',
        file: file,
        preview
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Reset the input so the same file can be selected again
    if (event.target) {
      event.target.value = '';
    }
    
    toast.success(`${newFiles.length} files added to upload queue`);
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(file => file.id !== id);
    });
  };
  
  const clearAll = () => {
    // Revoke all object URLs to prevent memory leaks
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  };
  
  const startUpload = () => {
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate uploading process for each file
    const uploadPromises = files.map((file, index) => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        
        // Mark file as uploading
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'uploading', progress: 0 } 
              : f
          )
        );
        
        // Simulate incremental progress
        const interval = setInterval(() => {
          if (progress >= 100) {
            clearInterval(interval);
            
            // Mark file as processing then complete
            setFiles(prev => 
              prev.map(f => 
                f.id === file.id 
                  ? { ...f, status: 'processing', progress: 100 } 
                  : f
              )
            );
            
            setTimeout(() => {
              setFiles(prev => 
                prev.map(f => 
                  f.id === file.id 
                    ? { ...f, status: 'complete', progress: 100 } 
                    : f
                )
              );
              resolve();
            }, 1000);
            
          } else {
            progress += Math.random() * 10;
            progress = Math.min(progress, 98); // Cap at 98 before completion
            
            setFiles(prev => 
              prev.map(f => 
                f.id === file.id 
                  ? { ...f, progress } 
                  : f
              )
            );
          }
        }, 300 + Math.random() * 300); // Randomize interval for realism
      });
    });
    
    // Track overall progress
    let completedUploads = 0;
    const totalFiles = files.length;
    
    const intervalId = setInterval(() => {
      const currentProgress = files.reduce((sum, file) => sum + file.progress, 0) / totalFiles;
      setOverallProgress(currentProgress);
    }, 200);
    
    // When all uploads complete
    Promise.all(uploadPromises).then(() => {
      clearInterval(intervalId);
      setOverallProgress(100);
      setIsUploading(false);
      toast.success("All files uploaded successfully!");
    });
  };
  
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
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };
  
  const calculateTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };
  
  const totalSize = formatFileSize(calculateTotalSize());
  const uploadedFiles = files.filter(f => f.status === 'complete').length;
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Batch Upload</h2>
      
      {/* Source Selection */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">Upload Source</h3>
        <div className="flex flex-wrap gap-2">
          {sources.map(source => (
            <Button
              key={source.id}
              variant={activeSource === source.id ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                activeSource === source.id ? "bg-green-600 hover:bg-green-700" : ""
              }`}
              onClick={() => handleSourceChange(source.id as UploadSource)}
            >
              {source.icon}
              {source.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Upload Area with explicit form for better accessibility */}
      <div className="mb-6">
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          id="file-upload-input"
          multiple
          onChange={handleFileSelect}
          accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
        
        <div 
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onClick={triggerFileInput}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
              const event = {
                target: {
                  files,
                  value: ''
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              handleFileSelect(event);
            }
          }}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Drag files here or click to browse</h3>
          <p className="text-gray-400 mb-2">
            Upload multiple files at once. Support for images, videos, and documents.
          </p>
          <Button 
            onClick={triggerFileInput}
            className="mt-2 bg-green-600 hover:bg-green-700" 
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Select Files
          </Button>
        </div>
      </div>
      
      {/* Files List */}
      {files.length > 0 && (
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
              <div 
                key={file.id} 
                className="bg-gray-700 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="relative h-32 bg-gray-800 flex items-center justify-center">
                  {file.preview ? (
                    <img 
                      src={file.preview} 
                      alt={file.name}
                      className="h-full w-full object-cover"
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
            ))}
          </div>
        </div>
      )}
      
      {/* Metadata and Project Assignment - Placeholder UI */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Metadata & Rights */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Metadata & Rights</h3>
            <p className="text-gray-400 text-sm mb-4">
              Apply metadata and rights information to all selected files.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">License Type</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2">
                  <option>Standard License</option>
                  <option>Extended License</option>
                  <option>Custom License</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Usage Rights</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2">
                  <option>Commercial</option>
                  <option>Editorial</option>
                  <option>Personal</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Project Assignment */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Project Assignment</h3>
            <p className="text-gray-400 text-sm mb-4">
              Select projects to add these files to.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Project</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2">
                  <option>Select a project</option>
                  <option>Project Alpha</option>
                  <option>Brand Campaign 2023</option>
                  <option>Product Launch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Folder (Optional)</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2">
                  <option>Root folder</option>
                  <option>Images</option>
                  <option>Videos</option>
                  <option>Documents</option>
                </select>
              </div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-dashed"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchUploader;
