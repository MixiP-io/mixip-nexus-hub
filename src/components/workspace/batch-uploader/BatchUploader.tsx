
import React from 'react';
import SourceSelection from './components/SourceSelection';
import MetadataSection from './components/MetadataSection';
import ProjectSection from './components/ProjectSection';
import UploadArea from './components/UploadArea';
import FilesList from './components/FilesList';
import { useFileUpload } from './hooks/useFileUpload';
import { useMetadataState } from './hooks/useMetadataState';
import { formatFileSize } from './utils/fileUtils';

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
  
  const handleStartUpload = () => {
    startUpload(licenseType, selectedProject);
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
          startUpload={handleStartUpload}
        />
      )}
    </div>
  );
};

export default BatchUploader;
