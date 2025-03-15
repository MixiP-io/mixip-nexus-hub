
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface SkillsInputProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
  label?: string;
  className?: string;
  badgeClassName?: string;
}

const SkillsInput: React.FC<SkillsInputProps> = ({ 
  skills, 
  setSkills, 
  label = "Skills & Expertise", 
  className = "",
  badgeClassName = "bg-blue-900/30 text-blue-300 border-blue-700 hover:bg-blue-900/40"
}) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="skills" className="text-gray-300">{label}</Label>
      <div className="flex items-center mb-2">
        <Input 
          id="skills" 
          placeholder="Add a skill" 
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mr-2 bg-gray-800 border-gray-700 text-white"
        />
        <Button type="button" onClick={addSkill}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} className={badgeClassName}>
            {skill}
            <button 
              className="ml-1 hover:text-blue-100"
              onClick={() => removeSkill(skill)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
