
import React, { useState } from 'react';
import { 
  Upload, 
  File, 
  X, 
  FileCheck, 
  Plus, 
  FolderPlus, 
  Image,
  Camera,
  Trash,
  Cloud
} from 'lucide-react';
import UploadHeader from './UploadHeader';
import FileGrid from './FileGrid';
import UploadProgress from './UploadProgress';
import SourceSelector from './SourceSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUpload, UploadSource, UploadStatus } from './types';
import { defaultUploadSources } from './data';

const BatchUploader: React.FC = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    isUploading: false,
    progress: 0,
    filesComplete: 0,
    totalFiles: 0,
    currentSpeed: '0 KB/s',
    timeRemaining: '0 seconds',
  });
  const [selectedSource, setSelectedSource] = useState<UploadSource>(defaultUploadSources[0]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: FileUpload[] = Array.from(event.target.files).map(file => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
        thumbnailUrl: file.type.startsWith('image/') 
          ? URL.createObjectURL(file) 
          : undefined,
      }));
      
      setFiles([...files, ...newFiles]);
      setUploadStatus(prev => ({
        ...prev,
        totalFiles: prev.totalFiles + newFiles.length
      }));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const newFiles: FileUpload[] = Array.from(event.dataTransfer.files).map(file => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
        thumbnailUrl: file.type.startsWith('image/') 
          ? URL.createObjectURL(file) 
          : undefined,
      }));
      
      setFiles([...files, ...newFiles]);
      setUploadStatus(prev => ({
        ...prev,
        totalFiles: prev.totalFiles + newFiles.length
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = (id: string) => {
    const fileToRemove = files.find(file => file.id === id);
    if (fileToRemove?.thumbnailUrl) {
      URL.revokeObjectURL(fileToRemove.thumbnailUrl);
    }
    
    setFiles(files.filter(file => file.id !== id));
    setUploadStatus(prev => ({
      ...prev,
      totalFiles: prev.totalFiles - 1
    }));
  };

  const simulateUpload = () => {
    if (files.length === 0) return;
    
    setUploadStatus(prev => ({
      ...prev,
      isUploading: true,
      progress: 0,
      filesComplete: 0,
      totalFiles: files.length,
      currentSpeed: '1.2 MB/s',
      timeRemaining: `${Math.ceil(files.length * 2)} seconds`
    }));

    // Simulate file uploads
    let completedFiles = 0;
    const updatedFiles = [...files];
    
    const interval = setInterval(() => {
      let allComplete = true;
      
      updatedFiles.forEach((file, index) => {
        if (file.progress < 100) {
          // Increment progress randomly between 5-15% each interval
          const increment = Math.floor(Math.random() * 10) + 5;
          const newProgress = Math.min(file.progress + increment, 100);
          
          updatedFiles[index] = {
            ...file,
            progress: newProgress,
            status: newProgress === 100 ? 'complete' : 'uploading'
          };
          
          if (newProgress === 100 && file.progress !== 100) {
            completedFiles++;
          }
          
          if (newProgress < 100) {
            allComplete = false;
          }
        }
      });
      
      setFiles([...updatedFiles]);
      
      const overallProgress = Math.floor((completedFiles / files.length) * 100);
      setUploadStatus(prev => ({
        ...prev,
        progress: overallProgress,
        filesComplete: completedFiles,
        timeRemaining: allComplete ? '0 seconds' : `${Math.ceil((files.length - completedFiles) * 2)} seconds`
      }));
      
      if (allComplete) {
        clearInterval(interval);
        setUploadStatus(prev => ({
          ...prev,
          isUploading: false,
          progress: 100,
          filesComplete: files.length,
          currentSpeed: '0 KB/s',
          timeRemaining: '0 seconds'
        }));
      }
    }, 500);
  };

  const resetUpload = () => {
    // Revoke any object URLs to prevent memory leaks
    files.forEach(file => {
      if (file.thumbnailUrl) {
        URL.revokeObjectURL(file.thumbnailUrl);
      }
    });
    
    setFiles([]);
    setUploadStatus({
      isUploading: false,
      progress: 0,
      filesComplete: 0,
      totalFiles: 0,
      currentSpeed: '0 KB/s',
      timeRemaining: '0 seconds',
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <UploadHeader files={files} uploadStatus={uploadStatus} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <SourceSelector 
              sources={defaultUploadSources} 
              selectedSource={selectedSource}
              onSourceSelect={setSelectedSource}
            />
          </div>
          
          <div className="md:col-span-9">
            {files.length === 0 ? (
              <div
                className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center h-64 flex flex-col items-center justify-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">Drag & Drop Files Here</h3>
                <p className="text-gray-400 mb-4">Or select files from your device</p>
                <Button className="flex items-center gap-2">
                  <FolderPlus className="w-4 h-4" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select Files
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <UploadProgress 
                      uploadStatus={uploadStatus} 
                      onStartUpload={simulateUpload}
                      onReset={resetUpload}
                    />
                  </CardContent>
                </Card>
                
                <FileGrid 
                  files={files} 
                  onRemoveFile={handleRemoveFile} 
                  isUploading={uploadStatus.isUploading} 
                />
                
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                    onClick={() => {
                      const input = document.getElementById('file-upload') as HTMLInputElement;
                      input?.click();
                    }}
                    disabled={uploadStatus.isUploading}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Files
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </Button>
                  
                  {!uploadStatus.isUploading && uploadStatus.progress < 100 && (
                    <Button 
                      onClick={simulateUpload}
                      className="bg-mixip-blue hover:bg-mixip-blue-dark"
                      disabled={files.length === 0}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Start Upload
                    </Button>
                  )}
                  
                  {uploadStatus.progress === 100 && (
                    <Button 
                      onClick={resetUpload}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <FileCheck className="w-4 h-4 mr-2" />
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchUploader;
