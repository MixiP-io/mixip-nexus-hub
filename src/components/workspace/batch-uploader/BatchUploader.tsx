
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

import { useFileUpload } from './hooks/useFileUpload';
import { getProjectById } from './utils/projectUtils';

import UploadArea from './components/UploadArea';
import FileGrid from './components/file-list/FileGrid';
import ProjectSection from './components/ProjectSection';
import OverallProgress from './components/file-list/OverallProgress';
import UploadCompleteDialog from './components/file-list/UploadComplete';
import FilesList from './components/FilesList';
import UploaderTabs from './components/UploaderTabs';

const BatchUploader: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  const [selectedLicense, setSelectedLicense] = useState<string>('standard');
  const [triggerFileInput, setTriggerFileInput] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'source' | 'metadata' | 'project'>('source');
  const [tags, setTags] = useState<string[]>([]);
  // Changed to Record<string, boolean> from string[]
  const [usageRights, setUsageRights] = useState<Record<string, boolean>>({
    commercial: false,
    editorial: false,
    perpetual: false,
    worldwide: false
  });
  const [activeSource, setActiveSource] = useState<'computer' | 'phone' | 'local'>('local');
  
  // Handle URL parameters on component mount and when they change
  useEffect(() => {
    const projectParam = searchParams.get('project');
    const folderParam = searchParams.get('folder');
    const fromEmptyProject = searchParams.get('fromEmptyProject') === 'true';
    
    console.log('[CRITICAL] BatchUploader initialized with URL params:', { 
      project: projectParam, 
      folder: folderParam,
      fromEmptyProject: fromEmptyProject
    });
    
    if (projectParam) {
      const project = getProjectById(projectParam);
      if (project) {
        console.log('[BatchUploader] Setting project from URL param:', projectParam);
        setSelectedProject(projectParam);
        setActiveView('source');
        
        if (folderParam) {
          console.log('[CRITICAL] Setting folder from URL param:', folderParam);
          setSelectedFolder(folderParam);
          
          const folderName = folderParam === 'root' ? 'root folder' : 
            `folder "${project.subfolders?.find(f => f.id === folderParam)?.name || folderParam}"`;
          
          // Add a small delay to ensure the UI is ready
          setTimeout(() => {
            toast.info(`Upload files to ${project.name}: ${folderName}`);
            
            // If coming from empty project view, set a flag to trigger file input
            if (fromEmptyProject) {
              console.log('[CRITICAL] Coming from empty project view, will trigger file input');
              setTriggerFileInput(true);
            }
          }, 300);
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
    triggerFileInput: openFileInput,
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

  // Debug rendering
  useEffect(() => {
    console.log('BatchUploader render with:', {
      selectedProject,
      selectedFolder,
      selectedLicense,
      filesCount: files.length,
      isUploading,
      uploadComplete,
      folderFromUploadHook: fileUploadSelectedFolder,
      triggerFileInput
    });
  }, [selectedProject, selectedFolder, selectedLicense, files, isUploading, uploadComplete, fileUploadSelectedFolder, triggerFileInput]);

  const handleStartUpload = () => {
    if (selectedProject) {
      startUpload(selectedLicense, selectedProject, selectedFolder);
    } else {
      toast.error('Please select a project first');
    }
  };

  // Automatically trigger file input when arriving from empty folder view
  useEffect(() => {
    if (triggerFileInput && selectedProject && !files.length && !isUploading) {
      console.log('[CRITICAL] Auto-triggering file selection from empty project navigation');
      // Add slight delay to ensure UI is ready
      setTimeout(() => {
        openFileInput();
        setTriggerFileInput(false); // Reset flag after triggering
      }, 800);
    }
  }, [triggerFileInput, selectedProject, files.length, isUploading, openFileInput]);

  // Wrapper for source selection to ensure type compatibility
  const handleSourceChange = (source: 'computer' | 'phone' | 'moby' | 'dropbox' | 'google-drive' | 'box' | 'icloud') => {
    if (source === 'computer' || source === 'phone') {
      setActiveSource(source);
    } else {
      setActiveSource('local'); // Default to local for other sources
      toast.info(`${source} integration coming soon`);
    }
  };

  // Wrapper for usageRights to ensure type compatibility
  const handleUsageRightsChange = (rights: Record<string, boolean>) => {
    setUsageRights(rights);
  };

  // Function to format file size for display
  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Batch Asset Uploader</h1>
      
      {/* Tabs navigation for uploader */}
      <UploaderTabs
        activeView={activeView}
        setActiveView={setActiveView}
        activeSource={activeSource}
        setActiveSource={handleSourceChange}
        tags={tags}
        setTags={setTags}
        licenseType={selectedLicense}
        setLicenseType={setSelectedLicense}
        usageRights={usageRights}
        setUsageRights={handleUsageRightsChange}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      
      {/* Add the UploadArea component */}
      {activeView === 'source' && (
        <div className="mt-6">
          <UploadArea
            handleFileSelect={handleFileSelect}
            triggerFileInput={openFileInput}
            fileInputRef={fileInputRef}
          />
        </div>
      )}
      
      {/* Files list section */}
      <div className="mt-6">
        <FilesList 
          files={files}
          isUploading={isUploading}
          overallProgress={overallProgress}
          formatFileSize={formatFileSize}
          calculateTotalSize={calculateTotalSize}
          removeFile={removeFile}
          clearAll={clearAll}
          startUpload={handleStartUpload}
          uploadComplete={uploadComplete}
          setUploadComplete={setUploadComplete}
          uploadResults={uploadResults}
          selectedProject={selectedProject}
          selectedProjectName={selectedProjectName}
          navigateToProject={navigateToProject}
        />
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default BatchUploader;
