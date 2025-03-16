
import React from 'react';
import ProjectCard from './components/ProjectCard';
import CreateProjectCard from './components/CreateProjectCard';

interface ProjectGridViewProps {
  projects: any[];
  onProjectClick: (projectId: string) => void;
  onEditProject: (projectId: string, e: React.MouseEvent) => void;
  onAddSubfolder: (projectId: string, e: React.MouseEvent) => void;
  onDeleteProject: (projectId: string, e: React.MouseEvent) => void;
  onCreateProject: () => void;
  onSetCoverImage?: (projectId: string, e: React.MouseEvent) => void;
}

const ProjectGridView: React.FC<ProjectGridViewProps> = ({
  projects,
  onProjectClick,
  onEditProject,
  onAddSubfolder,
  onDeleteProject,
  onCreateProject,
  onSetCoverImage
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onProjectClick={onProjectClick}
          onEditProject={onEditProject}
          onAddSubfolder={onAddSubfolder}
          onDeleteProject={onDeleteProject}
          onSetCoverImage={onSetCoverImage}
        />
      ))}
      
      {/* Create New Project Card */}
      <CreateProjectCard onCreateProject={onCreateProject} />
    </div>
  );
};

export default ProjectGridView;
