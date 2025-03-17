import React from 'react';
import { Plus, Image, FolderOpen } from 'lucide-react';
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
      toast.info('Project has no assets. Redirecting to uploader...');
      
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
            className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="h-40 bg-gray-700 relative">
              {project.coverImage ? (
                <img 
                  src={project.coverImage} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FolderOpen className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-white mb-1">{project.name}</h3>
              <p className="text-sm text-gray-300">
                {totalAssets} assets • Updated {
                  project.updatedAt ? formatUpdatedTime(new Date(project.updatedAt)) : "recently"
                }
              </p>
            </div>
            <div className="px-4 py-3 border-t border-gray-700 flex justify-between items-center">
              <div className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full flex items-center">
                <Image className="w-3 h-3 mr-1" />
                {totalAssets}
              </div>
            </div>
          </div>
        );
      })}
      
      <div 
        className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer"
        onClick={handleCreateProject}
      >
        <div className="h-40 bg-gray-700 flex items-center justify-center">
          <Plus className="w-10 h-10 text-gray-400" />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg text-white mb-1">Create New Project</h3>
          <p className="text-sm text-gray-300">
            Start organizing your assets
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
