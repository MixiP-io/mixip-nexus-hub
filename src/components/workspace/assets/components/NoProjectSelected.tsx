
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NoProjectSelected: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6 flex flex-col items-center justify-center h-96">
      <div className="text-center">
        <h3 className="text-xl font-medium mb-2">No Project Selected</h3>
        <p className="text-gray-400 mb-4">Please select a project to view its assets</p>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate('/dashboard/workspace?tab=projects')}
        >
          Go to Projects
        </Button>
      </div>
    </div>
  );
};

export default NoProjectSelected;
