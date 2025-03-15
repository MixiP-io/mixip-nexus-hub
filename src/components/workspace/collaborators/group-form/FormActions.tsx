
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

interface FormActionsProps {
  isCreating: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isCreating, onCancel }) => {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
      <Button 
        type="button" 
        variant="default" 
        onClick={onCancel}
        className="bg-gray-600 hover:bg-gray-700"
      >
        <X className="w-4 h-4 mr-2" />
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-green-600 hover:bg-green-700"
      >
        <Check className="w-4 h-4 mr-2" />
        {isCreating ? 'Create Group' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default FormActions;
