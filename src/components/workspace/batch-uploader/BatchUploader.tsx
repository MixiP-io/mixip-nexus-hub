
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import SourceSelection from './components/SourceSelection';
import MetadataSection from './components/MetadataSection';
import ProjectSection from './components/ProjectSection';
import UploadArea from './components/UploadArea';
import FilesList from './components/FilesList';
import { UploadFile, UploadSource } from './types';
import { formatFileSize, getFilePreview } from './utils/fileUtils';

const BatchUploader: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [activeSource, setActiveSource] = useState<UploadSource>('local');
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [tags, setTags] = useState('');
  const [licenseType, setLicenseType] = useState('standard');
  const [usageRights, setUsageRights] = useState('commercial');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('root');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const triggerFileInput = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
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
      return {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'queued',
        source: 'local',
        file: file,
        preview: getFilePreview(file)
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
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
    
    if (!licenseType) {
      toast.error("Please select a license type");
      return;
    }
    
    if (!selectedProject) {
      toast.error("Please select a project to upload to");
      return;
    }
    
    setIsUploading(true);
    
    const uploadPromises = files.map((file) => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'uploading', progress: 0 } 
              : f
          )
        );
        
        const interval = setInterval(() => {
          if (progress >= 100) {
            clearInterval(interval);
            
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
            progress = Math.min(progress, 98);
            
            setFiles(prev => 
              prev.map(f => 
                f.id === file.id 
                  ? { ...f, progress } 
                  : f
              )
            );
          }
        }, 300 + Math.random() * 300);
      });
    });
    
    const intervalId = setInterval(() => {
      const currentProgress = files.reduce((sum, file) => sum + file.progress, 0) / files.length;
      setOverallProgress(currentProgress);
    }, 200);
    
    Promise.all(uploadPromises).then(() => {
      clearInterval(intervalId);
      setOverallProgress(100);
      setIsUploading(false);
      toast.success("All files uploaded successfully!");
    });
  };
  
  const calculateTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Batch Upload</h2>
      
      {/* Source Selection */}
      <SourceSelection
        activeSource={activeSource}
        setActiveSource={setActiveSource}
      />
      
      {/* Metadata & Rights and Project Assignment in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MetadataSection
          tags={tags}
          setTags={setTags}
          licenseType={licenseType}
          setLicenseType={setLicenseType}
          usageRights={usageRights}
          setUsageRights={setUsageRights}
        />
        
        <ProjectSection
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </div>
      
      {/* Upload Area */}
      <UploadArea
        handleFileSelect={handleFileSelect}
        triggerFileInput={triggerFileInput}
      />
      
      {/* Files List */}
      {files.length > 0 && (
        <FilesList
          files={files}
          isUploading={isUploading}
          overallProgress={overallProgress}
          formatFileSize={formatFileSize}
          calculateTotalSize={calculateTotalSize}
          removeFile={removeFile}
          clearAll={clearAll}
          startUpload={startUpload}
        />
      )}
    </div>
  );
};

export default BatchUploader;
