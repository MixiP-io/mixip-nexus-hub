
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Info, Plus, X } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsInput from '../components/SkillsInput';
import { useProfile } from '../context/ProfileContext';
import RoleCard from '../components/RoleCard';
import { useToast } from '@/hooks/use-toast';

interface Role {
  id: string;
  title: string;
  experience: string;
  specialties: string[];
}

const ProfessionalTab: React.FC = () => {
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
  const [equipment, setEquipment] = useState<string>(
    profileData.professionalInfo?.equipment || 
    "Sony A7III, DJI Ronin, Canon 5D Mark IV, Various lenses, Professional lighting kit"
  );

  const handleSaveChanges = () => {
    updateProfileData({ 
      skills,
      professionalInfo: {
        roles,
        equipment
      }
    });
    
    toast({
      title: "Changes saved",
      description: "Your professional information has been updated.",
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
    <div className="space-y-6">
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="mb-4 bg-gray-800 text-gray-400">
          <TabsTrigger value="roles" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Roles & Skills</TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Portfolio</TabsTrigger>
          <TabsTrigger value="equipment" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4 mt-0">
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
                  
                  <div className="relative border rounded-lg p-4 border-dashed flex items-center justify-center bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors group cursor-pointer min-h-[200px]" onClick={handleAddRole}>
                    <Button 
                      variant="ghost" 
                      className="text-gray-400 group-hover:text-gray-300 transition-colors absolute inset-0 w-full h-full flex items-center justify-center"
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
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4 mt-0">
          <Card className="border-none shadow-sm bg-gray-900 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription className="text-gray-400">
                    Add your best work samples to showcase your skills
                  </CardDescription>
                </div>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Separator className="bg-gray-800" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border border-dashed border-gray-700 rounded-lg bg-gray-800">
                <p className="text-gray-400">Portfolio management will be added soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4 mt-0">
          <Card className="border-none shadow-sm bg-gray-900 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Equipment</CardTitle>
                  <CardDescription className="text-gray-400">
                    List the equipment you use for your creative work
                  </CardDescription>
                </div>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Separator className="bg-gray-800" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="equipment" className="text-gray-300">Equipment</Label>
                <Textarea 
                  id="equipment" 
                  placeholder="List your equipment" 
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  className="min-h-[100px] bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalTab;
