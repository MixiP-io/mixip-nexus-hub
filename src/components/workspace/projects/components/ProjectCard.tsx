
import React from 'react';
import { Eye, FolderOpen, Users, User, Image } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ProjectCardDropdownMenu from './ProjectCardDropdownMenu';

interface ProjectCardProps {
  project: any;
  onProjectClick: (projectId: string) => void;
  onEditProject: (projectId: string, e: React.MouseEvent) => void;
  onDeleteProject: (projectId: string, e: React.MouseEvent) => void;
  onSetCoverImage?: (projectId: string, e: React.MouseEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onProjectClick,
  onEditProject,
  onDeleteProject,
  onSetCoverImage
}) => {
  const hasAssets = project.assets && project.assets.length > 0;
  
  return (
    <Card 
      key={project.id} 
      className="bg-gray-800 border-gray-700 overflow-hidden hover:ring-2 hover:ring-green-600 transition-all cursor-pointer"
      onClick={() => onProjectClick(project.id)}
    >
      <div className="h-40 bg-gray-700 relative">
        {project.coverImage ? (
          <img 
            src={project.coverImage} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
        ) : hasAssets && project.assets[0].preview ? (
          <img 
            src={project.assets[0].preview} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderOpen className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <ProjectCardDropdownMenu 
            projectId={project.id}
            onEditProject={onEditProject}
            onDeleteProject={onDeleteProject}
            onSetCoverImage={onSetCoverImage}
            hasAssets={hasAssets}
          />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-lg mb-1 text-white">{project.name}</h3>
              {project.subfolders && project.subfolders.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="ml-2 bg-blue-600/20 text-blue-400 border-blue-600/30">
                        {project.subfolders.length} {project.subfolders.length === 1 ? 'folder' : 'folders'}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700">
                      <p>Contains subfolders</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-sm text-gray-300">
              {project.assets ? project.assets.length : 0} assets • Updated {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {/* Ownership indicators */}
        {project.owners && project.owners.length > 0 && (
          <div className="mt-3 flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-gray-300">
                    {project.owners.length > 1 ? (
                      <Users className="h-4 w-4 mr-1" />
                    ) : (
                      <User className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs">
                      {project.owners.length > 1 
                        ? `${project.owners.length} owners` 
                        : project.owners[0].name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 p-2">
                  <div className="space-y-1">
                    {project.owners.map((owner: any) => (
                      <div key={owner.userId} className="flex justify-between text-xs">
                        <span>{owner.name}</span>
                        <span className="ml-4 font-medium">{owner.royaltyPercentage}%</span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-gray-700 flex justify-between">
        <Badge variant="outline" className="bg-gray-700 text-gray-200">
          <Image className="mr-1 h-3 w-3" />
          {project.assets ? project.assets.length : 0}
        </Badge>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
          <Eye className="mr-1 h-3 w-3" />
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
