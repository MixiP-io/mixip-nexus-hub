
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  MessageCircle, 
  Edit, 
  CheckCircle,
  XCircle,
  Calendar as CalendarIcon,
  FileText,
  Share2,
  DollarSign,
  Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { getAssignmentById } from './utils/assignmentData';

interface AssignmentDetailProps {
  assignmentId: number;
  onBack: () => void;
}

const AssignmentDetail: React.FC<AssignmentDetailProps> = ({ assignmentId, onBack }) => {
  const [activeTab, setActiveTab] = useState('details');
  const assignment = getAssignmentById(assignmentId);
  
  if (!assignment) {
    return (
      <div>
        <button onClick={onBack} className="flex items-center text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Assignments
        </button>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Assignment not found</p>
        </Card>
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    // In a real app, you'd call an API to update the status
    toast.success(`Assignment status updated to ${newStatus}`);
  };

  const handleMessage = () => {
    toast.info('Messaging functionality coming soon');
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center text-primary mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Assignments
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main assignment details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{assignment.title}</h2>
                <p className="text-muted-foreground">From {assignment.client}</p>
              </div>
              <Badge variant={
                assignment.status === 'Completed' ? 'default' : 
                assignment.status === 'Rejected' ? 'destructive' : 
                assignment.status === 'In Progress' ? 'default' : 'secondary'
              }>
                {assignment.status}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="details">
                    <FileText className="w-4 h-4 mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="deliverables">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Deliverables
                  </TabsTrigger>
                  <TabsTrigger value="messages">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="timeline">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Timeline
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
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
                </TabsContent>
                
                <TabsContent value="deliverables">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-muted-foreground">Deliverables management coming soon</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-muted-foreground">Messaging system coming soon</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="timeline">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-muted-foreground">Timeline tracking coming soon</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar with actions and contacts */}
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
      </div>
    </div>
  );
};

export default AssignmentDetail;
