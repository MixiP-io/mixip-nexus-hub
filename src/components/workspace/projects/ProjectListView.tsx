
import React from 'react';
import { Eye, Pencil, Trash, FolderOpen, Users, User, FolderPlus } from 'lucide-react';
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
  onDeleteProject: (projectId: string, e: React.MouseEvent) => void;
}

const ProjectListView: React.FC<ProjectListViewProps> = ({
  projects,
  onProjectClick,
  onEditProject,
  onDeleteProject
}) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-900 border-b border-gray-700">
          <tr>
            <th className="text-left p-4 font-medium text-gray-400">Name</th>
            <th className="text-left p-4 font-medium text-gray-400">Assets</th>
            <th className="text-left p-4 font-medium text-gray-400">Subfolders</th>
            <th className="text-left p-4 font-medium text-gray-400">Ownership</th>
            <th className="text-left p-4 font-medium text-gray-400">Last Updated</th>
            <th className="text-left p-4 font-medium text-gray-400">Rights Status</th>
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
              <td className="p-4">{project.assets ? project.assets.length : 0}</td>
              <td className="p-4">
                {project.subfolders && project.subfolders.length > 0 ? (
                  <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                    {project.subfolders.length}
                  </Badge>
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
              <td className="p-4">{new Date(project.updatedAt).toLocaleDateString()}</td>
              <td className="p-4">
                <Badge className="bg-yellow-600 hover:bg-yellow-700">
                  {project.licensing?.type || 'Standard'}
                </Badge>
              </td>
              <td className="p-4 text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProjectClick(project.id);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2"
                  onClick={(e) => onEditProject(project.id, e)}
                  title="Add Subfolder"
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => onDeleteProject(project.id, e)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListView;
