
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BasicInfoTabProps {
  projectName: string;
  setProjectName: (name: string) => void;
  setActiveTab: (tab: string) => void;
  setIsOpen: (open: boolean) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  projectName,
  setProjectName,
  setActiveTab,
  setIsOpen,
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="project-name" className="text-gray-200">Project Name</Label>
        <Input
          id="project-name"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          required
        />
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setIsOpen(false)}
          className="border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
        >
          Cancel
        </Button>
        
        <Button 
          type="button" 
          onClick={() => setActiveTab("rights")}
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={!projectName.trim()}
        >
          Next: Rights Management
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoTab;
