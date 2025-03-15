
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info, Plus } from 'lucide-react';
import { Label } from "@/components/ui/label";
import SkillsInput from '../../components/SkillsInput';
import { useProfile } from '../../context/ProfileContext';
import RoleCard from '../../components/RoleCard';
import { useToast } from '@/hooks/use-toast';

interface Role {
  id: string;
  title: string;
  experience: string;
  specialties: string[];
}

const RolesAndSkillsTab: React.FC = () => {
  const { profileData, updateProfileData } = useProfile();
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>(profileData.skills || ['Photography', 'Videography', 'Editing']);
  const [roles, setRoles] = useState<Role[]>(
    profileData.professionalInfo?.roles || [
      {
        id: '1',
        title: 'Videographer',
        experience: '10+ years',
        specialties: ['Commercial', 'Documentary']
      },
      {
        id: '2',
        title: 'Photographer',
        experience: '5 years',
        specialties: ['Portrait', 'Event']
      }
    ]
  );

  const handleSaveChanges = () => {
    updateProfileData({ 
      skills,
      professionalInfo: {
        ...profileData.professionalInfo,
        roles
      }
    });
    
    toast({
      title: "Changes saved",
      description: "Your professional roles and skills have been updated.",
    });
  };

  const handleAddRole = () => {
    const newRole: Role = {
      id: Date.now().toString(),
      title: '',
      experience: '',
      specialties: []
    };
    setRoles([...roles, newRole]);
  };

  const handleRemoveRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const updateRole = (updatedRole: Role) => {
    setRoles(roles.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  return (
    <Card className="border-none shadow-sm bg-gray-900 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Professional Roles</CardTitle>
            <CardDescription className="text-gray-400">
              Add the roles you perform in the creative industry
            </CardDescription>
          </div>
          <Info className="h-5 w-5 text-gray-400" />
        </div>
        <Separator className="bg-gray-800" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Professional Roles</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role) => (
              <RoleCard 
                key={role.id} 
                role={role} 
                onUpdate={updateRole}
                onRemove={() => handleRemoveRole(role.id)}
              />
            ))}
            
            <div 
              className="relative border rounded-lg p-4 border-dashed flex items-center justify-center bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors group cursor-pointer min-h-[200px]"
              onClick={handleAddRole}
            >
              <Button 
                variant="ghost" 
                className="text-gray-400 group-hover:text-gray-300 transition-colors absolute inset-0 w-full h-full flex items-center justify-center bg-transparent hover:bg-transparent"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Role
              </Button>
            </div>
          </div>
        </div>
        
        <SkillsInput 
          skills={skills}
          setSkills={setSkills}
        />
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RolesAndSkillsTab;
