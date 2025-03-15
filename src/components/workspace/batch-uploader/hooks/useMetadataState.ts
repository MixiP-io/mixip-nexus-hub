
import { useState } from 'react';
import { UploadSource } from '../types';
import { ViewOption } from '../types/viewOption';

export const useMetadataState = () => {
  const [activeView, setActiveView] = useState<ViewOption>('source');
  const [activeSource, setActiveSource] = useState<UploadSource>('computer');
  const [tags, setTags] = useState('');
  const [licenseType, setLicenseType] = useState('standard');
  const [usageRights, setUsageRights] = useState('commercial');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('root');

  return {
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
  };
};
