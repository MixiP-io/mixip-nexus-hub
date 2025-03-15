
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCampaignForm } from './context/CampaignFormContext';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Users, Palette, DollarSign, SendIcon } from 'lucide-react';

const ReviewStep: React.FC<{ onBack: () => void; onComplete: () => void }> = ({ 
  onBack,
  onComplete
}) => {
  const { formState } = useCampaignForm();
  
  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'MMM dd, yyyy') : 'Not specified';
  };
  
  const getUsageRightsList = () => {
    const rights = [];
    if (formState.usageRights.primaryCampaign) rights.push('Primary Campaign');
    if (formState.usageRights.secondaryBrand) rights.push('Secondary Brand');
    if (formState.usageRights.extendedMarketing) rights.push('Extended Marketing');
    if (formState.usageRights.derivativeWorks) rights.push('Derivative Works');
    if (formState.usageRights.merchandising) rights.push('Merchandising');
    if (formState.usageRights.publicity) rights.push('Publicity');
    if (formState.usageRights.socialMedia) rights.push('Social Media');
    if (formState.usageRights.aiTraining) rights.push('AI Training');
    
    return rights.length > 0 ? rights.join(', ') : 'None selected';
  };
  
  // Format distribution method
  const getDistributionMethod = () => {
    switch (formState.distributionMethod) {
      case 'platform':
        return 'Platform - All users';
      case 'specific':
        return `Specific users (${formState.selectedUsers.length})`;
      case 'external':
        return `External emails (${formState.externalEmails.length})`;
      default:
        return 'Not specified';
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Review Campaign Details</h3>
      <p className="text-sm text-gray-400 mb-4">
        Please review all details of your campaign before creating it.
      </p>

      {/* Basic Info */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Basic Information</CardTitle>
          </div>
          <CalendarIcon className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-medium text-gray-300">Campaign Name</div>
              <div>{formState.campaignName}</div>
            </div>
            <div>
              <div className="font-medium text-gray-300">Description</div>
              <div className="line-clamp-2">{formState.campaignDesc}</div>
            </div>
            <div>
              <div className="font-medium text-gray-300">Date Range</div>
              <div>{formatDate(formState.startDate)} to {formatDate(formState.endDate)}</div>
            </div>
            <div>
              <div className="font-medium text-gray-300">Location</div>
              <div>{formState.location || formState.locationType}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Requirements */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Team Requirements</CardTitle>
          </div>
          <Users className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="text-sm">
          <div className="font-medium text-gray-300">Selected Roles</div>
          <div>{formState.selectedRoles.length > 0 ? formState.selectedRoles.join(', ') : 'No roles selected'}</div>
        </CardContent>
      </Card>

      {/* Creative Direction */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Creative Direction</CardTitle>
          </div>
          <Palette className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-3">
            <div>
              <div className="font-medium text-gray-300">Deliverables</div>
              <ul className="list-disc list-inside">
                {formState.deliverables.map(d => (
                  <li key={d.id}>{d.title} - {d.description}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-medium text-gray-300">Creative Brief</div>
              <div className="line-clamp-2">{formState.creativeDirection || 'None provided'}</div>
            </div>
            <div>
              <div className="font-medium text-gray-300">Attached File</div>
              <div>{formState.attachedFile ? formState.attachedFile.name : 'No file attached'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rights Management */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Rights Management</CardTitle>
          </div>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-3">
            <div>
              <div className="font-medium text-gray-300">Ownership Split</div>
              <div>Brand: {formState.ownershipSplit}% / Creators: {100 - formState.ownershipSplit}%</div>
            </div>
            <div>
              <div className="font-medium text-gray-300">Usage Rights</div>
              <div>{getUsageRightsList()}</div>
            </div>
            <div>
              <div className="font-medium text-gray-300">Owners</div>
              <div>
                <div className="font-medium">{formState.primaryOwner.name} (Primary): {formState.primaryOwner.royaltyPercentage}%</div>
                {formState.additionalOwners.map((owner, index) => (
                  <div key={index}>{owner.name}: {owner.royaltyPercentage}%</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Distribution</CardTitle>
          </div>
          <SendIcon className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-3">
            <div>
              <div className="font-medium text-gray-300">Distribution Method</div>
              <div>{getDistributionMethod()}</div>
            </div>
            <div>
              <div className="font-medium text-gray-300">Message</div>
              <div className="line-clamp-2">{formState.distributionMessage || 'No message included'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
        >
          Back
        </Button>
        <Button 
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Create Campaign
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
