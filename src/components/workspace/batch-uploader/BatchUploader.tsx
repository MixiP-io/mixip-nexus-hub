import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

import { useFileUpload } from './hooks/useFileUpload';
import { getProjectById } from './utils/projectUtils';

import FileUploadSection from './components/file-list/FileGrid';
import ProjectSection from './components/ProjectSection';
import UploadButtonsSection from './components/file-list/OverallProgress';
import UploadCompleteDialog from './components/file-list/UploadComplete';

const BatchUploader: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  const [selectedLicense, setSelectedLicense] = useState<string>('standard');
  
  useEffect(() => {
    const projectParam = searchParams.get('project');
    const folderParam = searchParams.get('folder');
    
    console.log('[CRITICAL] BatchUploader initialized with URL params:', { 
      project: projectParam, 
      folder: folderParam
    });
    
    if (projectParam) {
      const project = getProjectById(projectParam);
      if (project) {
        console.log('[BatchUploader] Setting project from URL param:', projectParam);
        setSelectedProject(projectParam);
        
        if (folderParam) {
          console.log('[CRITICAL] Setting folder from URL param:', folderParam);
          setSelectedFolder(folderParam);
          
          const folderName = folderParam === 'root' ? 'root folder' : 
            `folder "${project.subfolders?.find(f => f.id === folderParam)?.name || folderParam}"`;
          
          toast.info(`Upload files to ${project.name}: ${folderName}`);
        }
      } else {
        console.warn('[BatchUploader] Project from URL not found:', projectParam);
        toast.error('Selected project not found');
      }
    }
  }, [searchParams]);

  const {
    files,
    isUploading,
    overallProgress,
    fileInputRef,
    triggerFileInput,
    handleFileSelect,
    removeFile,
    clearAll,
    startUpload,
    calculateTotalSize,
    uploadComplete,
    uploadResults,
    setUploadComplete,
    selectedProject: fileUploadSelectedProject,
    selectedProjectName,
    selectedFolder: fileUploadSelectedFolder,
    navigateToProject
  } = useFileUpload();

  useEffect(() => {
    console.log('BatchUploader render with:', {
      selectedProject,
      selectedFolder,
      selectedLicense,
      filesCount: files.length,
      isUploading,
      uploadComplete,
      folderFromUploadHook: fileUploadSelectedFolder
    });
  }, [selectedProject, selectedFolder, selectedLicense, files, isUploading, uploadComplete, fileUploadSelectedFolder]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Batch Asset Uploader</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProjectSection 
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
          
          <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-4">
            <h2 className="text-lg font-medium mb-3">License Selection</h2>
            <select
              className="w-full bg-background border border-border rounded-md p-2"
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
            >
              <option value="standard">Standard License</option>
              <option value="extended">Extended License</option>
              <option value="premium">Premium Rights</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-6">
          <FileUploadSection 
            files={files}
            overallProgress={overallProgress}
            fileInputRef={fileInputRef}
            triggerFileInput={triggerFileInput}
            handleFileSelect={handleFileSelect}
            removeFile={removeFile}
            clearAll={clearAll}
            totalSize={calculateTotalSize()}
            isUploading={isUploading}
          />
          
          <UploadButtonsSection 
            isUploading={isUploading}
            files={files}
            selectedProject={selectedProject}
            selectedFolder={selectedFolder}
            selectedLicense={selectedLicense}
            startUpload={startUpload}
          />
        </div>
      </div>

      {uploadComplete && uploadResults && (
        <UploadCompleteDialog
          uploadResults={uploadResults}
          onClose={() => setUploadComplete(false)}
          onViewAssets={navigateToProject}
        />
      )}
      
      <Toaster position="top-right" />
    </div>
  );
};

export default BatchUploader;
