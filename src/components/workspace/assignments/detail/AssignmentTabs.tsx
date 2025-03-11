
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, CheckCircle, MessageCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Assignment } from '../types/assignment';
import DetailsTab from './tabs/DetailsTab';

interface AssignmentTabsProps {
  assignment: Assignment;
}

const AssignmentTabs: React.FC<AssignmentTabsProps> = ({ assignment }) => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <Card className="mt-6">
      <CardContent className="p-6 pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="details">
              <FileText className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="deliverables">
              <CheckCircle className="w-4 h-4 mr-2" />
              Deliverables
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <DetailsTab assignment={assignment} />
          </TabsContent>
          
          <TabsContent value="deliverables">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Deliverables management coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Messaging system coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Timeline tracking coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AssignmentTabs;
