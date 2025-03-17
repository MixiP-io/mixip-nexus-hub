
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

import FileUploadSection from './components/FileUploadSection';
import LicenseSection from './components/LicenseSection';
import ProjectSection from './components/ProjectSection';
import UploadButtonsSection from './components/UploadButtonsSection';
import UploadCompleteDialog from './components/UploadCompleteDialog';

import { useFileUpload } from './hooks/useFileUpload';
import { getProjectById } from './utils/projectUtils';

const BatchUploader: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  const [selectedLicense, setSelectedLicense] = useState<string>('standard');
  
  // Get project and folder from URL if available
  useEffect(() => {
    const projectParam = searchParams.get('project');
    const folderParam = searchParams.get('folder');
    
    console.log('[CRITICAL] BatchUploader initialized with URL params:', { 
      project: projectParam, 
      folder: folderParam
    });
    
    if (projectParam) {
      // Verify project exists before setting
      const project = getProjectById(projectParam);
      if (project) {
        console.log('[BatchUploader] Setting project from URL param:', projectParam);
        setSelectedProject(projectParam);
        
        // Also set folder if specified
        if (folderParam) {
          console.log('[CRITICAL] Setting folder from URL param:', folderParam);
          setSelectedFolder(folderParam);
          
          // Show toast to indicate where uploads will go
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

  // Debug props in console
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
        {/* Left Column */}
        <div className="space-y-6">
          <ProjectSection 
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
          
          <LicenseSection 
            selectedLicense={selectedLicense}
            setSelectedLicense={setSelectedLicense}
          />
        </div>
        
        {/* Right Column */}
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
