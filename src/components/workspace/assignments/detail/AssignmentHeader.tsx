
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
      case 'pending': return 'secondary';
      case 'in progress': return 'default';
      case 'completed': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{assignment.title}</h2>
          <p className="text-foreground/80">From {assignment.client}</p>
        </div>
        <Badge variant={getBadgeVariant(assignment.status)}>
          {assignment.status}
        </Badge>
      </CardHeader>
    </Card>
  );
};

export default AssignmentHeader;
