import React, { useState } from 'react';
import { FolderTree, FileSpreadsheet, Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ProjectSectionProps } from '../types/componentProps';

const ProjectSection: React.FC<ProjectSectionProps> = ({
  selectedProject,
  setSelectedProject,
  selectedFolder,
  setSelectedFolder
}) => {
  // Sample project and folder data
  const [projects, setProjects] = useState([
    { id: 'project1', name: 'Marketing Campaign Q1' },
    { id: 'project2', name: 'Product Photoshoot' },
    { id: 'project3', name: 'Website Redesign Assets' },
  ]);
  
  const [folders, setFolders] = useState([
    { id: 'root', name: 'Project Root' },
    { id: 'images', name: 'Images' },
    { id: 'documents', name: 'Documents' },
    { id: 'videos', name: 'Videos' },
  ]);

  // State for creating new projects and folders
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');

  // Handle creating a new project
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject = {
      id: `project-${Date.now()}`,
      name: newProjectName
    };
    
    setProjects([...projects, newProject]);
    setSelectedProject(newProject.id);
    setNewProjectName('');
    setNewProjectDialogOpen(false);
  };

  // Handle creating a new folder
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName
    };
    
    setFolders([...folders, newFolder]);
    setSelectedFolder(newFolder.id);
    setNewFolderName('');
    setNewFolderDialogOpen(false);
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="space-y-4">
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
              onClick={() => setNewProjectDialogOpen(true)}
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Target Folder</label>
          <div className="flex gap-2">
            <Select 
              value={selectedFolder} 
              onValueChange={setSelectedFolder}
              defaultValue="root"
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id} className="text-white hover:bg-gray-600">
                    <div className="flex items-center">
                      <FolderTree className="mr-2 h-4 w-4" />
                      {folder.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setNewFolderDialogOpen(true)}
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* New Project Dialog */}
      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Folder Name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleCreateFolder}>Create Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectSection;
