
import React, { useState, useEffect } from 'react';
import { Plus, Image, FolderOpen } from 'lucide-react';
import { getProjects } from '../workspace/batch-uploader/utils/services/projectService';

const ProjectGrid: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Try to load projects from service, fallback to sample data if none
    const loadedProjects = getProjects();
    
    if (loadedProjects && loadedProjects.length > 0) {
      setProjects(loadedProjects);
    } else {
      // Use sample project data as fallback
      setProjects([
        {
          id: 1,
          name: "Belize Vacation",
          assets: new Array(32),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          coverImage: "/lovable-uploads/20e270e7-8a94-400d-a3c5-560f432fd5ba.png"
        },
        {
          id: 2,
          name: "Brand Photoshoot",
          assets: new Array(18),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          coverImage: "/placeholder.svg"
        },
        {
          id: 3,
          name: "Client Presentation",
          assets: new Array(8),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          coverImage: "/placeholder.svg"
        },
        {
          id: 4,
          name: "Nature Collection",
          assets: new Array(56),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          coverImage: "/placeholder.svg"
        },
        {
          id: 5,
          name: "Stock Collection",
          assets: new Array(114),
          updatedAt: new Date(),
          coverImage: "/placeholder.svg"
        }
      ]);
    }
  }, []);

  const formatUpdatedTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => (
        <div key={project.id} className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer">
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
              {project.assets ? project.assets.length : 0} assets • Updated {
                project.updatedAt ? formatUpdatedTime(project.updatedAt) : "recently"
              }
            </p>
          </div>
          <div className="px-4 py-3 border-t border-gray-700 flex justify-between items-center">
            <div className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full flex items-center">
              <Image className="w-3 h-3 mr-1" />
              {project.assets ? project.assets.length : 0}
            </div>
          </div>
        </div>
      ))}
      
      {/* Create New Project Card */}
      <div className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer">
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
