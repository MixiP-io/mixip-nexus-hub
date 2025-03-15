
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface CreateProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projectName: string;
  setProjectName: (name: string) => void;
  onCreateProject: () => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  isOpen,
  setIsOpen,
  projectName,
  setProjectName,
  onCreateProject
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new project to organize your uploaded files
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onCreateProject}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
