
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export interface AssetsEmptyStateViewProps {
  projectName: string;
  handleBatchUpload: () => void;
}

const AssetsEmptyStateView: React.FC<AssetsEmptyStateViewProps> = ({
  projectName,
  handleBatchUpload
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="rounded-full bg-gray-800 p-6">
        <Upload className="h-12 w-12 text-gray-400" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-medium">No Assets Found</h3>
        <p className="text-gray-400 max-w-md">
          {projectName ? 
            `The project "${projectName}" doesn't have any assets yet. Upload assets to get started.` : 
            'No assets found in this folder. Upload assets to get started.'}
        </p>
      </div>
      <Button 
        size="lg" 
        onClick={handleBatchUpload}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Upload Assets
      </Button>
    </div>
  );
};

export default AssetsEmptyStateView;
