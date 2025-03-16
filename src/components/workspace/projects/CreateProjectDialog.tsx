
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createProject, ProjectOwner, ProjectLicensing } from '../batch-uploader/utils/projectUtils';
import { UsageRights } from '../rights-management/types';

import BasicInfoTab from './dialog/BasicInfoTab';
import RightsManagementTab from './dialog/RightsManagementTab';
import { CreateProjectDialogProps } from './dialog/types';

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  isOpen,
  setIsOpen,
  onCreateProject,
  parentFolderId,
}) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTags, setProjectTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Ownership state
  const [ownershipSplit, setOwnershipSplit] = useState(100);
  const [additionalOwners, setAdditionalOwners] = useState<ProjectOwner[]>([]);
  
  // Default primary owner
  const primaryOwner: ProjectOwner = {
    userId: 'user1', // In a real app, would be current user's ID
    name: 'John Doe', // In a real app, would be current user's name
    email: 'john@example.com', // In a real app, would be current user's email
    royaltyPercentage: ownershipSplit
  };
  
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
    // Update primary owner's percentage and combine with additional owners
    const primaryWithUpdatedPercentage = {
      ...primaryOwner,
      royaltyPercentage: ownershipSplit
    };
    
    const owners: ProjectOwner[] = [
      primaryWithUpdatedPercentage,
      ...additionalOwners
    ];
    
    // Prepare the licensing data
    const licensing: ProjectLicensing = {
      type: licenseType,
      usageRights
    };
    
    // Create the project with ownership and licensing data
    const newProject = createProject(projectName, {
      description: projectDescription,
      tags: projectTags,
      owners,
      licensing,
      parentId: parentFolderId
    });
    
    // Notify parent component
    onCreateProject(newProject.name);
    
    // Reset form
    setProjectName('');
    setProjectDescription('');
    setProjectTags([]);
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
      <DialogContent className="bg-gray-800 border-gray-700 max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Project</DialogTitle>
          <DialogDescription className="text-gray-300">
            Create a new project to organize your creative assets.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-gray-700">
            <TabsTrigger 
              value="basic" 
              className="data-[state=active]:bg-gray-600 data-[state=active]:text-white text-gray-300"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="rights" 
              className="data-[state=active]:bg-gray-600 data-[state=active]:text-white text-gray-300"
            >
              Ownership & Rights
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="overflow-y-auto">
            <TabsContent value="basic">
              <BasicInfoTab 
                projectName={projectName}
                setProjectName={setProjectName}
                projectDescription={projectDescription}
                setProjectDescription={setProjectDescription}
                projectTags={projectTags}
                setProjectTags={setProjectTags}
                setActiveTab={setActiveTab}
                setIsOpen={setIsOpen}
              />
            </TabsContent>
            
            <TabsContent value="rights" className="overflow-visible">
              <RightsManagementTab 
                ownershipSplit={ownershipSplit}
                setOwnershipSplit={setOwnershipSplit}
                usageRights={usageRights}
                onUsageRightsChange={handleUsageRightsChange}
                setActiveTab={setActiveTab}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                projectName={projectName}
                primaryOwner={primaryOwner}
                additionalOwners={additionalOwners}
                setAdditionalOwners={setAdditionalOwners}
              />
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
