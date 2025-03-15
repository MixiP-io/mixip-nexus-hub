
import React from 'react';
import { Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card';

interface CreateProjectCardProps {
  onCreateProject: () => void;
}

const CreateProjectCard: React.FC<CreateProjectCardProps> = ({ onCreateProject }) => {
  return (
    <Card 
      className="bg-gray-800 border-gray-700 border-dashed hover:border-green-600 overflow-hidden cursor-pointer flex flex-col justify-center items-center h-full min-h-[240px]"
      onClick={onCreateProject}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
        <CardTitle className="font-medium text-lg mb-1 text-white">Create New Project</CardTitle>
        <p className="text-sm text-gray-300">
          Start organizing your assets
        </p>
      </CardContent>
    </Card>
  );
};

export default CreateProjectCard;
