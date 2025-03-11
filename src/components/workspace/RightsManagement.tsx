
import React, { useState } from 'react';
import { 
  Shield, 
  Info, 
  HelpCircle, 
  Percent, 
  DollarSign,
  Share2,
  FileText,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Smartphone,
  ShoppingBag,
  Globe,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RightsManagementProps {
  ownershipSplit: number;
  setOwnershipSplit: (value: number) => void;
  usageRights: {
    primaryCampaign: boolean;
    secondaryBrand: boolean;
    extendedMarketing: boolean;
    derivativeWorks: boolean;
    merchandising: boolean;
    publicity: boolean;
    socialMedia: boolean;
    aiTraining: boolean;
  };
  onUsageRightsChange: (key: keyof typeof usageRights) => void;
}

const RightsManagement: React.FC<RightsManagementProps> = ({
  ownershipSplit,
  setOwnershipSplit,
  usageRights,
  onUsageRightsChange
}) => {
  const [showEducationalPopup, setShowEducationalPopup] = useState(false);
  
  // Calculate estimated revenue based on ownership split (demo data)
  const calculateEstimatedRevenue = (splitPercentage: number) => {
    // Demo values for visualization purposes
    const totalEstimatedValue = 10000;
    const brandRevenue = (totalEstimatedValue * splitPercentage) / 100;
    const creatorRevenue = totalEstimatedValue - brandRevenue;
    
    return {
      brand: brandRevenue,
      creator: creatorRevenue,
      total: totalEstimatedValue
    };
  };
  
  const estimatedRevenue = calculateEstimatedRevenue(ownershipSplit);
  
  const usageCategories = [
    {
      id: 'primaryCampaign',
      name: 'Primary Campaign',
      description: 'Usage for the intended marketing campaign',
      icon: <FileText className="h-6 w-6" />,
      alwaysEnabled: true
    },
    {
      id: 'secondaryBrand',
      name: 'Secondary Brand Usage',
      description: 'Internal presentations, company archive, etc.',
      icon: <Linkedin className="h-6 w-6" />
    },
    {
      id: 'extendedMarketing',
      name: 'Extended Marketing',
      description: 'Usage beyond the initial campaign period',
      icon: <Clock className="h-6 w-6" />
    },
    {
      id: 'derivativeWorks',
      name: 'Derivative Works',
      description: 'Ability to edit, remix, or create new works',
      icon: <Share2 className="h-6 w-6" />
    },
    {
      id: 'merchandising',
      name: 'Merchandising Rights',
      description: 'Usage on physical products for sale',
      icon: <ShoppingBag className="h-6 w-6" />
    },
    {
      id: 'publicity',
      name: 'Publicity/PR Rights',
      description: 'Usage in press releases, interviews, etc.',
      icon: <Globe className="h-6 w-6" />
    },
    {
      id: 'socialMedia',
      name: 'Social Media Rights',
      description: 'Usage across social media platforms',
      icon: <Instagram className="h-6 w-6" />
    },
    {
      id: 'aiTraining',
      name: 'AI Training Rights',
      description: 'Permission to use content for AI model training',
      icon: <Smartphone className="h-6 w-6" />
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-4 rounded-lg relative">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-400" />
            Ownership Structure
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setShowEducationalPopup(true)} className="text-gray-400 hover:text-white">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs bg-gray-800 text-white border-gray-700">
                <p>
                  Smart rights allocation enables both brands and creators to benefit from content usage. 
                  The traditional model of "all rights" transfers is giving way to collaborative ownership.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600 mb-5">
          <div className="font-medium text-center mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Reimagine Content Ownership
          </div>
          <p className="text-sm text-gray-300 mb-4 text-center">
            Move beyond "work for hire" to a collaborative model where both brands and creators can generate revenue from content.
          </p>
          
          <div className="relative my-8">
            <div className="h-2 bg-gray-600 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                style={{ width: `${ownershipSplit}%` }}
              ></div>
            </div>
            <div className="absolute -top-8 flex justify-between w-full text-sm">
              <span>Creators</span>
              <span>Brand</span>
            </div>
            <div className="absolute -bottom-8 flex justify-between w-full text-lg font-bold">
              <div className="flex items-center">
                <span>{100 - ownershipSplit}%</span>
              </div>
              <div className="flex items-center">
                <span>{ownershipSplit}%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-4 border-t border-gray-600">
            <div className="text-center text-gray-400 text-sm mb-2">
              Adjust ownership percentage
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={ownershipSplit}
              onChange={(e) => setOwnershipSplit(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0% Brand</span>
              <span>50/50</span>
              <span>100% Brand</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h4 className="font-medium mb-3 flex items-center">
            <Percent className="w-4 h-4 mr-2 text-green-400" />
            Revenue Potential Visualization
          </h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-400 mb-1">Brand Revenue</div>
              <div className="text-2xl font-bold text-blue-400">
                ${estimatedRevenue.brand.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Based on {ownershipSplit}% ownership</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-400 mb-1">Creator Revenue</div>
              <div className="text-2xl font-bold text-purple-400">
                ${estimatedRevenue.creator.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Based on {100 - ownershipSplit}% ownership</div>
            </div>
          </div>
          
          <div className="text-xs text-center text-gray-400">
            <span className="flex items-center justify-center">
              <Info className="w-3 h-3 mr-1" />
              These figures represent potential revenue from secondary usage rights
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-400" />
          Usage Rights Matrix
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usageCategories.map((category) => (
            <TooltipProvider key={category.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${
                      usageRights[category.id as keyof typeof usageRights] 
                        ? 'bg-gray-800 border-green-500' 
                        : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => !category.alwaysEnabled && onUsageRightsChange(category.id as keyof typeof usageRights)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3 text-gray-300">
                        {category.icon}
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-gray-400">{category.description}</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      usageRights[category.id as keyof typeof usageRights] 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      {usageRights[category.id as keyof typeof usageRights] ? '✓' : ''}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs bg-gray-800 text-white border-gray-700">
                  <p>{category.description}</p>
                  {category.alwaysEnabled && (
                    <p className="text-xs text-gray-400 mt-1">This right is required for your campaign.</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
        >
          Continue
        </button>
      </div>
      
      {/* Educational Modal/Popup - could be implemented with a proper modal component */}
      {showEducationalPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-400" />
                Understanding Fractional Ownership
              </h3>
              <button 
                onClick={() => setShowEducationalPopup(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <p>
                Fractional ownership creates ongoing value for both brands and creators by establishing 
                a collaborative model for content rights.
              </p>
              
              <h4 className="text-lg font-medium">Benefits</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>
                  <span className="font-medium text-white">For Brands:</span> Access to higher quality creators, 
                  more collaborative relationships, and often lower upfront costs.
                </li>
                <li>
                  <span className="font-medium text-white">For Creators:</span> Ongoing revenue streams, 
                  greater creative control, and the ability to build sustainable businesses.
                </li>
              </ul>
              
              <h4 className="text-lg font-medium">How It Works</h4>
              <p>
                Instead of purchasing "all rights" upfront, brands can license specific usage rights while 
                creators retain ownership of the underlying content. This enables both parties to generate 
                revenue from secondary uses such as licensing to other brands or platforms.
              </p>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Industry Benchmark</h5>
                <p className="text-sm text-gray-300">
                  The most common ownership split is 50/50 between brands and creators, but this can be 
                  adjusted based on your specific needs and relationship with the creative team.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={() => setShowEducationalPopup(false)}
                className="bg-green-600 hover:bg-green-700"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightsManagement;
