
import React from 'react';
import { Eye, Pencil, Trash, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
              <td className="p-4">{new Date(project.updatedAt).toLocaleDateString()}</td>
              <td className="p-4">
                <Badge className="bg-yellow-600 hover:bg-yellow-700">Needs Review</Badge>
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
                >
                  <Pencil className="h-4 w-4" />
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
