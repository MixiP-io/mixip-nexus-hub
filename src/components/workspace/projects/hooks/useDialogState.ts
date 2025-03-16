
import { useState, useCallback } from 'react';
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';

export interface UseDialogStateResult {
  // Create project dialog
  createProjectOpen: boolean;
  setCreateProjectOpen: (open: boolean) => void;
  
  // Create subfolder dialog
  createSubfolderOpen: boolean;
  setCreateSubfolderOpen: (open: boolean) => void;
  
  // Set cover image dialog
  setCoverImageOpen: boolean;
  setSetCoverImageOpen: (open: boolean) => void;
  projectForCoverImage: string | null;
  setProjectForCoverImage: (projectId: string | null) => void;
  projectAssets: any[];
  setProjectAssets: (assets: any[]) => void;
  
  // Edit project dialog
  editProjectOpen: boolean;
  setEditProjectOpen: (open: boolean) => void;
  projectToEdit: ProjectData | null;
  setProjectToEdit: (project: ProjectData | null) => void;
  
  // Delete project dialog
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  projectToDelete: string | null;
  setProjectToDelete: (projectId: string | null) => void;
  projectToDeleteName: string;
  setProjectToDeleteName: (name: string) => void;
}

export const useDialogState = (): UseDialogStateResult => {
  // Create project dialog
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  
  // Create subfolder dialog
  const [createSubfolderOpen, setCreateSubfolderOpen] = useState(false);
  
  // Set cover image dialog
  const [setCoverImageOpen, setSetCoverImageOpen] = useState(false);
  const [projectForCoverImage, setProjectForCoverImage] = useState<string | null>(null);
  const [projectAssets, setProjectAssets] = useState<any[]>([]);
  
  // Edit project dialog
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectData | null>(null);
  
  // Delete project dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [projectToDeleteName, setProjectToDeleteName] = useState('');
  
  return {
    createProjectOpen,
    setCreateProjectOpen,
    createSubfolderOpen,
    setCreateSubfolderOpen,
    setCoverImageOpen,
    setSetCoverImageOpen,
    projectForCoverImage,
    setProjectForCoverImage,
    projectAssets,
    setProjectAssets,
    editProjectOpen,
    setEditProjectOpen,
    projectToEdit,
    setProjectToEdit,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    setProjectToDelete,
    projectToDeleteName,
    setProjectToDeleteName
  };
};
