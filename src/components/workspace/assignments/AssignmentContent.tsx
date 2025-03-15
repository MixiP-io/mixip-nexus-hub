
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AssignmentsList from './AssignmentsList';
import AssignmentDetail from './AssignmentDetail';
import AssignmentTabs from './AssignmentTabs';

// Mock data for the different types of users
type UserType = 'creator' | 'agency' | 'brand';
type ViewOption = 'incoming' | 'outgoing' | 'active' | 'completed' | 'team';

// For demo purposes, we'll hardcode this, but in a real app this would come from auth
const currentUserType = 'creator' as UserType;

const AssignmentContent: React.FC = () => {
  const [viewingAssignment, setViewingAssignment] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<ViewOption>('incoming');

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
        <h2 className="text-xl font-semibold mb-2 text-white">Assignments</h2>
        <p className="text-white/80">Manage your creative work and tasks</p>
      </div>

      {viewingAssignment ? (
        <AssignmentDetail 
          assignmentId={viewingAssignment} 
          onBack={handleBackToList}
        />
      ) : (
        <>
          <AssignmentTabs 
            activeView={activeView}
            setActiveView={setActiveView}
            userType={currentUserType}
          />
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          
          <AssignmentsList 
            type={activeView}
            userType={currentUserType}
            onViewAssignment={handleAssignmentClick}
          />
        </>
      )}
    </div>
  );
};

export default AssignmentContent;
