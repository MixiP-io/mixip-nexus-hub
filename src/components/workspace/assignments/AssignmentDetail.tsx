
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { getAssignmentById } from './utils/assignmentData';
import AssignmentHeader from './detail/AssignmentHeader';
import AssignmentTabs from './detail/AssignmentTabs';
import AssignmentSidebar from './detail/AssignmentSidebar';

interface AssignmentDetailProps {
  assignmentId: number;
  onBack: () => void;
}

const AssignmentDetail: React.FC<AssignmentDetailProps> = ({ assignmentId, onBack }) => {
  const assignment = getAssignmentById(assignmentId);
  
  if (!assignment) {
    return (
      <div>
        <button onClick={onBack} className="flex items-center text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Assignments
        </button>
        <div className="p-8 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
          <p className="text-muted-foreground">Assignment not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center text-primary mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Assignments
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssignmentHeader assignment={assignment} />
          <AssignmentTabs assignment={assignment} />
        </div>
        
        <AssignmentSidebar assignment={assignment} />
      </div>
    </div>
  );
};

export default AssignmentDetail;
