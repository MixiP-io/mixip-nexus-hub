import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectToolbar from './ProjectToolbar';
import ProjectGridView from './ProjectGridView';
import ProjectListView from './ProjectListView';
import CreateProjectDialog from './CreateProjectDialog';
import CreateSubfolderDialog from './CreateSubfolderDialog';
import SetCoverImageDialog from './dialogs/SetCoverImageDialog';
import EditProjectDialog from './dialogs/EditProjectDialog';
import DeleteProjectDialog from './dialogs/DeleteProjectDialog';
import { useProjectsManager } from './hooks/useProjectsManager';
import SectionHeader from '../SectionHeader';

interface ProjectGridProps {
  onProjectSelect: (projectId: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectSelect }) => {
  const {
    projects,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    createProjectOpen,
    setCreateProjectOpen,
    createSubfolderOpen,
    setCreateSubfolderOpen,
    selectedProjectId,
    selectedFolderId,
    setCoverImageOpen,
    setSetCoverImageOpen,
    projectForCoverImage,
    projectAssets,
    editProjectOpen,
    setEditProjectOpen,
    projectToEdit,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    projectToDeleteName,
    handleCreateProject,
    handleProjectClick,
    handleDeleteProject,
    confirmDeleteProject,
    handleEditProject,
    handleAddSubfolder,
    handleFolderCreated,
    handleSetCoverImage,
    handleProjectUpdated,
    loadProjects
  } = useProjectsManager();

  return (
    <div className="p-6">
      <SectionHeader 
        title="Projects" 
        description="Organize and manage your creative projects"
      />
      
      <ProjectToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onCreateProject={() => setCreateProjectOpen(true)}
      />

      {/* Filter tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="cleared">Rights Cleared</TabsTrigger>
          <TabsTrigger value="pending">Rights Pending</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Project Views */}
      {viewMode === 'grid' ? (
        <ProjectGridView 
          projects={projects}
          onProjectClick={(projectId) => {
            handleProjectClick(projectId);
            onProjectSelect(projectId);
          }}
          onEditProject={(projectId, e) => {
            e.stopPropagation();
            handleEditProject(projectId);
          }}
          onAddSubfolder={(projectId, e) => {
            e.stopPropagation();
            handleAddSubfolder(projectId);
          }}
          onDeleteProject={(projectId, e) => {
            e.stopPropagation();
            handleDeleteProject(projectId);
          }}
          onCreateProject={() => setCreateProjectOpen(true)}
          onSetCoverImage={(projectId, e) => {
            e.stopPropagation();
            handleSetCoverImage(projectId);
          }}
        />
      ) : (
        <ProjectListView 
          projects={projects}
          onProjectClick={(projectId) => {
            handleProjectClick(projectId);
            onProjectSelect(projectId);
          }}
          onEditProject={(projectId, e) => {
            e.stopPropagation();
            handleEditProject(projectId);
          }}
          onAddSubfolder={(projectId, e) => {
            e.stopPropagation();
            handleAddSubfolder(projectId);
          }}
          onDeleteProject={(projectId, e) => {
            e.stopPropagation();
            handleDeleteProject(projectId);
          }}
        />
      )}

      {/* Dialogs */}
      <CreateProjectDialog
        isOpen={createProjectOpen}
        setIsOpen={setCreateProjectOpen}
        onCreateProject={handleCreateProject}
      />
      
      {selectedProjectId && (
        <CreateSubfolderDialog
          isOpen={createSubfolderOpen}
          setIsOpen={setCreateSubfolderOpen}
          projectId={selectedProjectId}
          parentFolderId={selectedFolderId}
          onFolderCreated={handleFolderCreated}
        />
      )}
      
      <SetCoverImageDialog
        isOpen={setCoverImageOpen}
        setIsOpen={setSetCoverImageOpen}
        projectId={projectForCoverImage}
        projectAssets={projectAssets}
        onSuccess={loadProjects}
      />
      
      {projectToEdit && (
        <EditProjectDialog
          isOpen={editProjectOpen}
          setIsOpen={setEditProjectOpen}
          project={projectToEdit}
          onUpdateProject={handleProjectUpdated}
        />
      )}
      
      <DeleteProjectDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        projectName={projectToDeleteName}
        onConfirm={confirmDeleteProject}
      />
    </div>
  );
};

export default ProjectGrid;
