
import React from 'react';
import { Download, Share2, Tag, User, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BatchActionsBarProps {
  selectedCount: number;
  totalCount: number;
  handleSelectAll: () => void;
  handleBatchRights: () => void;
}

const BatchActionsBar: React.FC<BatchActionsBarProps> = ({
  selectedCount,
  totalCount,
  handleSelectAll,
  handleBatchRights
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center justify-between mb-4">
      <div className="ml-2 text-sm">
        <span className="mr-2">{selectedCount} assets selected</span>
        <Button variant="link" onClick={handleSelectAll} className="text-sm p-0 h-auto">
          {selectedCount === totalCount ? 'Deselect All' : 'Select All'}
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="border-gray-700">
          <Download className="mr-1 h-3 w-3" />
          Download
        </Button>
        <Button variant="outline" size="sm" className="border-gray-700">
          <Share2 className="mr-1 h-3 w-3" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="border-gray-700">
          <Tag className="mr-1 h-3 w-3" />
          Tag
        </Button>
        <Button variant="outline" size="sm" className="border-gray-700" onClick={handleBatchRights}>
          <User className="mr-1 h-3 w-3" />
          Rights
        </Button>
        <Button variant="destructive" size="sm">
          <Trash className="mr-1 h-3 w-3" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BatchActionsBar;
