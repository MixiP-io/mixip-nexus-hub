
import React, { useEffect } from 'react';
import { UploaderProvider } from './context/UploaderContext';
import BatchUploaderContainer from './components/layout/BatchUploaderContainer';
import BatchUploaderHeader from './components/layout/BatchUploaderHeader';
import UploaderTabs from './components/UploaderTabs';
import SourceContent from './components/content/SourceContent';
import FilesList from './components/FilesList';
import { useUrlParamsHandler } from './hooks/useUrlParamsHandler';

const BatchUploader: React.FC = () => {
  // Get URL parameters to initialize state
  const { selectedProject, selectedFolder, triggerFileInput } = useUrlParamsHandler();

  return (
    <UploaderProvider>
      <BatchUploaderContent 
        initialProject={selectedProject} 
        initialFolder={selectedFolder} 
        initialTrigger={triggerFileInput} 
      />
    </UploaderProvider>
  );
};

interface BatchUploaderContentProps {
  initialProject: string | null;
  initialFolder: string;
  initialTrigger: boolean;
}

const BatchUploaderContent: React.FC<BatchUploaderContentProps> = ({ 
  initialProject, 
  initialFolder,
  initialTrigger
}) => {
  const {
    // State
    files,
    activeView,
    activeSource,
    tags,
    selectedLicense,
    usageRights,
    selectedProject,
    selectedFolder,
    isUploading,
    
    // Actions
    setActiveView,
    setActiveSource,
    setTags,
    setSelectedLicense,
    setUsageRights,
    setSelectedProject,
    setSelectedFolder,
    handleFileSelect,
    triggerFileInput,
    fileInputRef,
    
    // File list props
    removeFile,
    clearAll,
    startUpload,
    formatFileSize,
    calculateTotalSize,
    overallProgress,
    uploadComplete,
    setUploadComplete,
    uploadResults,
    selectedProjectName,
    navigateToProject
  } = useUploaderContext();
  
  // Initialize from URL parameters
  useEffect(() => {
    if (initialProject) {
      setSelectedProject(initialProject);
    }
    
    if (initialFolder) {
      setSelectedFolder(initialFolder);
    }
  }, [initialProject, initialFolder, setSelectedProject, setSelectedFolder]);
  
  // Auto-trigger file input when coming from empty project
  useEffect(() => {
    if (initialTrigger && files.length === 0 && !isUploading) {
      triggerFileInput();
    }
  }, [initialTrigger, files.length, isUploading, triggerFileInput]);
  
  return (
    <BatchUploaderContainer>
      <BatchUploaderHeader />
      
      {/* Tabs navigation for uploader */}
      <UploaderTabs
        activeView={activeView}
        setActiveView={setActiveView}
        activeSource={activeSource}
        setActiveSource={setActiveSource}
        tags={tags}
        setTags={setTags}
        licenseType={selectedLicense}
        setLicenseType={setSelectedLicense}
        usageRights={usageRights}
        setUsageRights={setUsageRights}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      
      {/* Upload area component - only shown on source tab */}
      {activeView === 'source' && (
        <SourceContent
          handleFileSelect={handleFileSelect}
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
        />
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
          startUpload={startUpload}
          uploadComplete={uploadComplete}
          setUploadComplete={setUploadComplete}
          uploadResults={uploadResults}
          selectedProject={selectedProject}
          selectedProjectName={selectedProjectName}
          navigateToProject={navigateToProject}
        />
      </div>
    </BatchUploaderContainer>
  );
};

export default BatchUploader;
