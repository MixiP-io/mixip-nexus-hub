
import React from 'react';
import { Card } from '@/components/ui/card';
import AssignmentCard from './AssignmentCard';
import { getAssignmentsByType } from './utils/assignmentData';

interface AssignmentsListProps {
  type: 'incoming' | 'outgoing' | 'active' | 'completed' | 'team';
  userType: 'creator' | 'agency' | 'brand';
  onViewAssignment: (id: number) => void;
}

const AssignmentsList: React.FC<AssignmentsListProps> = ({ 
  type, 
  userType,
  onViewAssignment 
}) => {
  // Get assignments based on type and user type
  const assignments = getAssignmentsByType(type, userType);
  
  if (assignments.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-400">No {type} assignments found</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assignments.map(assignment => (
        <AssignmentCard 
          key={assignment.id}
          assignment={assignment}
          onClick={() => onViewAssignment(assignment.id)}
        />
      ))}
    </div>
  );
};

export default AssignmentsList;
