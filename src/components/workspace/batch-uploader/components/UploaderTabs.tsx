
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  return (
    <Tabs
      defaultValue={activeView}
      value={activeView}
      onValueChange={(value) => setActiveView(value as ViewOption)}
      className="w-full mb-6"
    >
      <TabsList className="grid grid-cols-3 w-full bg-gray-800">
        <TabsTrigger value="source" className="py-2">Upload Source</TabsTrigger>
        <TabsTrigger value="metadata" className="py-2">Metadata & Rights</TabsTrigger>
        <TabsTrigger value="project" className="py-2">Project Assignment</TabsTrigger>
      </TabsList>

      <TabsContent value="source" className="mt-4 space-y-4">
        <SourceSelection
          activeSource={activeSource}
          setActiveSource={setActiveSource}
        />
      </TabsContent>

      <TabsContent value="metadata" className="mt-4 space-y-4">
        <MetadataSection
          tags={tags}
          setTags={setTags}
          licenseType={licenseType}
          setLicenseType={setLicenseType}
          usageRights={usageRights}
          setUsageRights={setUsageRights}
        />
      </TabsContent>

      <TabsContent value="project" className="mt-4 space-y-4">
        <ProjectSection
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </TabsContent>
    </Tabs>
  );
};

export default UploaderTabs;
