
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '../types/assignment';
import { Calendar, Clock, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface AssignmentHeaderProps {
  assignment: Assignment;
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({ assignment }) => {
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-frameio-accent-yellow text-black font-medium tracking-wide flex items-center';
      case 'in progress': return 'bg-frameio-accent-blue text-white font-medium tracking-wide flex items-center';
      case 'completed': return 'bg-frameio-accent-green text-white font-medium tracking-wide flex items-center';
      case 'rejected': return 'bg-frameio-accent-red text-white font-medium tracking-wide flex items-center';
      default: return 'bg-frameio-text-tertiary text-white font-medium tracking-wide flex items-center';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="mr-1.5 h-3.5 w-3.5" />;
      case 'in progress': return <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin-slow" />;
      case 'completed': return <CheckCircle className="mr-1.5 h-3.5 w-3.5" />;
      case 'rejected': return <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <Card className="bg-frameio-bg-card border-frameio-border-subtle shadow-frame-card mb-6 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-frameio-accent-blue to-frameio-accent-purple"></div>
      <CardHeader className="flex flex-row justify-between items-start p-5 space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-frameio-text-primary tracking-tight">{assignment.title}</h2>
          <div className="flex items-center text-frameio-text-secondary text-sm mt-1.5">
            <span>From {assignment.client}</span>
            {assignment.dueDate && (
              <>
                <span className="mx-2">•</span>
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>Due {formatDate(assignment.dueDate)}</span>
              </>
            )}
          </div>
        </div>
        <Badge className={getBadgeVariant(assignment.status)}>
          {getStatusIcon(assignment.status)}
          {assignment.status}
        </Badge>
      </CardHeader>
    </Card>
  );
};

export default AssignmentHeader;
