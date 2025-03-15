
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Info } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { useProfile } from '../../context/ProfileContext';
import { useToast } from '@/hooks/use-toast';

const EquipmentTab: React.FC = () => {
  const { profileData, updateProfileData } = useProfile();
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<string>(
    profileData.professionalInfo?.equipment || 
    "Sony A7III, DJI Ronin, Canon 5D Mark IV, Various lenses, Professional lighting kit"
  );

  const handleSaveChanges = () => {
    updateProfileData({ 
      professionalInfo: {
        ...profileData.professionalInfo,
        equipment
      }
    });
    
    toast({
      title: "Changes saved",
      description: "Your equipment information has been updated.",
    });
  };

  return (
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
  );
};

export default EquipmentTab;
