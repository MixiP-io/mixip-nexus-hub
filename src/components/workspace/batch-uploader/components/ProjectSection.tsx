
import React, { useState, useEffect } from 'react';
import { ProjectSectionProps } from '../types/componentProps';
import { getProjects, createProject, getAllFoldersForProject, createSubfolder } from '../utils/projectUtils';
import ProjectSelector from './project/ProjectSelector';
import FolderSelector from './project/FolderSelector';
import CreateProjectDialog from './project/CreateProjectDialog';
import CreateFolderDialog from './project/CreateFolderDialog';
import CreateSubfolderDialog from '../../projects/CreateSubfolderDialog';

const ProjectSection: React.FC<ProjectSectionProps> = ({
  selectedProject,
  setSelectedProject,
  selectedFolder,
  setSelectedFolder
}) => {
  // State for projects and folders
  const [projects, setProjects] = useState<{id: string, name: string}[]>([]);
  const [folders, setFolders] = useState<{id: string, name: string, parentId?: string}[]>([]);
  
  // State for creating new projects and folders
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newSubfolderDialogOpen, setNewSubfolderDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [parentFolderId, setParentFolderId] = useState<string | undefined>(undefined);

  // Load projects
  useEffect(() => {
    const projectData = getProjects();
    console.log('Loading projects:', projectData.length);
    setProjects(projectData.map(p => ({ id: p.id, name: p.name })));
    
    // Set default selected project if none is selected
    if (!selectedProject && projectData.length > 0) {
      setSelectedProject(projectData[0].id);
    }
  }, [selectedProject, setSelectedProject]);
  
  // Load folders for selected project
  useEffect(() => {
    if (selectedProject) {
      console.log(`Loading folders for project: ${selectedProject}`);
      const folderData = getAllFoldersForProject(selectedProject);
      console.log('Folders data:', folderData);
      setFolders(folderData);
      
      // Set default selected folder if none is selected or if selected folder doesn't exist
      if (!selectedFolder || !folderData.find(f => f.id === selectedFolder)) {
        console.log('Setting default folder to root');
        setSelectedFolder('root');
      }
    }
  }, [selectedProject, selectedFolder, setSelectedFolder]);

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
    if (!newFolderName.trim() || !selectedProject) return;
    
    console.log(`Creating new folder: ${newFolderName} in project: ${selectedProject}`);
    const newFolder = createSubfolder(selectedProject, newFolderName);
    
    if (newFolder) {
      console.log(`New folder created: ${newFolder.id}`);
      // Refresh folders
      const updatedFolders = getAllFoldersForProject(selectedProject);
      setFolders(updatedFolders);
      setSelectedFolder(newFolder.id);
    } else {
      console.error('Failed to create folder');
    }
    
    setNewFolderName('');
    setNewFolderDialogOpen(false);
  };
  
  // Handle creating a subfolder
  const handleCreateSubfolder = () => {
    setNewSubfolderDialogOpen(false);
    
    // Refresh folders after creation
    if (selectedProject) {
      const updatedFolders = getAllFoldersForProject(selectedProject);
      setFolders(updatedFolders);
    }
  };
  
  // Open subfolder dialog
  const handleSubfolderClick = (parentId: string) => {
    console.log(`Opening subfolder dialog for parent: ${parentId}`);
    setParentFolderId(parentId);
    setNewSubfolderDialogOpen(true);
  };
  
  // Debug current selections
  useEffect(() => {
    console.log(`Current selection - Project: ${selectedProject}, Folder: ${selectedFolder}`);
  }, [selectedProject, selectedFolder]);
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="space-y-4">
        <ProjectSelector 
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={(projectId) => {
            console.log(`Project selector changed to: ${projectId}`);
            setSelectedProject(projectId);
            // Reset folder selection when project changes
            setSelectedFolder('root');
          }}
          onAddNewClick={() => setNewProjectDialogOpen(true)}
        />
        
        <FolderSelector 
          folders={folders}
          selectedFolder={selectedFolder}
          setSelectedFolder={(folderId) => {
            console.log(`Folder selector changed to: ${folderId}`);
            setSelectedFolder(folderId);
          }}
          onAddNewClick={() => setNewFolderDialogOpen(true)}
          onCreateSubfolderClick={handleSubfolderClick}
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
      
      {selectedProject && (
        <CreateSubfolderDialog
          isOpen={newSubfolderDialogOpen}
          setIsOpen={setNewSubfolderDialogOpen}
          projectId={selectedProject}
          parentFolderId={parentFolderId}
          onFolderCreated={handleCreateSubfolder}
        />
      )}
    </div>
  );
};

export default ProjectSection;
