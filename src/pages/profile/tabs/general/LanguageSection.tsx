
import React, { useState } from 'react';
import { FormLabel } from "@/components/ui/form";
import { useProfile } from '../../context/ProfileContext';
import SkillsInput from '../../components/SkillsInput';

const LanguageSection: React.FC = () => {
  const { profileData, updateProfileData } = useProfile();
  const [languages, setLanguages] = useState<string[]>(profileData.languages || []);

  const handleLanguagesChange = (updatedLanguages: string[]) => {
    setLanguages(updatedLanguages);
    updateProfileData({ languages: updatedLanguages });
  };

  return (
    <div className="space-y-2">
      <SkillsInput 
        skills={languages} 
        setSkills={handleLanguagesChange} 
        label="Languages" 
        badgeClassName="bg-mixip-blue/20 text-blue-300 border-blue-700 hover:bg-mixip-blue/30"
      />
    </div>
  );
};

export default LanguageSection;
