
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
    toast.info('Opening uploader for project...');
    
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
      className="bg-gray-800 border-gray-700 overflow-hidden hover:ring-2 hover:ring-green-600 transition-all cursor-pointer"
      onClick={handleClick}
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
            onAddSubfolder={onAddSubfolder}
            onDeleteProject={onDeleteProject}
            onSetCoverImage={onSetCoverImage}
            hasAssets={hasAssets}
          />
        </div>
        
        {/* Subfolder indicator */}
        {hasSubfolders && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-blue-600/50 text-blue-200 border-blue-500 flex items-center">
              <Folder className="mr-1 h-3 w-3" />
              {project.subfolders.length} {project.subfolders.length === 1 ? 'subfolder' : 'subfolders'}
            </Badge>
          </div>
        )}
        
        {/* Empty project indicator with upload button */}
        {totalAssets === 0 && (
          <div className="absolute bottom-2 right-2">
            <Button
              variant="outline"
              size="sm" 
              className="bg-green-600/70 hover:bg-green-600 text-white border-green-500"
              onClick={handleDirectUpload}
            >
              <Upload className="mr-1 h-3 w-3" />
              Upload Files
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center">
              <h3 className="font-medium text-lg mb-1 text-white">{project.name}</h3>
            </div>
            
            {/* Display project description with truncation */}
            {project.description && (
              <p className="text-sm text-gray-300 line-clamp-2 max-w-[90%]">
                {project.description}
              </p>
            )}
            
            <p className="text-sm text-gray-400">
              {totalAssets} assets • Updated {formatUpdatedDate(project.updatedAt)}
            </p>
          </div>
        </div>
        
        {/* Tags display */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
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
          {totalAssets}
        </Badge>
        {totalAssets === 0 ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-green-300 hover:text-green-100 hover:bg-green-800/30"
            onClick={handleDirectUpload}
          >
            <Upload className="mr-1 h-3 w-3" />
            Add Files
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Eye className="mr-1 h-3 w-3" />
            View
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
