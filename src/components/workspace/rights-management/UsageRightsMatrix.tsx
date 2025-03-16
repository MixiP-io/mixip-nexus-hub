
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UsageRights } from './types';
import { 
  FileImage, 
  Megaphone, 
  Building, 
  PenTool, 
  ShoppingBag, 
  Radio, 
  Share2, 
  Brain
} from 'lucide-react';

interface UsageRightsMatrixProps {
  usageRights: UsageRights;
  onUsageRightsChange: (key: keyof UsageRights) => void;
  compact?: boolean;
}

const UsageRightsMatrix: React.FC<UsageRightsMatrixProps> = ({ 
  usageRights, 
  onUsageRightsChange,
  compact = false
}) => {
  // Define rights in our matrix
  const rightsDefinitions = [
    { 
      key: 'primaryCampaign', 
      label: 'Primary Campaign', 
      description: 'Use in main marketing campaign',
      icon: Megaphone
    },
    { 
      key: 'secondaryBrand', 
      label: 'Secondary Brand', 
      description: 'Use for other brands in portfolio',
      icon: Building
    },
    { 
      key: 'extendedMarketing', 
      label: 'Extended Marketing', 
      description: 'Use beyond initial campaign',
      icon: FileImage
    },
    { 
      key: 'derivativeWorks', 
      label: 'Derivative Works', 
      description: 'Create new works based on this',
      icon: PenTool
    },
    { 
      key: 'merchandising', 
      label: 'Merchandising', 
      description: 'Use on products for sale',
      icon: ShoppingBag
    },
    { 
      key: 'publicity', 
      label: 'Publicity', 
      description: 'Use in PR and press',
      icon: Radio
    },
    { 
      key: 'socialMedia', 
      label: 'Social Media', 
      description: 'Use on social platforms',
      icon: Share2
    },
    { 
      key: 'aiTraining', 
      label: 'AI Training', 
      description: 'Use to train AI models',
      icon: Brain
    }
  ];

  return (
    <div className={`bg-gray-800 p-${compact ? '3' : '4'} rounded-lg border border-gray-700`}>
      <h3 className="font-medium text-white mb-4 flex items-center">
        <FileImage className="w-5 h-5 mr-2" />
        Usage Rights
      </h3>
      
      <div className={`grid ${compact ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
        {rightsDefinitions.map(right => {
          const key = right.key as keyof UsageRights;
          return (
            <div key={key} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  <right.icon className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400`} />
                </div>
                <div>
                  <Label 
                    htmlFor={`right-${key}`} 
                    className="text-white cursor-pointer font-medium"
                  >
                    {right.label}
                  </Label>
                  {!compact && (
                    <p className="text-xs text-gray-400 mt-1">{right.description}</p>
                  )}
                </div>
              </div>
              <Switch
                id={`right-${key}`}
                checked={usageRights[key]}
                onCheckedChange={() => onUsageRightsChange(key)}
                className={`${usageRights[key] ? 'bg-green-500' : 'bg-gray-600'}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsageRightsMatrix;
