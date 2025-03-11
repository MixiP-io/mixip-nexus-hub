
import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Briefcase,
  Camera,
  Video,
  Users,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from './types/assignment';

interface AssignmentCardProps {
  assignment: Assignment;
  onClick: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onClick }) => {
  // Status badge configuration
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'secondary';
      case 'in progress': return 'default';
      case 'completed': return 'default'; // Using 'default' instead of 'success'
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  // Icon for assignment type
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'photography': return <Camera className="w-8 h-8 text-primary" />;
      case 'videography': return <Video className="w-8 h-8 text-purple-400" />;
      case 'marketing': return <Briefcase className="w-8 h-8 text-mixip-mint" />;
      default: return <Briefcase className="w-8 h-8 text-muted-foreground" />;
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="bg-card p-4 flex justify-between items-start">
        <div className="flex items-center">
          {getTypeIcon(assignment.type)}
          <div className="ml-3">
            <h3 className="font-medium text-foreground">{assignment.title}</h3>
            <p className="text-sm text-muted-foreground">{assignment.client}</p>
          </div>
        </div>
        <Badge variant={getBadgeVariant(assignment.status)}>
          {assignment.status}
        </Badge>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{assignment.location}</span>
          </div>
          
          {assignment.budget && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>Budget: ${assignment.budget}</span>
            </div>
          )}
          
          {assignment.teamSize && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              <span>Team: {assignment.teamSize} people</span>
            </div>
          )}
        </div>
        
        <p className="mt-3 text-sm line-clamp-2 text-foreground">{assignment.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 border-t border-border">
        <div className="flex justify-between w-full items-center">
          <span className="text-xs text-muted-foreground">
            {new Date(assignment.createdAt).toLocaleDateString()}
          </span>
          
          {assignment.priority && (
            <Badge variant={assignment.priority === 'High' ? 'destructive' : 'outline'} className="text-xs">
              {assignment.priority} Priority
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
