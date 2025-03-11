
import React from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Deliverable {
  id: number;
  title: string;
  description: string;
}

interface CreativeStepProps {
  deliverables: Deliverable[];
  setDeliverables: (deliverables: Deliverable[]) => void;
  creativeDirection: string;
  setCreativeDirection: (direction: string) => void;
  attachedFile: File | null;
  setAttachedFile: (file: File | null) => void;
  onBack: () => void;
  onNext: () => void;
}

const CreativeStep: React.FC<CreativeStepProps> = ({
  deliverables,
  setDeliverables,
  creativeDirection,
  setCreativeDirection,
  attachedFile,
  setAttachedFile,
  onBack,
  onNext
}) => {
  const handleEditDeliverable = (id: number, field: 'title' | 'description', value: string) => {
    // Create a new array with the updated item
    const newDeliverables = deliverables.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    setDeliverables(newDeliverables);
  };

  const handleAddDeliverable = () => {
    const newId = deliverables.length > 0 
      ? Math.max(...deliverables.map(d => d.id)) + 1 
      : 1;
    
    // Create a new array with the added item
    const newDeliverables = [
      ...deliverables, 
      { id: newId, title: 'New Deliverable', description: 'Description' }
    ];
    
    setDeliverables(newDeliverables);
  };

  const handleRemoveDeliverable = (id: number) => {
    // Create a new array without the removed item
    const newDeliverables = deliverables.filter(item => item.id !== id);
    
    setDeliverables(newDeliverables);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAttachedFile(files[0]);
      toast.success(`File attached: ${files[0].name}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Deliverables
          </div>
          <button
            onClick={handleAddDeliverable}
            className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-md"
          >
            + Add Deliverable
          </button>
        </h3>
        
        <div className="space-y-4">
          {deliverables.map((deliverable) => (
            <div key={deliverable.id} className="bg-gray-800 p-3 rounded border border-gray-600">
              <div className="flex justify-between mb-2">
                <input
                  className="bg-gray-700 border border-gray-600 rounded p-2 text-white w-full"
                  value={deliverable.title}
                  onChange={(e) => handleEditDeliverable(deliverable.id, 'title', e.target.value)}
                  placeholder="Deliverable title"
                />
                <button 
                  onClick={() => handleRemoveDeliverable(deliverable.id)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                className="bg-gray-700 border border-gray-600 rounded p-2 text-white w-full"
                value={deliverable.description}
                onChange={(e) => handleEditDeliverable(deliverable.id, 'description', e.target.value)}
                placeholder="Deliverable description"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-600">
          <label className="block text-gray-400 mb-2">Creative Direction</label>
          <textarea 
            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24"
            placeholder="Provide creative direction for your team..."
            value={creativeDirection}
            onChange={(e) => setCreativeDirection(e.target.value)}
          />
          
          <div className="mt-3">
            <label className="block text-gray-400 mb-2">Attach Reference Files</label>
            <div className="flex items-center">
              <label className="cursor-pointer flex items-center bg-gray-700 border border-gray-600 rounded p-3 hover:bg-gray-600">
                <Upload className="w-5 h-5 mr-2" />
                {attachedFile ? attachedFile.name : "Choose file..."}
                <input 
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          variant="default"
          className="bg-green-600 hover:bg-green-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CreativeStep;
