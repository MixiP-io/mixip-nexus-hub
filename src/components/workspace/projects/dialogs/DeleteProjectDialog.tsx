
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projectName: string;
  onConfirm: () => void;
}

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  isOpen,
  setIsOpen,
  projectName,
  onConfirm
}) => {
  // Function to handle the delete confirmation
  const handleConfirm = () => {
    // First close the dialog to avoid UI freezes
    setIsOpen(false);
    
    // Then trigger the delete operation
    setTimeout(() => {
      onConfirm();
    }, 100);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            Are you sure you want to delete "{projectName}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectDialog;
