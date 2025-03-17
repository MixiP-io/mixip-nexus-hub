
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckboxInput } from './form/CheckboxInput';
import { RadioGroup } from '@/components/ui/radio-group';
import { X, Plus } from 'lucide-react';

interface MetadataSectionProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  licenseType: string;
  setLicenseType: (license: string) => void;
  usageRights: Record<string, boolean>;
  setUsageRights: (rights: Record<string, boolean>) => void;
}

const MetadataSection: React.FC<MetadataSectionProps> = ({
  tags,
  setTags,
  licenseType,
  setLicenseType,
  usageRights,
  setUsageRights
}) => {
  const [tagInput, setTagInput] = React.useState('');
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleRightsChange = (right: string, checked: boolean) => {
    setUsageRights({
      ...usageRights,
      [right]: checked
    });
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <Label htmlFor="tags">Tags</Label>
        <div className="flex mt-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add tags..."
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={handleAddTag}
            className="ml-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="px-2 py-1 text-xs">
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)} 
                  className="ml-2 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <Label>License Type</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <Button
            type="button"
            variant={licenseType === 'standard' ? 'default' : 'outline'}
            className={licenseType === 'standard' ? 'bg-blue-600' : ''}
            onClick={() => setLicenseType('standard')}
          >
            Standard
          </Button>
          <Button
            type="button"
            variant={licenseType === 'editorial' ? 'default' : 'outline'}
            className={licenseType === 'editorial' ? 'bg-blue-600' : ''}
            onClick={() => setLicenseType('editorial')}
          >
            Editorial
          </Button>
        </div>
      </div>
      
      <div>
        <Label>Usage Rights</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <CheckboxInput
            label="Commercial Use"
            checked={usageRights.commercial || false}
            onChange={(checked) => handleRightsChange('commercial', checked)}
          />
          <CheckboxInput
            label="Editorial Use"
            checked={usageRights.editorial || false}
            onChange={(checked) => handleRightsChange('editorial', checked)}
          />
          <CheckboxInput
            label="Perpetual License"
            checked={usageRights.perpetual || false}
            onChange={(checked) => handleRightsChange('perpetual', checked)}
          />
          <CheckboxInput
            label="Worldwide Usage"
            checked={usageRights.worldwide || false}
            onChange={(checked) => handleRightsChange('worldwide', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default MetadataSection;
