
import React from 'react';
import { Briefcase, FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectSectionProps {
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  selectedProject,
  setSelectedProject,
  selectedFolder,
  setSelectedFolder
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <Briefcase className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-medium">Project Assignment</h3>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-green-400" />
            <Label htmlFor="project">Select Project</Label>
          </div>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="">Select a project</SelectItem>
              <SelectItem value="project-alpha">Project Alpha</SelectItem>
              <SelectItem value="brand-campaign-2023">Brand Campaign 2023</SelectItem>
              <SelectItem value="product-launch">Product Launch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="folder">Folder (Optional)</Label>
          </div>
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select a folder" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="root">Root folder</SelectItem>
              <SelectItem value="images">Images</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
              <SelectItem value="documents">Documents</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            className="w-full border-dashed flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
