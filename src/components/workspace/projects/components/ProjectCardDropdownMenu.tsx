
import React from 'react';
import { Pencil, Trash, Image, FolderPlus, MoreHorizontal } from 'lucide-react';
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
  onAddSubfolder: (projectId: string, e: React.MouseEvent) => void;
  onDeleteProject: (projectId: string, e: React.MouseEvent) => void;
  onSetCoverImage?: (projectId: string, e: React.MouseEvent) => void;
  hasAssets: boolean;
}

const ProjectCardDropdownMenu: React.FC<ProjectCardDropdownMenuProps> = ({
  projectId,
  onEditProject,
  onAddSubfolder,
  onDeleteProject,
  onSetCoverImage,
  hasAssets,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="secondary" size="icon" className="opacity-95 hover:opacity-100 text-white bg-gray-700 hover:bg-gray-600 border border-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white min-w-[200px] shadow-lg">
        <DropdownMenuItem onClick={(e) => onEditProject(projectId, e)} className="cursor-pointer hover:bg-gray-700 py-2 focus:bg-gray-700">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => onAddSubfolder(projectId, e)} className="cursor-pointer hover:bg-gray-700 py-2 focus:bg-gray-700">
          <FolderPlus className="mr-2 h-4 w-4" />
          Add Sub-Folder
        </DropdownMenuItem>
        {onSetCoverImage && hasAssets && (
          <DropdownMenuItem onClick={(e) => onSetCoverImage(projectId, e)} className="cursor-pointer hover:bg-gray-700 py-2 focus:bg-gray-700">
            <Image className="mr-2 h-4 w-4" />
            Set Cover Image
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem onClick={(e) => onDeleteProject(projectId, e)} className="cursor-pointer text-red-400 hover:bg-red-900/40 py-2 hover:text-red-300 focus:bg-red-900/40 focus:text-red-300">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectCardDropdownMenu;
