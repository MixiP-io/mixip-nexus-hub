
import React from 'react';
import { Users, Building, UserPlus, Star, UsersRound } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ViewOption = 'all' | 'internal' | 'external' | 'agencies' | 'talent' | 'favorites';

interface CollaboratorTabsProps {
  activeView: ViewOption;
  setActiveView: (view: ViewOption) => void;
}

const CollaboratorTabs: React.FC<CollaboratorTabsProps> = ({
  activeView,
  setActiveView
}) => {
  return (
    <Tabs defaultValue={activeView} onValueChange={(value) => setActiveView(value as ViewOption)}>
      <TabsList className="mb-4">
        <TabsTrigger value="all">
          <Users className="w-4 h-4 mr-2" />
          All Groups
        </TabsTrigger>
        <TabsTrigger value="internal">
          <UsersRound className="w-4 h-4 mr-2" />
          Internal Teams
        </TabsTrigger>
        <TabsTrigger value="external">
          <UserPlus className="w-4 h-4 mr-2" />
          External Network
        </TabsTrigger>
        <TabsTrigger value="agencies">
          <Building className="w-4 h-4 mr-2" />
          Agencies
        </TabsTrigger>
        <TabsTrigger value="talent">
          <Users className="w-4 h-4 mr-2" />
          Talent
        </TabsTrigger>
        <TabsTrigger value="favorites">
          <Star className="w-4 h-4 mr-2" />
          Favorites
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CollaboratorTabs;
