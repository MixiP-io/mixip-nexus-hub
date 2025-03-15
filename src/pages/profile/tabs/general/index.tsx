
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import PersonalInfoForm from './PersonalInfoForm';
import LanguageSection from './LanguageSection';

const GeneralTab: React.FC = () => {
  const { updateProfileData } = useProfile();
  
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm bg-gray-900 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal details
              </CardDescription>
            </div>
            <Info className="h-5 w-5 text-gray-400" />
          </div>
          <Separator className="bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-4">
          <PersonalInfoForm />
          <LanguageSection />
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralTab;
