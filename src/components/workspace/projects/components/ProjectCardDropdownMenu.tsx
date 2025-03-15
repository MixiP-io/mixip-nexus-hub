
import React from 'react';
import { Pencil, Trash, Image, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface ProjectCardDropdownMenuProps {
  projectId: string;
  onEditProject: (projectId: string, e: React.MouseEvent) => void;
  onDeleteProject: (projectId: string, e: React.MouseEvent) => void;
  onSetCoverImage?: (projectId: string, e: React.MouseEvent) => void;
  hasAssets: boolean;
}

const ProjectCardDropdownMenu: React.FC<ProjectCardDropdownMenuProps> = ({
  projectId,
  onEditProject,
  onDeleteProject,
  onSetCoverImage,
  hasAssets,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" className="bg-gray-800/70 hover:bg-gray-700">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border-gray-700">
        <DropdownMenuItem onClick={(e) => onEditProject(projectId, e)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        {onSetCoverImage && hasAssets && (
          <DropdownMenuItem onClick={(e) => onSetCoverImage(projectId, e)}>
            <Image className="mr-2 h-4 w-4" />
            Set Cover Image
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(e) => onDeleteProject(projectId, e)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectCardDropdownMenu;
