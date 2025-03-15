
import React from 'react';
import { cn } from '@/lib/utils';
import { ViewOption } from '../types/viewOption';
import SourceSelection from './SourceSelection';
import MetadataSection from './MetadataSection';
import ProjectSection from './ProjectSection';
import { SourceSelectionProps } from '../types/componentProps';
import { MetadataSectionProps } from '../types/componentProps';
import { ProjectSectionProps } from '../types/componentProps';

interface UploaderTabsProps extends 
  SourceSelectionProps, 
  MetadataSectionProps, 
  ProjectSectionProps {
  activeView: ViewOption;
  setActiveView: (view: ViewOption) => void;
}

const UploaderTabs: React.FC<UploaderTabsProps> = ({
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
}) => {
  const tabs = [
    { id: 'source', label: 'Upload Source' },
    { id: 'metadata', label: 'Metadata & Rights' },
    { id: 'project', label: 'Project Assignment' }
  ];

  // Render the active content based on the active view
  const renderContent = () => {
    switch (activeView) {
      case 'source':
        return (
          <SourceSelection
            activeSource={activeSource}
            setActiveSource={setActiveSource}
          />
        );
      case 'metadata':
        return (
          <MetadataSection
            tags={tags}
            setTags={setTags}
            licenseType={licenseType}
            setLicenseType={setLicenseType}
            usageRights={usageRights}
            setUsageRights={setUsageRights}
          />
        );
      case 'project':
        return (
          <ProjectSection
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <div className="border-b border-gray-800 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "pb-4 px-1 font-medium text-base relative transition-colors",
                activeView === tab.id
                  ? "text-white" 
                  : "text-gray-400 hover:text-gray-300"
              )}
              onClick={() => setActiveView(tab.id as ViewOption)}
            >
              {tab.label}
              {activeView === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default UploaderTabs;
