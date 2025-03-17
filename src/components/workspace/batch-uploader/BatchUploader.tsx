import React, { useEffect } from 'react';
import UploaderTabs from './components/UploaderTabs';
import UploadArea from './components/UploadArea';
import FilesList from './components/FilesList';
import SectionHeader from '../SectionHeader';
import { useFileUpload } from './hooks/useFileUpload';
import { useMetadataState } from './hooks/useMetadataState';
import { formatFileSize } from './utils/fileUtils';
import { ensureProjectDataIntegrity } from './utils/data/store/projectIntegrity';
import { toast } from 'sonner';

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
    uploadResults,
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
    ensureProjectDataIntegrity();
    console.log("BatchUploader: Running initial data integrity check");
  }, []);
  
  useEffect(() => {
    if (uploadComplete) {
      console.log("BatchUploader: Upload complete state detected", { 
        uploadComplete,
        uploadResults,
        selectedProject, 
        selectedProjectName,
        selectedFolder 
      });
    }
  }, [uploadComplete, uploadResults, selectedProject, selectedProjectName, selectedFolder]);
  
  useEffect(() => {
    if (metadataSelectedFolder !== selectedFolder) {
      console.log(`Syncing folder selection from metadata (${metadataSelectedFolder}) to fileUpload (${selectedFolder})`);
      setSelectedFolder(metadataSelectedFolder || 'root');
    }
  }, [metadataSelectedFolder, selectedFolder, setSelectedFolder]);
  
  useEffect(() => {
    if (metadataSelectedProject !== selectedProject) {
      console.log(`Syncing project selection from metadata (${metadataSelectedProject}) to fileUpload (${selectedProject})`);
      if (metadataSelectedProject && metadataSelectedProject !== selectedProject) {
        setSelectedFolder('root');
      }
    }
  }, [metadataSelectedProject, selectedProject, setSelectedFolder]);
  
  const handleStartUpload = async () => {
    if (!files.length) {
      toast.error('Please add files to upload');
      return;
    }

    if (!metadataSelectedProject) {
      toast.error('Please select a project to upload to');
      return;
    }

    // Log the folder ID that we're using to make sure it's correct
    const folderToUse = metadataSelectedFolder || 'root';
    console.log(`Starting upload with: Project=${metadataSelectedProject}, Folder=${folderToUse}, License=${licenseType}`);
    
    try {
      await startUpload(licenseType, metadataSelectedProject, folderToUse);
    } catch (error) {
      console.error('Error starting upload:', error);
      toast.error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  return (
    <div className="w-full px-6 py-6">
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
          uploadResults={uploadResults}
          selectedProject={metadataSelectedProject || selectedProject}
          selectedProjectName={selectedProjectName}
          navigateToProject={navigateToProject}
        />
      )}
    </div>
  );
};

export default BatchUploader;
