
import React from 'react';
import { Users } from 'lucide-react';

interface CreateGroupCardProps {
  onClick: () => void;
}

const CreateGroupCard: React.FC<CreateGroupCardProps> = ({ onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="h-40 bg-gray-700 flex items-center justify-center">
        <Users className="w-10 h-10 text-gray-500" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">Create New Group</h3>
        <p className="text-sm text-gray-400">Organize your collaborators into teams and networks</p>
      </div>
    </div>
  );
};

export default CreateGroupCard;
