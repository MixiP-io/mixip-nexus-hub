
import React from 'react';
import { Percent, Info, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UsageRights } from './types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UsageRightsMatrixProps {
  usageRights: UsageRights;
  onUsageRightsChange: (key: keyof UsageRights) => void;
}

const UsageRightsMatrix: React.FC<UsageRightsMatrixProps> = ({
  usageRights,
  onUsageRightsChange
}) => {
  const getDescriptionForRight = (key: string): string => {
    switch(key) {
      case 'primaryCampaign':
        return "Use in the primary campaign (always included)";
      case 'secondaryBrand':
        return "Use in internal presentations, company archives, etc.";
      case 'extendedMarketing':
        return "Use in additional marketing beyond primary campaign";
      case 'derivativeWorks':
        return "Create edited versions or derivatives from content";
      case 'merchandising':
        return "Use on physical products for sale";
      case 'publicity':
        return "Use in PR, press releases, and media relations";
      case 'socialMedia':
        return "Use across social media platforms";
      case 'aiTraining':
        return "Use content to train AI systems";
      default:
        return "Additional usage rights";
    }
  };

  const formatLabel = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="font-medium mb-4 flex items-center">
        <Percent className="w-5 h-5 mr-2" />
        Usage Rights Matrix
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={cn(
          "p-3 rounded-lg border",
          "bg-gray-800 border-green-500 opacity-75"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span className="font-medium">Primary Campaign Usage</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-white">
                    <Info className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    Use of content for the primary campaign purpose. This right is always granted.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-xs text-gray-400 mt-1 ml-6">Use in the primary campaign (always included)</p>
        </div>
        
        {Object.entries(usageRights)
          .filter(([key]) => key !== 'primaryCampaign')
          .map(([key, value]) => {
            const label = formatLabel(key);
            const description = getDescriptionForRight(key);
            
            return (
              <div 
                key={key}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer hover:border-gray-500",
                  value 
                    ? "bg-gray-800 border-green-500" 
                    : "bg-gray-800 border-gray-600"
                )}
                onClick={() => onUsageRightsChange(key as keyof UsageRights)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {value ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 mr-2 rounded-sm border border-gray-500" />
                    )}
                    <span className="font-medium">{label}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-gray-400 hover:text-white">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-[200px]">
                          {description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-6">{description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UsageRightsMatrix;
