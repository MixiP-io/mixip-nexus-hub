
import React from 'react';
import { Plus, Image } from 'lucide-react';

// Sample project data
const projects = [
  {
    id: 1,
    title: "Belize Vacation",
    assets: 32,
    updated: "2 days ago",
    image: "/lovable-uploads/20e270e7-8a94-400d-a3c5-560f432fd5ba.png"
  },
  {
    id: 2,
    title: "Brand Photoshoot",
    assets: 18,
    updated: "1 week ago",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Client Presentation",
    assets: 8,
    updated: "yesterday",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Nature Collection",
    assets: 56,
    updated: "3 days ago",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Stock Collection",
    assets: 114,
    updated: "today",
    image: "/placeholder.svg"
  }
];

const ProjectGrid: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => (
        <div key={project.id} className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer">
          <div className="h-40 bg-gray-700 relative">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg text-white mb-1">{project.title}</h3>
            <p className="text-sm text-gray-300">
              {project.assets} assets • Updated {project.updated}
            </p>
          </div>
          <div className="px-4 py-3 border-t border-gray-700 flex justify-between items-center">
            <div className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full flex items-center">
              <Image className="w-3 h-3 mr-1" />
              {project.assets}
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
