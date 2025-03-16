import React, { useEffect } from 'react';
import UploaderTabs from './components/UploaderTabs';
import UploadArea from './components/UploadArea';
import FilesList from './components/FilesList';
import SectionHeader from '../SectionHeader';
import { useFileUpload } from './hooks/useFileUpload';
import { useMetadataState } from './hooks/useMetadataState';
import { formatFileSize } from './utils/fileUtils';
import { logProjects } from './utils/projectUtils';

const BatchUploader: React.FC = () => {
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
    setUploadComplete,
    selectedProject,
    selectedProjectName,
    selectedFolder,
    setSelectedFolder,
    navigateToProject
  } = useFileUpload();

  const {
    activeView,
    setActiveView,
    activeSource,
    setActiveSource,
    tags,
    setTags,
    licenseType,
    setLicenseType,
    usageRights,
    setUsageRights,
    selectedProject: metadataSelectedProject,
    setSelectedProject: setMetadataSelectedProject,
    selectedFolder: metadataSelectedFolder,
    setSelectedFolder: setMetadataSelectedFolder
  } = useMetadataState();
  
  useEffect(() => {
    if (uploadComplete) {
      console.log("BatchUploader: Upload complete state is true", { 
        selectedProject, 
        selectedProjectName,
        selectedFolder 
      });
    }
  }, [uploadComplete, selectedProject, selectedProjectName, selectedFolder]);
  
  useEffect(() => {
    if (metadataSelectedFolder !== selectedFolder) {
      setSelectedFolder(metadataSelectedFolder);
    }
  }, [metadataSelectedFolder, selectedFolder, setSelectedFolder]);
  
  const handleStartUpload = async () => {
    await startUpload(licenseType, metadataSelectedProject, metadataSelectedFolder);
    logProjects();
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <SectionHeader 
        title="Uploader" 
        description="Upload and organize multiple media files with metadata and licensing"
      />
      
      <UploaderTabs
        activeView={activeView}
        setActiveView={setActiveView}
        activeSource={activeSource}
        setActiveSource={setActiveSource}
        tags={tags}
        setTags={setTags}
        licenseType={licenseType}
        setLicenseType={setLicenseType}
        usageRights={usageRights}
        setUsageRights={setUsageRights}
        selectedProject={metadataSelectedProject}
        setSelectedProject={setMetadataSelectedProject}
        selectedFolder={metadataSelectedFolder}
        setSelectedFolder={setMetadataSelectedFolder}
      />
      
      {activeView === 'source' && (
        <UploadArea
          handleFileSelect={handleFileSelect}
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
        />
      )}
      
      {files.length > 0 && (
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
          selectedProject={selectedProject}
          selectedProjectName={selectedProjectName}
          navigateToProject={navigateToProject}
        />
      )}
    </div>
  );
};

export default BatchUploader;
