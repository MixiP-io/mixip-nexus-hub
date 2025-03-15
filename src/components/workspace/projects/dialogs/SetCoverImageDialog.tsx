
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { setProjectCoverImage } from '../../batch-uploader/utils/services/assetService';

interface SetCoverImageDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projectId: string | null;
  projectAssets: any[];
  onSuccess?: () => void;
}

const SetCoverImageDialog: React.FC<SetCoverImageDialogProps> = ({
  isOpen,
  setIsOpen,
  projectId,
  projectAssets,
  onSuccess
}) => {
  const handleCoverImageSelected = (assetId: string) => {
    if (projectId) {
      const success = setProjectCoverImage(projectId, assetId);
      
      if (success) {
        toast.success('Cover image set successfully');
        if (onSuccess) onSuccess();
      }
    }
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Set Project Cover Image</DialogTitle>
          <DialogDescription className="text-gray-300">
            Select an image to use as the cover for your project.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-2">
          {projectAssets.length > 0 ? (
            projectAssets.map((asset: any) => (
              <div 
                key={asset.id} 
                className="relative bg-gray-700 rounded-md overflow-hidden h-32 cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
                onClick={() => handleCoverImageSelected(asset.id)}
              >
                <img 
                  src={asset.preview} 
                  alt={asset.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs truncate">
                  {asset.name}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center p-4">
              No images available to set as cover
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetCoverImageDialog;
