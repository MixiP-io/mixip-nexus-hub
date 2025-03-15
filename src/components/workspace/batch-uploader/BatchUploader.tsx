
import React from 'react';
import UploaderTabs from './components/UploaderTabs';
import UploadArea from './components/UploadArea';
import FilesList from './components/FilesList';
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
    calculateTotalSize
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
    selectedProject,
    setSelectedProject,
    selectedFolder,
    setSelectedFolder
  } = useMetadataState();
  
  const handleStartUpload = async () => {
    // Ensure we're passing the correct license type to startUpload
    await startUpload(licenseType, selectedProject);
    
    // Log projects after upload (for debugging)
    logProjects();
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Batch Upload</h2>
        <p className="text-white/80">Upload and organize multiple media files with metadata and licensing</p>
      </div>
      
      {/* Sub Navigation Tabs */}
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
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      
      {/* Only show upload area on source view */}
      {activeView === 'source' && (
        <UploadArea
          handleFileSelect={handleFileSelect}
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
        />
      )}
      
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
          startUpload={handleStartUpload}
        />
      )}
    </div>
  );
};

export default BatchUploader;
