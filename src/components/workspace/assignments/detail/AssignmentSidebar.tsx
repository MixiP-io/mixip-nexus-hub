
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle, 
  XCircle, 
  MessageCircle, 
  Share2, 
  Trash 
} from 'lucide-react';
import { toast } from 'sonner';
import { Assignment } from '../types/assignment';

interface AssignmentSidebarProps {
  assignment: Assignment;
}

const AssignmentSidebar: React.FC<AssignmentSidebarProps> = ({ assignment }) => {
  const handleStatusChange = (newStatus: string) => {
    // In a real app, you'd call an API to update the status
    toast.success(`Assignment status updated to ${newStatus}`);
  };

  const handleMessage = () => {
    toast.info('Messaging functionality coming soon');
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <h3 className="font-medium text-foreground">Assignment Actions</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          {assignment.status === 'Pending' && (
            <>
              <Button className="w-full bg-mixip-mint hover:bg-mixip-mint/90" onClick={() => handleStatusChange('In Progress')}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept Assignment
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => handleStatusChange('Rejected')}>
                <XCircle className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </>
          )}
          
          {assignment.status === 'In Progress' && (
            <Button className="w-full bg-mixip-mint hover:bg-mixip-mint/90" onClick={() => handleStatusChange('Completed')}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Completed
            </Button>
          )}
          
          <Button variant="outline" className="w-full" onClick={handleMessage}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Client
          </Button>
          
          {(assignment.type === 'Photography' || assignment.type === 'Videography') && (
            <Button variant="outline" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          )}
          
          <Button variant="destructive" className="w-full">
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="font-medium text-foreground">Client Contact</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{assignment.client.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{assignment.client}</p>
              <p className="text-sm text-muted-foreground">Client</p>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleMessage}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentSidebar;
