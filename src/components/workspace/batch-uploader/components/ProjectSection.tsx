
import React from 'react';
import { FolderTree, FileSpreadsheet } from 'lucide-react';
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
  // Sample project and folder data
  const projects = [
    { id: 'project1', name: 'Marketing Campaign Q1' },
    { id: 'project2', name: 'Product Photoshoot' },
    { id: 'project3', name: 'Website Redesign Assets' },
  ];
  
  const folders = [
    { id: 'root', name: 'Project Root' },
    { id: 'images', name: 'Images' },
    { id: 'documents', name: 'Documents' },
    { id: 'videos', name: 'Videos' },
  ];
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Project Assignment</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Select Project</label>
          <Select 
            value={selectedProject} 
            onValueChange={setSelectedProject}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    {project.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Target Folder</label>
          <Select 
            value={selectedFolder} 
            onValueChange={setSelectedFolder}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a folder" />
            </SelectTrigger>
            <SelectContent>
              {folders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  <div className="flex items-center">
                    <FolderTree className="mr-2 h-4 w-4" />
                    {folder.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
