
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RolesAndSkillsTab from '../components/tabs/RolesAndSkillsTab';
import PortfolioSectionTab from '../components/tabs/PortfolioTab';
import EquipmentTab from '../components/tabs/EquipmentTab';
import TeamManagementTab from '../components/tabs/TeamManagementTab';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

const ProfessionalTab: React.FC = () => {
  const { profile } = useAuth();
  const isAIPlatform = profile?.account_type === 'ai_platform';
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={isAIPlatform ? "team" : "roles"} className="w-full">
        <TabsList className="mb-4 bg-gray-800 text-gray-400">
          {!isAIPlatform && (
            <TabsTrigger value="roles" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Roles & Skills
            </TabsTrigger>
          )}
          {!isAIPlatform && (
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Portfolio
            </TabsTrigger>
          )}
          {!isAIPlatform && (
            <TabsTrigger value="equipment" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Equipment
            </TabsTrigger>
          )}
          {isAIPlatform && (
            <TabsTrigger value="team" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Team Management
            </TabsTrigger>
          )}
          {isAIPlatform && (
            <TabsTrigger value="integration" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              API Integration
            </TabsTrigger>
          )}
        </TabsList>

        {!isAIPlatform && (
          <TabsContent value="roles" className="space-y-4 mt-0">
            <RolesAndSkillsTab />
          </TabsContent>
        )}

        {!isAIPlatform && (
          <TabsContent value="portfolio" className="space-y-4 mt-0">
            <PortfolioSectionTab />
          </TabsContent>
        )}

        {!isAIPlatform && (
          <TabsContent value="equipment" className="space-y-4 mt-0">
            <EquipmentTab />
          </TabsContent>
        )}

        {isAIPlatform && (
          <TabsContent value="team" className="space-y-4 mt-0">
            <TeamManagementTab />
          </TabsContent>
        )}

        {isAIPlatform && (
          <TabsContent value="integration" className="space-y-4 mt-0">
            <div className="border rounded-lg p-6 border-gray-700 bg-gray-800">
              <div className="text-center py-8">
                <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-medium text-white mb-2">API Integration</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  API integration settings and documentation will be available soon. 
                  You'll be able to manage API keys, webhook endpoints, and integration settings.
                </p>
                <Button disabled>Coming Soon</Button>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfessionalTab;
