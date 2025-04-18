
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { ProjectData } from '../../batch-uploader/utils/types/projectTypes';
import EditProjectForm from './edit-project/EditProjectForm';
import { useEditProject } from './edit-project/useEditProject';

interface EditProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  project: ProjectData;
  onUpdateProject: (projectId: string, updates: Partial<ProjectData>) => void;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  isOpen,
  setIsOpen,
  project,
  onUpdateProject
}) => {
  // Use the custom hook to manage form state and logic
  const {
    name,
    setName,
    description,
    setDescription,
    tags,
    setTags,
    handleSave,
    isSubmitting
  } = useEditProject(project, isOpen, setIsOpen, onUpdateProject);

  // Prevent dialog clicks from bubbling to parent elements
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="bg-gray-800 border-gray-700 text-white max-w-md w-full" 
        onClick={handleDialogClick}
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Edit Project Details</DialogTitle>
          <DialogDescription className="text-gray-300">
            Update the details of your project
          </DialogDescription>
        </DialogHeader>
        
        <EditProjectForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
          onSave={handleSave}
          setIsOpen={setIsOpen}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
