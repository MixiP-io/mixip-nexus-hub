
import React from 'react';
import { Users, Camera, Video, Edit2, Music, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCampaignForm } from './context/CampaignFormContext';

interface TeamStepProps {
  onBack: () => void;
  onNext: () => void;
}

const TeamStep: React.FC<TeamStepProps> = ({ onBack, onNext }) => {
  const { formState, updateFormState } = useCampaignForm();
  const { selectedRoles } = formState;

  const roles = [
    { id: 'photographer', label: 'Photographer', icon: <Camera className="h-8 w-8 mb-2" /> },
    { id: 'videographer', label: 'Videographer', icon: <Video className="h-8 w-8 mb-2" /> },
    { id: 'photo-editor', label: 'Photo Editor', icon: <Edit2 className="h-8 w-8 mb-2" /> },
    { id: 'video-editor', label: 'Video Editor', icon: <Scissors className="h-8 w-8 mb-2" /> },
    { id: 'audio-engineer', label: 'Audio Engineer', icon: <Music className="h-8 w-8 mb-2" /> }
  ];

  const toggleRole = (roleId: string) => {
    const newSelectedRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter(id => id !== roleId)
      : [...selectedRoles, roleId];
    
    updateFormState('selectedRoles', newSelectedRoles);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Select Team Roles (Multiple)
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map((role) => (
            <div 
              key={role.id}
              className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border ${
                selectedRoles.includes(role.id) 
                  ? 'border-green-500 bg-gray-700' 
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }`}
              onClick={() => toggleRole(role.id)}
            >
              {role.icon}
              <span className="text-center">{role.label}</span>
            </div>
          ))}
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
          disabled={selectedRoles.length === 0}
          variant="default"
          className="bg-green-600 hover:bg-green-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TeamStep;
