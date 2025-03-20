
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
    { id: 'photographer', label: 'Photographer', icon: <Camera className="h-8 w-8 mb-2.5" /> },
    { id: 'videographer', label: 'Videographer', icon: <Video className="h-8 w-8 mb-2.5" /> },
    { id: 'photo-editor', label: 'Photo Editor', icon: <Edit2 className="h-8 w-8 mb-2.5" /> },
    { id: 'video-editor', label: 'Video Editor', icon: <Scissors className="h-8 w-8 mb-2.5" /> },
    { id: 'audio-engineer', label: 'Audio Engineer', icon: <Music className="h-8 w-8 mb-2.5" /> }
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
        <h3 className="font-medium mb-5 flex items-center text-frameio-text-primary tracking-tight">
          <Users className="w-5 h-5 mr-2.5 text-frameio-accent-blue" />
          Select Team Roles (Multiple)
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map((role) => (
            <div 
              key={role.id}
              className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border transition-all ${
                selectedRoles.includes(role.id) 
                  ? 'border-frameio-accent-green bg-frameio-bg-highlight shadow-sm' 
                  : 'border-frameio-border-subtle bg-frameio-bg-card hover:border-frameio-text-tertiary'
              }`}
              onClick={() => toggleRole(role.id)}
            >
              {role.icon}
              <span className="text-center text-frameio-text-primary font-medium tracking-tight">{role.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between pt-5 mt-2 border-t border-frameio-border-subtle">
        <Button 
          onClick={onBack}
          variant="outline"
          className="text-frameio-text-primary hover:text-white bg-frameio-bg-card/50 hover:bg-frameio-bg-highlight font-medium"
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={selectedRoles.length === 0}
          variant="default"
          className="bg-frameio-accent-green hover:bg-green-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TeamStep;
