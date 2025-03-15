
import React from 'react';
import { FileSpreadsheet, Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface ProjectSelectorProps {
  projects: { id: string; name: string }[];
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  onAddNewClick: () => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProject,
  setSelectedProject,
  onAddNewClick
}) => {
  return (
    <div>
      <label className="block text-gray-400 mb-2 text-sm">Select Project</label>
      <div className="flex gap-2">
        <Select 
          value={selectedProject} 
          onValueChange={setSelectedProject}
        >
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id} className="text-white hover:bg-gray-600">
                <div className="flex items-center">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  {project.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onAddNewClick}
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectSelector;
