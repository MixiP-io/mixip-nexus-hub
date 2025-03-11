import React from 'react';
import { FileText, Tag, Copyright, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetadataSectionProps } from '../types/componentProps';

const MetadataSection: React.FC<MetadataSectionProps> = ({
  tags,
  setTags,
  licenseType,
  setLicenseType,
  usageRights,
  setUsageRights
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <FileText className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-medium">Metadata & Rights</h3>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-blue-400" />
            <Label htmlFor="tags">Tags</Label>
          </div>
          <Input 
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-gray-700 border-gray-600 focus:border-purple-500"
            placeholder="Enter tags separated by commas"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Copyright className="h-4 w-4 text-green-400" />
            <Label htmlFor="license">License Type</Label>
          </div>
          <Select value={licenseType} onValueChange={setLicenseType}>
            <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select a license type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="standard">Standard License</SelectItem>
              <SelectItem value="extended">Extended License</SelectItem>
              <SelectItem value="custom">Custom License</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="usage">Usage Rights</Label>
          </div>
          <Select value={usageRights} onValueChange={setUsageRights}>
            <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select usage rights" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="editorial">Editorial</SelectItem>
              <SelectItem value="ai-training">AI Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MetadataSection;
