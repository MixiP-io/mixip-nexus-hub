
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isCreating: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isCreating, onCancel }) => {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="border-gray-600 text-gray-200 hover:text-white hover:bg-gray-700"
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-gradient-to-b from-mixip-blue to-mixip-blue-dark hover:from-mixip-blue-dark hover:to-mixip-blue-dark"
      >
        {isCreating ? 'Create Group' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default FormActions;
