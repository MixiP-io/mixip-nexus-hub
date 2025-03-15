
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '../SectionHeader';
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
      {viewingAssignment ? (
        <AssignmentDetail 
          assignmentId={viewingAssignment} 
          onBack={handleBackToList}
        />
      ) : (
        <>
          <SectionHeader 
            title="Assignments" 
            description="Manage your creative work and tasks"
          />
          
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
