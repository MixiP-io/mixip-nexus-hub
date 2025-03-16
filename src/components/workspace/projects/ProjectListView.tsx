
import React from 'react';
import { Eye, Pencil, Trash, FolderOpen, Users, User, FolderPlus, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProjectListViewProps {
  projects: any[];
  onProjectClick: (projectId: string) => void;
  onEditProject: (projectId: string, e: React.MouseEvent) => void;
  onAddSubfolder: (projectId: string, e: React.MouseEvent) => void;
  onDeleteProject: (projectId: string, e: React.MouseEvent) => void;
}

const ProjectListView: React.FC<ProjectListViewProps> = ({
  projects,
  onProjectClick,
  onEditProject,
  onAddSubfolder,
  onDeleteProject
}) => {
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
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-900 border-b border-gray-700">
          <tr>
            <th className="text-left p-4 font-medium text-gray-400">Name</th>
            <th className="text-left p-4 font-medium text-gray-400">Description</th>
            <th className="text-left p-4 font-medium text-gray-400">Assets</th>
            <th className="text-left p-4 font-medium text-gray-400">Subfolders</th>
            <th className="text-left p-4 font-medium text-gray-400">Ownership</th>
            <th className="text-left p-4 font-medium text-gray-400">Last Updated</th>
            <th className="text-left p-4 font-medium text-gray-400">Tags</th>
            <th className="text-right p-4 font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr 
              key={project.id} 
              className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
              onClick={() => onProjectClick(project.id)}
            >
              <td className="p-4">
                <div className="flex items-center">
                  <FolderOpen className="mr-3 h-5 w-5 text-gray-400" />
                  <span>{project.name}</span>
                </div>
              </td>
              <td className="p-4 max-w-xs">
                <p className="line-clamp-1 text-gray-300">{project.description || '—'}</p>
              </td>
              <td className="p-4">{project.assets ? project.assets.length : 0}</td>
              <td className="p-4">
                {project.subfolders && project.subfolders.length > 0 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-600/30 flex items-center">
                          <Folder className="mr-1 h-3 w-3" />
                          {project.subfolders.length}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 border-gray-700 p-2 max-w-sm">
                        <div className="space-y-1">
                          <p className="font-medium">Subfolders:</p>
                          {project.subfolders.map((folder: any) => (
                            <div key={folder.id} className="text-xs pl-2 border-l border-gray-700">
                              {folder.name}
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  "0"
                )}
              </td>
              <td className="p-4">
                {project.owners && project.owners.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          {project.owners.length > 1 ? (
                            <Users className="h-4 w-4 mr-1" />
                          ) : (
                            <User className="h-4 w-4 mr-1" />
                          )}
                          <span>
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
                )}
              </td>
              <td className="p-4">{formatUpdatedDate(project.updatedAt)}</td>
              <td className="p-4">
                {project.tags && project.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 2 && (
                      <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                        +{project.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                ) : (
                  "—"
                )}
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProjectClick(project.id);
                    }}
                    title="View Project"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={(e) => onEditProject(project.id, e)}
                    title="Edit Project Details"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={(e) => onAddSubfolder(project.id, e)}
                    title="Add Subfolder"
                  >
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => onDeleteProject(project.id, e)}
                    title="Delete Project"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/40"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListView;
