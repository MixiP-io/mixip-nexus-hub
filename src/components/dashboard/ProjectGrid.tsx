
import React from 'react';
import { Plus, Image, FolderOpen, Star, Calendar } from 'lucide-react';
import { useProjectsManager } from '../workspace/projects/hooks/useProjectsManager';
import { useNavigate } from 'react-router-dom';
import { getTotalAssetsCount } from '../workspace/projects/utils/assetCountUtils';
import { toast } from 'sonner';

const ProjectGrid: React.FC = () => {
  const { projects } = useProjectsManager();
  const navigate = useNavigate();

  const formatUpdatedTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  };

  const handleProjectClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    const totalAssets = project ? getTotalAssetsCount(project) : 0;
    
    if (totalAssets === 0) {
      console.log('[CRITICAL] Project has no assets, redirecting to uploader:', projectId);
      toast.info('Project has no assets. Redirecting to uploader...', {
        position: 'top-center',
      });
      
      setTimeout(() => {
        const origin = window.location.origin;
        const url = `${origin}/dashboard/workspace?tab=uploader&project=${projectId}&fromEmptyProject=true`;
        window.location.href = url;
      }, 100);
    } else {
      navigate(`/dashboard/workspace?tab=assets&project=${projectId}`);
    }
  };

  const handleCreateProject = () => {
    navigate('/dashboard/workspace?tab=projects&action=new');
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => {
        const totalAssets = getTotalAssetsCount(project);
        
        return (
          <div 
            key={project.id} 
            className="bg-frameio-bg-card rounded-xl overflow-hidden hover:ring-2 hover:ring-frameio-accent-blue transition-all cursor-pointer shadow-frame-card transform hover:translate-y-[-2px]"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="h-40 bg-frameio-bg-dark relative">
              {project.coverImage ? (
                <img 
                  src={project.coverImage} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-frameio-bg-card to-frameio-bg-dark">
                  <FolderOpen className="w-16 h-16 text-frameio-text-tertiary opacity-50" />
                </div>
              )}
              
              {/* Star feature - visual only */}
              <button className="absolute top-2 right-2 bg-frameio-bg-card/60 backdrop-blur-sm p-1.5 rounded-full hover:bg-frameio-bg-card/80 transition-colors">
                <Star className="h-4 w-4 text-frameio-text-tertiary hover:text-frameio-accent-yellow" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-frameio-text-primary mb-1">{project.name}</h3>
              <p className="text-sm text-frameio-text-secondary line-clamp-2 mb-2">
                {project.description || 'No description provided'}
              </p>
              <p className="text-sm text-frameio-text-tertiary flex items-center">
                <Image className="h-3.5 w-3.5 mr-1.5" />
                <span>{totalAssets} assets</span>
                <span className="mx-2">•</span>
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                <span>
                  {project.updatedAt ? formatUpdatedTime(new Date(project.updatedAt)) : "recently"}
                </span>
              </p>
            </div>
            <div className="px-4 py-3 border-t border-frameio-border-subtle flex justify-between items-center">
              <div className="text-xs bg-frameio-bg-highlight text-frameio-text-secondary px-2.5 py-1 rounded-full flex items-center">
                <Image className="w-3 h-3 mr-1" />
                {totalAssets}
              </div>
              <button className="text-frameio-accent-blue text-sm font-medium hover:underline">
                {totalAssets > 0 ? 'View Project' : 'Add Assets'}
              </button>
            </div>
          </div>
        );
      })}
      
      <div 
        className="bg-frameio-bg-card rounded-xl overflow-hidden hover:ring-2 hover:ring-frameio-accent-blue border-2 border-dashed border-frameio-border-subtle transition-all cursor-pointer shadow-frame-card animate-pulse-glow transform hover:translate-y-[-2px]"
        onClick={handleCreateProject}
      >
        <div className="h-40 flex items-center justify-center bg-gradient-to-br from-frameio-bg-card to-frameio-bg-dark">
          <Plus className="w-12 h-12 text-frameio-accent-blue opacity-70" />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg text-frameio-text-primary mb-1">Create New Project</h3>
          <p className="text-sm text-frameio-text-secondary">
            Start organizing your assets in a new project
          </p>
        </div>
        <div className="px-4 py-3 border-t border-frameio-border-subtle">
          <div className="text-xs bg-frameio-accent-blue/20 text-frameio-accent-blue px-2.5 py-1 rounded-full inline-flex items-center">
            <Plus className="w-3 h-3 mr-1" />
            New Project
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
