
import React, { useState } from 'react';
import { DollarSign, Info, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OwnershipStructureProps {
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  primaryOwnerName?: string;
  additionalOwnersCount?: number;
}

const OwnershipStructure: React.FC<OwnershipStructureProps> = ({
  ownershipSplit,
  setOwnershipSplit,
  primaryOwnerName = "Brand",
  additionalOwnersCount = 0
}) => {
  const [showFractionalOwnershipInfo, setShowFractionalOwnershipInfo] = useState(false);

  const toggleFractionalOwnershipInfo = () => {
    setShowFractionalOwnershipInfo(!showFractionalOwnershipInfo);
  };

  const creatorLabel = primaryOwnerName || "Brand";
  const contributorsLabel = additionalOwnersCount > 0 
    ? `Contributors (${additionalOwnersCount})`
    : "Creator";

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-white flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Ownership Structure
        </h3>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleFractionalOwnershipInfo}
                className="text-gray-300 hover:text-white"
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
        <div className="mb-4 p-3 bg-gray-700 rounded-lg border border-blue-500 relative">
          <button 
            onClick={toggleFractionalOwnershipInfo} 
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <h4 className="text-sm font-medium text-blue-400 mb-2">Fractional Ownership Model</h4>
          <p className="text-xs text-gray-200 mb-2">
            Fractional ownership means sharing the rights to content between brands and creators.
            Instead of traditional "work for hire" where brands own everything, this model:
          </p>
          <ul className="text-xs text-gray-200 space-y-1 ml-4 list-disc">
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
            <span className="text-sm text-gray-200">{creatorLabel}</span>
            <span className="text-sm text-gray-200">{contributorsLabel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-xl text-white">{ownershipSplit}%</span>
            <div className="w-full mx-4">
              <input
                type="range"
                min="0"
                max="100"
                value={ownershipSplit}
                onChange={(e) => setOwnershipSplit(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
            <span className="font-medium text-xl text-white">{100 - ownershipSplit}%</span>
          </div>
        </div>
        
        <div className="flex justify-between bg-gray-700 p-3 rounded-lg">
          <div className="text-center w-1/2 border-r border-gray-600 pr-2">
            <h4 className="text-sm mb-1 text-gray-200">{creatorLabel} Revenue Share</h4>
            <div className="flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-lg font-medium text-white">{ownershipSplit}%</span>
            </div>
          </div>
          <div className="text-center w-1/2 pl-2">
            <h4 className="text-sm mb-1 text-gray-200">{contributorsLabel} Revenue Share</h4>
            <div className="flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-lg font-medium text-white">{100 - ownershipSplit}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipStructure;
