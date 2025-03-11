
import React, { useState } from 'react';
import {
  DollarSign,
  Percent,
  Info,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UsageRights {
  primaryCampaign: boolean;
  secondaryBrand: boolean;
  extendedMarketing: boolean;
  derivativeWorks: boolean;
  merchandising: boolean;
  publicity: boolean;
  socialMedia: boolean;
  aiTraining: boolean;
}

interface RightsManagementProps {
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  usageRights: UsageRights;
  onUsageRightsChange: (key: keyof UsageRights) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const RightsManagement: React.FC<RightsManagementProps> = ({
  ownershipSplit,
  setOwnershipSplit,
  usageRights,
  onUsageRightsChange,
  onBack,
  onNext
}) => {
  const [showFractionalOwnershipInfo, setShowFractionalOwnershipInfo] = useState(false);

  const toggleFractionalOwnershipInfo = () => {
    setShowFractionalOwnershipInfo(!showFractionalOwnershipInfo);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Ownership Structure
          </h3>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleFractionalOwnershipInfo}
                  className="text-gray-400 hover:text-white"
                >
                  <Info className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Learn about fractional ownership model</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {showFractionalOwnershipInfo && (
          <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-blue-500 relative">
            <button 
              onClick={toggleFractionalOwnershipInfo} 
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="text-sm font-medium text-blue-400 mb-2">Fractional Ownership Model</h4>
            <p className="text-xs text-gray-300 mb-2">
              Fractional ownership means sharing the rights to content between brands and creators.
              Instead of traditional "work for hire" where brands own everything, this model:
            </p>
            <ul className="text-xs text-gray-300 space-y-1 ml-4 list-disc">
              <li>Creates ongoing revenue opportunities for unused assets</li>
              <li>Allows creators to maintain some rights to their work</li>
              <li>Establishes more collaborative relationships</li>
              <li>Incentivizes higher quality content creation</li>
            </ul>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Brand Ownership</span>
              <span className="text-sm text-gray-300">Creator Ownership</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-xl">{ownershipSplit}%</span>
              <div className="w-full mx-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ownershipSplit}
                  onChange={(e) => setOwnershipSplit(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <span className="font-medium text-xl">{100 - ownershipSplit}%</span>
            </div>
          </div>
          
          <div className="flex justify-between bg-gray-800 p-3 rounded-lg">
            <div className="text-center w-1/2 border-r border-gray-600 pr-2">
              <h4 className="text-sm mb-1">Brand Revenue Share</h4>
              <div className="flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-lg font-medium">{ownershipSplit}%</span>
              </div>
            </div>
            <div className="text-center w-1/2 pl-2">
              <h4 className="text-sm mb-1">Creator Revenue Share</h4>
              <div className="flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-lg font-medium">{100 - ownershipSplit}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
              const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
              
              let description = "";
              switch(key) {
                case 'secondaryBrand':
                  description = "Use in internal presentations, company archives, etc.";
                  break;
                case 'extendedMarketing':
                  description = "Use in additional marketing beyond primary campaign";
                  break;
                case 'derivativeWorks':
                  description = "Create edited versions or derivatives from content";
                  break;
                case 'merchandising':
                  description = "Use on physical products for sale";
                  break;
                case 'publicity':
                  description = "Use in PR, press releases, and media relations";
                  break;
                case 'socialMedia':
                  description = "Use across social media platforms";
                  break;
                case 'aiTraining':
                  description = "Use content to train AI systems";
                  break;
                default:
                  description = "Additional usage rights";
              }
              
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
      
      {(onBack || onNext) && (
        <div className="flex justify-between pt-4">
          {onBack && (
            <Button 
              onClick={onBack}
              variant="outline"
            >
              Back
            </Button>
          )}
          {onNext && (
            <Button 
              onClick={onNext}
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RightsManagement;
