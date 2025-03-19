
import React from 'react';
import { Database, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DatasetsEmptyProps {
  onRequestCustomDataset: () => void;
}

const DatasetsEmpty: React.FC<DatasetsEmptyProps> = ({ onRequestCustomDataset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Database className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">No datasets found</h3>
      <p className="text-gray-400 max-w-md mb-6">
        No datasets match your current search criteria. Try adjusting your filters or request a custom dataset that meets your specific needs.
      </p>
      <Button onClick={onRequestCustomDataset} className="bg-green-600 hover:bg-green-700">
        <Plus className="h-5 w-5 mr-2" />
        Request Custom Dataset
      </Button>
    </div>
  );
};

export default DatasetsEmpty;
