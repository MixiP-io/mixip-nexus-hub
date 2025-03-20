
import React from 'react';
import { Eye, FolderOpen, Users, User, Image, Folder, Upload } from 'lucide-react';
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
import { getTotalAssetsCount } from '../utils/assetCountUtils';
import { toast } from 'sonner';

interface ProjectCardProps {
  project: any;
  onProjectClick: (projectId: string) => void;
  onEditProject: (projectId: string, e: React.MouseEvent) => void;
  onAddSubfolder: (projectId: string, e: React.MouseEvent) => void;
  onDeleteProject: (projectId: string, e: React.MouseEvent) => void;
  onSetCoverImage?: (projectId: string, e: React.MouseEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onProjectClick,
  onEditProject,
  onAddSubfolder,
  onDeleteProject,
  onSetCoverImage
}) => {
  const hasAssets = project.assets && project.assets.length > 0;
  const hasSubfolders = project.subfolders && project.subfolders.length > 0;
  const totalAssets = getTotalAssetsCount(project);
  
  // Handle click on the project card
  const handleClick = () => {
    console.log('Project card clicked:', project.id);
    onProjectClick(project.id);
  };
  
  // Handle direct navigation to uploader
  const handleDirectUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('[CRITICAL] Direct upload button clicked for project:', project.id);
    toast.info('Opening uploader for project...', {
      position: 'top-center',
    });
    
    setTimeout(() => {
      const origin = window.location.origin;
      const url = `${origin}/dashboard/workspace?tab=uploader&project=${project.id}&fromEmptyProject=true`;
      window.location.href = url;
    }, 100);
  };
  
  // Format the updated date
  const formatUpdatedDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Unknown date';
    }
  };
  
  return (
    <Card 
      key={project.id} 
      className="bg-frameio-bg-card border-frameio-border-subtle overflow-hidden hover:ring-1 hover:ring-frameio-accent-blue transition-all cursor-pointer shadow-frame-card transform hover:translate-y-[-2px]"
      onClick={handleClick}
    >
      <div className="h-40 bg-frameio-bg-dark relative">
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-frameio-bg-card to-frameio-bg-dark">
            <FolderOpen className="w-16 h-16 text-frameio-text-tertiary opacity-50" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <ProjectCardDropdownMenu 
            projectId={project.id}
            onEditProject={onEditProject}
            onAddSubfolder={onAddSubfolder}
            onDeleteProject={onDeleteProject}
            onSetCoverImage={onSetCoverImage}
            hasAssets={hasAssets}
          />
        </div>
        
        {/* Subfolder indicator */}
        {hasSubfolders && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-frameio-accent-blue/30 text-frameio-text-primary border-frameio-accent-blue/50 flex items-center backdrop-blur-sm">
              <Folder className="mr-1 h-3 w-3" />
              {project.subfolders.length} {project.subfolders.length === 1 ? 'subfolder' : 'subfolders'}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center">
              <h3 className="font-medium text-lg mb-1 text-frameio-text-primary">{project.name}</h3>
            </div>
            
            {/* Display project description with truncation */}
            {project.description && (
              <p className="text-sm text-frameio-text-secondary line-clamp-2 max-w-[90%]">
                {project.description}
              </p>
            )}
            
            <p className="text-sm text-frameio-text-tertiary">
              {totalAssets} assets • Updated {formatUpdatedDate(project.updatedAt)}
            </p>
          </div>
        </div>
        
        {/* Tags display */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-frameio-bg-highlight text-frameio-text-secondary border-frameio-border-subtle text-xs py-0.5">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="bg-frameio-bg-highlight text-frameio-text-secondary border-frameio-border-subtle text-xs py-0.5">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {/* Ownership indicators */}
        {project.owners && project.owners.length > 0 && (
          <div className="mt-3 flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-frameio-text-secondary bg-frameio-bg-highlight px-2 py-1 rounded-md text-xs">
                    {project.owners.length > 1 ? (
                      <Users className="h-3 w-3 mr-1" />
                    ) : (
                      <User className="h-3 w-3 mr-1" />
                    )}
                    <span>
                      {project.owners.length > 1 
                        ? `${project.owners.length} owners` 
                        : project.owners[0].name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-frameio-bg-dark border-frameio-border-subtle p-3 shadow-frame-dropdown">
                  <div className="space-y-2">
                    <p className="text-xs text-frameio-text-secondary mb-1">Ownership Split</p>
                    {project.owners.map((owner: any) => (
                      <div key={owner.userId} className="flex justify-between text-sm">
                        <span className="text-frameio-text-primary">{owner.name}</span>
                        <span className="ml-4 font-medium text-frameio-accent-blue">{owner.royaltyPercentage}%</span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-frameio-border-subtle flex justify-between">
        <Badge variant="outline" className="bg-frameio-bg-highlight text-frameio-text-secondary border-none">
          <Image className="mr-1 h-3 w-3" />
          {totalAssets}
        </Badge>
        {totalAssets === 0 ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-frameio-accent-green hover:text-green-300 hover:bg-frameio-accent-green/10"
            onClick={handleDirectUpload}
          >
            <Upload className="mr-1 h-3 w-3" />
            Add Assets
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-frameio-text-secondary hover:text-frameio-text-primary hover:bg-frameio-bg-highlight"
          >
            <Eye className="mr-1 h-3 w-3" />
            View
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
