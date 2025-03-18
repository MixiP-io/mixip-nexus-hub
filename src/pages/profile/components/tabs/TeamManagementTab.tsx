
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Mail, Shield, User, UserCog, Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock team members data
const initialTeamMembers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@aicompany.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Michael Chen', email: 'michael@aicompany.com', role: 'member', status: 'active' },
  { id: '3', name: 'Olivia Rodriguez', email: 'olivia@aicompany.com', role: 'member', status: 'pending' }
];

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return (
        <Badge className="bg-red-900/30 text-red-400 border border-red-700">
          <Shield className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    case 'member':
      return (
        <Badge className="bg-blue-900/30 text-blue-400 border border-blue-700">
          <User className="h-3 w-3 mr-1" />
          Member
        </Badge>
      );
    case 'viewer':
      return (
        <Badge className="bg-green-900/30 text-green-400 border border-green-700">
          <User className="h-3 w-3 mr-1" />
          Viewer
        </Badge>
      );
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-600">Active</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-600">Inactive</Badge>;
    default:
      return null;
  }
};

const TeamManagementTab: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'member' | 'viewer'>('member');
  const { toast } = useToast();

  const handleInviteMember = () => {
    if (!newEmail) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newEmail.split('@')[0], // Just for demo
      email: newEmail,
      role: newRole,
      status: 'pending'
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewEmail('');
    setNewRole('member');
    setShowInviteForm(false);

    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newEmail}`,
    });
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast({
      title: "Team member removed",
      description: "The team member has been removed from your organization.",
    });
  };

  const handleChangeRole = (id: string, newRole: 'admin' | 'member' | 'viewer') => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, role: newRole } : member
    ));
    toast({
      title: "Role updated",
      description: "The team member's role has been updated.",
    });
  };

  return (
    <Card className="border-none shadow-sm bg-gray-900 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Management</CardTitle>
            <CardDescription className="text-gray-400">
              Manage team members and their access levels
            </CardDescription>
          </div>
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        <Separator className="bg-gray-800" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-white">Organization Members</h4>
          <Button 
            onClick={() => setShowInviteForm(true)}
            className={showInviteForm ? 'hidden' : ''}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
        
        {showInviteForm && (
          <div className="border rounded-lg p-4 bg-gray-800 border-gray-700 mb-4">
            <h4 className="font-medium mb-3 text-white">Invite New Team Member</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="colleague@company.com" 
                    className="bg-gray-700 border-gray-600 text-white"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Role</label>
                <Select value={newRole} onValueChange={(value: any) => setNewRole(value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInviteMember}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {teamMembers.map(member => (
            <div key={member.id} className="border rounded-lg p-4 bg-gray-800 border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-medium">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-gray-400">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getRoleBadge(member.role)}
                {getStatusBadge(member.status)}
                <Select 
                  value={member.role} 
                  onValueChange={(value: any) => handleChangeRole(member.id, value)}
                  disabled={member.status !== 'active'}
                >
                  <SelectTrigger className="w-[140px] bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-4 bg-gray-800/50 border-gray-700 mt-4">
          <div className="flex items-start gap-3">
            <UserCog className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h5 className="font-medium text-white mb-1">Access Levels Explained</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <span className="text-red-400 font-medium">Admin:</span> Full access to all organization settings, team management, and billing
                </li>
                <li>
                  <span className="text-blue-400 font-medium">Member:</span> Can use all platform features and collaborate on projects
                </li>
                <li>
                  <span className="text-green-400 font-medium">Viewer:</span> Read-only access to projects and data
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamManagementTab;
