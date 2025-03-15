
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, Plus } from 'lucide-react';
import { Label } from "@/components/ui/label";
import SkillsInput from '../components/SkillsInput';

const ProfessionalTab: React.FC = () => {
  const [skills, setSkills] = useState<string[]>(['Photography', 'Videography', 'Editing']);

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm bg-gray-900 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription className="text-gray-400">
                Showcase your professional expertise and skills
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
              <div className="border rounded-lg p-4 bg-gray-800 border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">Primary Role</span>
                  <Badge className="bg-mixip-blue text-white">10+ years</Badge>
                </div>
                <Input defaultValue="Videographer" className="mb-2 bg-gray-700 border-gray-600 text-white" />
                <div className="text-sm text-gray-400">Specialties:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Commercial</Badge>
                  <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Documentary</Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
                    <Plus className="h-3 w-3 mr-1" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-800 border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">Secondary Role</span>
                  <Badge className="bg-indigo-500 text-white">5 years</Badge>
                </div>
                <Input defaultValue="Photographer" className="mb-2 bg-gray-700 border-gray-600 text-white" />
                <div className="text-sm text-gray-400">Specialties:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Portrait</Badge>
                  <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Event</Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
                    <Plus className="h-3 w-3 mr-1" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 border-dashed flex items-center justify-center bg-gray-800 border-gray-700">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
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
          
          <div className="space-y-2">
            <Label htmlFor="equipment" className="text-gray-300">Equipment</Label>
            <Textarea 
              id="equipment" 
              placeholder="List your equipment" 
              defaultValue="Sony A7III, DJI Ronin, Canon 5D Mark IV, Various lenses, Professional lighting kit"
              className="min-h-[100px] bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalTab;
