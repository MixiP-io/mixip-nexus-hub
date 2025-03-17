
import React from 'react';
import { cn } from '@/lib/utils';
import { ViewOption } from '../types/viewOption';
import SourceSelection from './SourceSelection';
import MetadataSection from './MetadataSection';
import ProjectSection from './ProjectSection';
import { UploadSource } from '../types';

interface UploaderTabsProps {
  activeView: ViewOption;
  setActiveView: (view: ViewOption) => void;
  activeSource: 'computer' | 'phone' | 'local';
  setActiveSource: (source: UploadSource) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  licenseType: string;
  setLicenseType: (license: string) => void;
  usageRights: Record<string, boolean>;
  setUsageRights: (rights: Record<string, boolean>) => void;
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
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
