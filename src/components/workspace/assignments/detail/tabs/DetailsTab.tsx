
import React from 'react';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Assignment } from '../../types/assignment';

interface DetailsTabProps {
  assignment: Assignment;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ assignment }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Due Date</p>
          <p className="flex items-center text-foreground">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="flex items-center text-foreground">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            {assignment.location}
          </p>
        </div>
        
        {assignment.budget && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="flex items-center text-foreground">
              <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
              ${assignment.budget}
            </p>
          </div>
        )}
        
        {assignment.teamSize && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Team Size</p>
            <p className="flex items-center text-foreground">
              <Users className="w-4 h-4 mr-2 text-muted-foreground" />
              {assignment.teamSize} people
            </p>
          </div>
        )}
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-2 text-foreground">Assignment Description</h3>
        <p className="text-foreground">{assignment.description}</p>
      </div>
      
      {assignment.requirements && (
        <div>
          <h3 className="font-medium mb-2 text-foreground">Requirements</h3>
          <ul className="list-disc pl-5 space-y-1 text-foreground">
            {assignment.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsTab;
