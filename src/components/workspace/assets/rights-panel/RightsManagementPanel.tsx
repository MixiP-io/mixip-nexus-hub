
import React, { useState } from 'react';
import { X, User, MapPin } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import AssetNavigation from './AssetNavigation';
import AssetPreview from './AssetPreview';
import FacesTab from './FacesTab';
import LocationsTab from './LocationsTab';

interface RightsManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  assetIds: string[];
  assets: any[];
}

// Mock face recognition data
const mockFaces = [
  { id: 1, thumbnail: '/placeholder.svg', name: 'Unknown Person', status: 'unidentified' },
  { id: 2, thumbnail: '/placeholder.svg', name: 'Jane Smith', status: 'pending' },
  { id: 3, thumbnail: '/placeholder.svg', name: 'Mike Johnson', status: 'cleared' },
];

// Mock location data
const mockLocations = [
  { id: 1, name: 'Studio 5, Berlin', status: 'cleared' },
  { id: 2, name: 'Central Park, NYC', status: 'pending' },
  { id: 3, name: 'Beach Resort, Malibu', status: 'unidentified' },
];

const RightsManagementPanel: React.FC<RightsManagementPanelProps> = ({
  isOpen,
  onClose,
  assetIds,
  assets
}) => {
  const [activeTab, setActiveTab] = useState('faces');
  const [selectedFace, setSelectedFace] = useState<number | null>(null);
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  
  const currentAsset = assets[currentAssetIndex];
  const totalAssets = assets.length;
  
  const handlePreviousAsset = () => {
    setCurrentAssetIndex(prev => (prev > 0 ? prev - 1 : prev));
    setSelectedFace(null);
  };
  
  const handleNextAsset = () => {
    setCurrentAssetIndex(prev => (prev < totalAssets - 1 ? prev + 1 : prev));
    setSelectedFace(null);
  };
  
  const handleSendRightsRequest = () => {
    toast.success('Rights request sent successfully');
  };
  
  const handleApplyToAll = () => {
    toast.success('Changes applied to all selected assets');
  };
  
  const handleClearRights = () => {
    toast.success('Rights cleared successfully');
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg bg-gray-800 border-gray-700 text-white overflow-auto" side="right">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-white flex items-center justify-between">
            Rights Management
            <AssetNavigation 
              currentIndex={currentAssetIndex}
              totalAssets={totalAssets}
              handlePreviousAsset={handlePreviousAsset}
              handleNextAsset={handleNextAsset}
            />
          </SheetTitle>
          <SheetDescription className="text-gray-400">
            {totalAssets > 1 
              ? `Manage rights for ${totalAssets} selected assets` 
              : currentAsset?.name}
          </SheetDescription>
        </SheetHeader>
        
        {currentAsset && (
          <>
            <div className="mb-4">
              <AssetPreview asset={currentAsset} />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="bg-gray-700 mb-4">
                <TabsTrigger value="faces" className="data-[state=active]:bg-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  Faces
                </TabsTrigger>
                <TabsTrigger value="locations" className="data-[state=active]:bg-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  Locations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="faces">
                <FacesTab 
                  faces={mockFaces} 
                  selectedFace={selectedFace}
                  setSelectedFace={setSelectedFace}
                  onClearRights={handleClearRights}
                  onSendRightsRequest={handleSendRightsRequest}
                />
              </TabsContent>
              
              <TabsContent value="locations">
                <LocationsTab locations={mockLocations} />
              </TabsContent>
            </Tabs>
          </>
        )}
        
        <SheetFooter className="mt-4 flex-col space-y-2 sm:space-y-2">
          {totalAssets > 1 && (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleApplyToAll}
            >
              Apply to All Selected Assets
            </Button>
          )}
          <Button 
            className="w-full" 
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RightsManagementPanel;
