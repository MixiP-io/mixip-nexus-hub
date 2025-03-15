
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RolesAndSkillsTab from '../components/tabs/RolesAndSkillsTab';
import PortfolioSectionTab from '../components/tabs/PortfolioTab';
import EquipmentTab from '../components/tabs/EquipmentTab';

const ProfessionalTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="mb-4 bg-gray-800 text-gray-400">
          <TabsTrigger value="roles" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Roles & Skills</TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Portfolio</TabsTrigger>
          <TabsTrigger value="equipment" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4 mt-0">
          <RolesAndSkillsTab />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4 mt-0">
          <PortfolioSectionTab />
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4 mt-0">
          <EquipmentTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalTab;
