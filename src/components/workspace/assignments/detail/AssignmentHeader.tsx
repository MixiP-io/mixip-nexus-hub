
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '../types/assignment';

interface AssignmentHeaderProps {
  assignment: Assignment;
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({ assignment }) => {
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-frameio-accent-yellow text-black font-medium tracking-wide';
      case 'in progress': return 'bg-frameio-accent-blue text-white font-medium tracking-wide';
      case 'completed': return 'bg-frameio-accent-green text-white font-medium tracking-wide';
      case 'rejected': return 'bg-frameio-accent-red text-white font-medium tracking-wide';
      default: return 'bg-frameio-text-tertiary text-white font-medium tracking-wide';
    }
  };

  return (
    <Card className="bg-frameio-bg-card border-frameio-border-subtle shadow-md mb-6">
      <CardHeader className="flex flex-row justify-between items-start p-5 space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-frameio-text-primary tracking-tight">{assignment.title}</h2>
          <p className="text-frameio-text-secondary text-sm mt-1.5">From {assignment.client}</p>
        </div>
        <Badge className={getBadgeVariant(assignment.status)}>
          {assignment.status}
        </Badge>
      </CardHeader>
    </Card>
  );
};

export default AssignmentHeader;
