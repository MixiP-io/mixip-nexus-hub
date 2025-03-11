
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ClipboardList, 
  Send, 
  Inbox, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Filter 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AssignmentsList from './AssignmentsList';
import AssignmentDetail from './AssignmentDetail';

// Mock data for the different types of users
type UserType = 'creator' | 'agency' | 'brand';
// For demo purposes, we'll hardcode this, but in a real app this would come from auth
const currentUserType: UserType = 'creator';

const AssignmentContent: React.FC = () => {
  const [viewingAssignment, setViewingAssignment] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<string>('incoming');

  // In a real app, you'd fetch assignments based on the user type and filters
  const handleAssignmentClick = (assignmentId: number) => {
    setViewingAssignment(assignmentId);
  };

  const handleBackToList = () => {
    setViewingAssignment(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Assignments</h2>
        <p className="text-gray-400">Manage your creative work and tasks</p>
      </div>

      {viewingAssignment ? (
        <AssignmentDetail 
          assignmentId={viewingAssignment} 
          onBack={handleBackToList}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Tabs defaultValue={activeView} onValueChange={setActiveView}>
              <TabsList className="mb-4">
                <TabsTrigger value="incoming">
                  <Inbox className="w-4 h-4 mr-2" />
                  Incoming
                </TabsTrigger>
                <TabsTrigger value="outgoing">
                  <Send className="w-4 h-4 mr-2" />
                  Outgoing
                </TabsTrigger>
                <TabsTrigger value="active">
                  <Clock className="w-4 h-4 mr-2" />
                  In Progress
                </TabsTrigger>
                <TabsTrigger value="completed">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed
                </TabsTrigger>
                {currentUserType === 'agency' && (
                  <TabsTrigger value="team">
                    <Users className="w-4 h-4 mr-2" />
                    Team Assignments
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="incoming">
            <AssignmentsList 
              type="incoming" 
              userType={currentUserType}
              onViewAssignment={handleAssignmentClick}
            />
          </TabsContent>
          
          <TabsContent value="outgoing">
            <AssignmentsList 
              type="outgoing" 
              userType={currentUserType}
              onViewAssignment={handleAssignmentClick}
            />
          </TabsContent>
          
          <TabsContent value="active">
            <AssignmentsList 
              type="active" 
              userType={currentUserType}
              onViewAssignment={handleAssignmentClick}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <AssignmentsList 
              type="completed" 
              userType={currentUserType}
              onViewAssignment={handleAssignmentClick}
            />
          </TabsContent>
          
          {currentUserType === 'agency' && (
            <TabsContent value="team">
              <AssignmentsList 
                type="team" 
                userType={currentUserType}
                onViewAssignment={handleAssignmentClick}
              />
            </TabsContent>
          )}
        </>
      )}
    </div>
  );
};

export default AssignmentContent;
