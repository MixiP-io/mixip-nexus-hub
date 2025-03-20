
import React, { useState } from 'react';

import { useFileUpload } from './hooks/useFileUpload';
import { useUrlParamsHandler } from './hooks/useUrlParamsHandler';
import { useUploadTrigger } from './hooks/useUploadTrigger';
import { useSourceSelection } from './hooks/useSourceSelection';
import { useMetadataFields } from './hooks/useMetadataFields';
import { formatFileSize } from './utils/formatUtils';
import { UploaderContext } from './context/UploaderContext';

import BatchUploaderContainer from './components/layout/BatchUploaderContainer';
import BatchUploaderHeader from './components/layout/BatchUploaderHeader';
import UploaderTabs from './components/UploaderTabs';
import SourceContent from './components/content/SourceContent';
import FilesList from './components/FilesList';

const BatchUploader: React.FC = () => {
  // Custom hooks for state management
  const {
    selectedProject,
    setSelectedProject,
    selectedFolder,
    setSelectedFolder,
    triggerFileInput,
    setTriggerFileInput
  } = useUrlParamsHandler();

  const { activeSource, handleSourceChange } = useSourceSelection();
  const { tags, setTags, selectedLicense, setSelectedLicense, usageRights, handleUsageRightsChange } = useMetadataFields();
  const [activeView, setActiveView] = useState<'source' | 'metadata' | 'project'>('source');

  // Main upload hook
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

  // Auto-trigger file input when coming from empty project
  useUploadTrigger(
    triggerFileInput,
    selectedProject,
    files.length,
    isUploading,
    openFileInput,
    setTriggerFileInput
  );

  // Start upload handler with proper validation
  const handleStartUpload = () => {
    if (selectedProject) {
      startUpload(selectedLicense, selectedProject, selectedFolder);
    } else {
      console.error('No project selected for upload');
    }
  };

  // Context value for provider
  const contextValue = {
    files,
    isUploading,
    overallProgress,
    uploadComplete,
    uploadResults,
    handleFileSelect,
    removeFile,
    clearAll,
    startUpload: handleStartUpload,
    setUploadComplete,
    navigateToProject,
    selectedProject,
    selectedProjectName,
    selectedFolder,
    formatFileSize,
    calculateTotalSize
  };

  return (
    <UploaderContext.Provider value={contextValue}>
      <BatchUploaderContainer>
        <BatchUploaderHeader />
        
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
        
        {/* Upload area component - only shown on source tab */}
        {activeView === 'source' && (
          <SourceContent
            handleFileSelect={handleFileSelect}
            triggerFileInput={openFileInput}
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
            startUpload={handleStartUpload}
            uploadComplete={uploadComplete}
            setUploadComplete={setUploadComplete}
            uploadResults={uploadResults}
            selectedProject={selectedProject}
            selectedProjectName={selectedProjectName}
            navigateToProject={navigateToProject}
          />
        </div>
      </BatchUploaderContainer>
    </UploaderContext.Provider>
  );
};

export default BatchUploader;
