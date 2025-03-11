
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
      case 'completed': return 'default'; 
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
      default: return <Briefcase className="w-8 h-8 text-primary/80" />;
    }
  };

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex justify-between items-start border-b border-gray-700">
        <div className="flex items-center">
          {getTypeIcon(assignment.type)}
          <div className="ml-3">
            <h3 className="font-medium text-white">{assignment.title}</h3>
            <p className="text-sm text-gray-400">{assignment.client}</p>
          </div>
        </div>
        <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
          {assignment.status}
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{assignment.location}</span>
          </div>
          
          {assignment.budget && (
            <div className="flex items-center text-sm text-gray-400">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>Budget: ${assignment.budget}</span>
            </div>
          )}
          
          {assignment.teamSize && (
            <div className="flex items-center text-sm text-gray-400">
              <Users className="w-4 h-4 mr-2" />
              <span>Team: {assignment.teamSize} people</span>
            </div>
          )}
        </div>
        
        <p className="mt-3 text-sm line-clamp-2 text-white">{assignment.description}</p>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex justify-between w-full items-center">
          <span className="text-xs text-gray-400">
            {new Date(assignment.createdAt).toLocaleDateString()}
          </span>
          
          {assignment.priority && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              assignment.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-gray-700 text-gray-300'
            }`}>
              {assignment.priority} Priority
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
