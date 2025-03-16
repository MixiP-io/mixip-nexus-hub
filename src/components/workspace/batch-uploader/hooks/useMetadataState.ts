
import { useState } from 'react';
import { UploadSource } from '../types';

/**
 * Hook for managing metadata state in the batch uploader
 */
export const useMetadataState = () => {
  // Tab management
  const [activeView, setActiveView] = useState<'source' | 'metadata' | 'project'>('source');
  
  // Source management
  const [activeSource, setActiveSource] = useState<UploadSource>('computer');
  
  // Metadata fields
  const [tags, setTags] = useState<string[]>([]);
  const [licenseType, setLicenseType] = useState<string>('standard');
  const [usageRights, setUsageRights] = useState<Record<string, boolean>>({
    'commercial': true,
    'editorial': true,
    'perpetual': true,
    'worldwide': true
  });
  
  // Project selection
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  
  return {
    // Tab state
    activeView,
    setActiveView,
    
    // Source state
    activeSource,
    setActiveSource,
    
    // Metadata state
    tags,
    setTags,
    licenseType,
    setLicenseType,
    usageRights,
    setUsageRights,
    
    // Project state
    selectedProject,
    setSelectedProject,
    selectedFolder,
    setSelectedFolder,
  };
};
