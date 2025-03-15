
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

interface CreateFolderDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  folderName: string;
  setFolderName: (name: string) => void;
  onCreateFolder: () => void;
}

const CreateFolderDialog: React.FC<CreateFolderDialogProps> = ({
  isOpen,
  setIsOpen,
  folderName,
  setFolderName,
  onCreateFolder
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new folder to better organize your files
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onCreateFolder}>Create Folder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderDialog;
