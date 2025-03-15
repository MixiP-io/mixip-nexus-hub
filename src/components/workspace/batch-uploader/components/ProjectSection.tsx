
import React, { useState, useEffect } from 'react';
import { ProjectSectionProps } from '../types/componentProps';
import { getProjects, createProject } from '../utils/projectUtils';
import ProjectSelector from './project/ProjectSelector';
import FolderSelector from './project/FolderSelector';
import CreateProjectDialog from './project/CreateProjectDialog';
import CreateFolderDialog from './project/CreateFolderDialog';

const ProjectSection: React.FC<ProjectSectionProps> = ({
  selectedProject,
  setSelectedProject,
  selectedFolder,
  setSelectedFolder
}) => {
  // State for projects and folders
  const [projects, setProjects] = useState<{id: string, name: string}[]>([]);
  
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

  // Load projects
  useEffect(() => {
    const projectData = getProjects();
    setProjects(projectData.map(p => ({ id: p.id, name: p.name })));
    
    // Set default selected project if none is selected
    if (!selectedProject && projectData.length > 0) {
      setSelectedProject(projectData[0].id);
    }
  }, [selectedProject, setSelectedProject]);

  // Handle creating a new project
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject = createProject(newProjectName);
    
    setProjects(prev => [...prev, { id: newProject.id, name: newProject.name }]);
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
        <ProjectSelector 
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          onAddNewClick={() => setNewProjectDialogOpen(true)}
        />
        
        <FolderSelector 
          folders={folders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          onAddNewClick={() => setNewFolderDialogOpen(true)}
        />
      </div>

      <CreateProjectDialog
        isOpen={newProjectDialogOpen}
        setIsOpen={setNewProjectDialogOpen}
        projectName={newProjectName}
        setProjectName={setNewProjectName}
        onCreateProject={handleCreateProject}
      />

      <CreateFolderDialog
        isOpen={newFolderDialogOpen}
        setIsOpen={setNewFolderDialogOpen}
        folderName={newFolderName}
        setFolderName={setNewFolderName}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
};

export default ProjectSection;
