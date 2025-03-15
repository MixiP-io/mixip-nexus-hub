
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssetsEmptyStateProps {
  handleBatchUpload: () => void;
}

const AssetsEmptyState: React.FC<AssetsEmptyStateProps> = ({ handleBatchUpload }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
      <div className="mb-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2">No Assets Found</h3>
      <p className="text-gray-400 mb-4">This project doesn't have any assets yet.</p>
      <Button className="bg-green-600 hover:bg-green-700" onClick={handleBatchUpload}>
        Upload Assets
      </Button>
    </div>
  );
};

export default AssetsEmptyState;
