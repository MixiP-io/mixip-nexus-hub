
import React from 'react';
import SectionHeader from '../SectionHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProjectToolbar from './ProjectToolbar';
import ProjectGridView from './ProjectGridView';
import ProjectListView from './ProjectListView';
import CreateProjectDialog from './CreateProjectDialog';
import CreateSubfolderDialog from './CreateSubfolderDialog';
import SetCoverImageDialog from './dialogs/SetCoverImageDialog';
import EditProjectDialog from './dialogs/EditProjectDialog';
import DeleteProjectDialog from './dialogs/DeleteProjectDialog';
import { useProjectsManager } from './hooks/useProjectsManager';
import { ProjectData } from '../batch-uploader/utils/types/projectTypes';

interface ProjectGridProps {
  onProjectSelect: (projectId: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectSelect }) => {
  // All the properties and functions are still available from our refactored hook
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

  // Wrapper for project update handling to prevent navigation
  const handleUpdateProject = (updates: Partial<ProjectData>) => {
    if (projectToEdit) {
      handleProjectUpdated(projectToEdit.id, updates);
    }
  };

  return (
    <div className="p-6">
      {/* Header with search and actions */}
      <div className="mb-6">
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
      </div>

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
      
      {/* Dialog for setting cover image */}
      <SetCoverImageDialog
        isOpen={setCoverImageOpen}
        setIsOpen={setSetCoverImageOpen}
        projectId={projectForCoverImage}
        projectAssets={projectAssets}
        onSuccess={loadProjects}
      />
      
      {/* Dialog for editing project */}
      {projectToEdit && (
        <EditProjectDialog
          isOpen={editProjectOpen}
          setIsOpen={setEditProjectOpen}
          project={projectToEdit}
          onUpdateProject={handleUpdateProject}
        />
      )}
      
      {/* Delete confirmation dialog */}
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
