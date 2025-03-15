
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Plus, X, Trash2 } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Role {
  id: string;
  title: string;
  experience: string;
  specialties: string[];
}

interface RoleCardProps {
  role: Role;
  onUpdate: (updatedRole: Role) => void;
  onRemove: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, onUpdate, onRemove }) => {
  const [newSpecialty, setNewSpecialty] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const experienceOptions = [
    '< 1 year',
    '1-2 years',
    '3-5 years',
    '5-10 years',
    '10+ years'
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...role,
      title: e.target.value
    });
  };

  const handleExperienceChange = (value: string) => {
    onUpdate({
      ...role,
      experience: value
    });
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !role.specialties.includes(newSpecialty.trim())) {
      onUpdate({
        ...role,
        specialties: [...role.specialties, newSpecialty.trim()]
      });
      setNewSpecialty('');
      setIsAdding(false);
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    onUpdate({
      ...role,
      specialties: role.specialties.filter(item => item !== specialty)
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSpecialty();
    }
    if (e.key === 'Escape') {
      setIsAdding(false);
      setNewSpecialty('');
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-800 border-gray-700 shadow-md hover:shadow-lg transition-shadow relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-gray-400 hover:text-red-400"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-white">Role</span>
        {role.experience && (
          <Badge className="bg-mixip-blue text-white">{role.experience}</Badge>
        )}
      </div>
      
      <Input 
        value={role.title} 
        onChange={handleTitleChange} 
        placeholder="Enter role title"
        className="mb-2 bg-gray-700 border-gray-600 text-white" 
      />
      
      <div className="mb-3">
        <label className="text-sm text-gray-400 mb-1 block">Experience</label>
        <Select value={role.experience} onValueChange={handleExperienceChange}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {experienceOptions.map((option) => (
              <SelectItem key={option} value={option} className="focus:bg-gray-700">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="text-sm text-gray-400 mb-1">Specialties:</div>
      <div className="flex flex-wrap gap-1 mt-1">
        {role.specialties.map((specialty) => (
          <Badge 
            key={specialty} 
            variant="outline" 
            className="bg-blue-900/30 text-blue-300 border-blue-700 group/badge"
          >
            {specialty}
            <X 
              className="h-3 w-3 ml-1 cursor-pointer opacity-70 hover:opacity-100" 
              onClick={() => handleRemoveSpecialty(specialty)}
            />
          </Badge>
        ))}
        
        {isAdding ? (
          <div className="flex items-center gap-1">
            <Input
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                handleAddSpecialty();
                setIsAdding(false);
              }}
              autoFocus
              placeholder="Add & press Enter"
              className="h-6 min-w-[120px] px-2 py-0 text-xs bg-gray-700 border-gray-600 text-white"
            />
          </div>
        ) : (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsAdding(true)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-800 border-gray-700 text-white">
              <p className="text-sm">Add a new specialty to this role</p>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    </div>
  );
};

export default RoleCard;
