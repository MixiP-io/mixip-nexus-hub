
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createProject, ProjectOwner, ProjectLicensing } from '../batch-uploader/utils/projectUtils';
import RightsManagement from '../rights-management';
import { UsageRights } from '../rights-management/types';

interface CreateProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCreateProject: (name: string) => void;
  parentFolderId?: string;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  isOpen,
  setIsOpen,
  onCreateProject,
  parentFolderId,
}) => {
  const [projectName, setProjectName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Ownership state
  const [ownershipSplit, setOwnershipSplit] = useState(100);
  const [additionalOwners, setAdditionalOwners] = useState<ProjectOwner[]>([]);
  
  // Rights management state
  const [licenseType, setLicenseType] = useState('standard');
  const [usageRights, setUsageRights] = useState<UsageRights>({
    primaryCampaign: true,
    secondaryBrand: false,
    extendedMarketing: false,
    derivativeWorks: false,
    merchandising: false,
    publicity: false,
    socialMedia: true,
    aiTraining: false
  });

  const handleUsageRightsChange = (key: keyof UsageRights) => {
    setUsageRights(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) return;
    
    setIsSubmitting(true);
    
    // Prepare the ownership data
    const owners: ProjectOwner[] = [
      { 
        userId: 'user1', // In a real app, would be current user's ID
        name: 'John Doe', // In a real app, would be current user's name
        email: 'john@example.com', // In a real app, would be current user's email
        royaltyPercentage: ownershipSplit 
      },
      ...additionalOwners
    ];
    
    // Prepare the licensing data
    const licensing: ProjectLicensing = {
      type: licenseType,
      usageRights
    };
    
    // Create the project with ownership and licensing data
    const newProject = createProject(projectName, {
      owners,
      licensing,
      parentId: parentFolderId
    });
    
    // Notify parent component
    onCreateProject(newProject.name);
    
    // Reset form
    setProjectName('');
    setOwnershipSplit(100);
    setAdditionalOwners([]);
    setLicenseType('standard');
    setUsageRights({
      primaryCampaign: true,
      secondaryBrand: false,
      extendedMarketing: false,
      derivativeWorks: false,
      merchandising: false,
      publicity: false,
      socialMedia: true,
      aiTraining: false
    });
    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize your creative assets.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="rights">Ownership & Rights</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="border-gray-600"
                >
                  Cancel
                </Button>
                
                <Button 
                  type="button" 
                  onClick={() => setActiveTab("rights")}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!projectName.trim()}
                >
                  Next: Rights Management
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="rights" className="space-y-4 py-4">
              <div className="space-y-4">
                <RightsManagement
                  ownershipSplit={ownershipSplit}
                  setOwnershipSplit={setOwnershipSplit}
                  usageRights={usageRights}
                  onUsageRightsChange={handleUsageRightsChange}
                />
              </div>
              
              <DialogFooter className="pt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("basic")}
                  className="border-gray-600"
                >
                  Back
                </Button>
                
                <Button 
                  type="submit" 
                  disabled={!projectName.trim() || isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </Button>
              </DialogFooter>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
