
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
    toast.success('Rights request sent successfully', {
      description: 'The rights holder will be notified',
      position: 'top-center',
    });
  };
  
  const handleApplyToAll = () => {
    toast.success('Changes applied to all selected assets', {
      description: `Applied to ${totalAssets} assets`,
      position: 'top-center',
    });
  };
  
  const handleClearRights = () => {
    toast.success('Rights cleared successfully', {
      description: 'Assets are now cleared for use',
      position: 'top-center',
    });
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg bg-frameio-bg-dark border-frameio-border-subtle text-frameio-text-primary overflow-auto animate-slide-in-right" side="right">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-frameio-text-primary flex items-center justify-between">
            <span className="text-xl font-semibold tracking-tight">Rights Management</span>
            <AssetNavigation 
              currentIndex={currentAssetIndex}
              totalAssets={totalAssets}
              handlePreviousAsset={handlePreviousAsset}
              handleNextAsset={handleNextAsset}
            />
          </SheetTitle>
          <SheetDescription className="text-frameio-text-secondary">
            {totalAssets > 1 
              ? `Manage rights for ${totalAssets} selected assets` 
              : currentAsset?.name}
          </SheetDescription>
        </SheetHeader>
        
        {currentAsset && (
          <>
            <div className="mb-6 transition-all duration-300 hover:shadow-frame-card rounded-lg overflow-hidden">
              <AssetPreview asset={currentAsset} />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="bg-frameio-bg-card border-b border-frameio-border-subtle rounded-t-lg rounded-b-none p-0">
                <TabsTrigger 
                  value="faces" 
                  className="flex-1 data-[state=active]:bg-frameio-bg-highlight data-[state=active]:border-b-2 data-[state=active]:border-frameio-accent-blue rounded-none py-3"
                >
                  <User className="h-4 w-4 mr-2" />
                  Faces
                </TabsTrigger>
                <TabsTrigger 
                  value="locations" 
                  className="flex-1 data-[state=active]:bg-frameio-bg-highlight data-[state=active]:border-b-2 data-[state=active]:border-frameio-accent-blue rounded-none py-3"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Locations
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-4 bg-frameio-bg-card rounded-lg p-4 shadow-frame-card">
                <TabsContent value="faces" className="mt-0 pt-2">
                  <FacesTab 
                    faces={mockFaces} 
                    selectedFace={selectedFace}
                    setSelectedFace={setSelectedFace}
                    onClearRights={handleClearRights}
                    onSendRightsRequest={handleSendRightsRequest}
                  />
                </TabsContent>
                
                <TabsContent value="locations" className="mt-0 pt-2">
                  <LocationsTab locations={mockLocations} />
                </TabsContent>
              </div>
            </Tabs>
          </>
        )}
        
        <SheetFooter className="mt-6 flex-col space-y-3 sm:space-y-3">
          {totalAssets > 1 && (
            <Button 
              className="w-full bg-frameio-accent-blue hover:bg-blue-600 transition-colors"
              onClick={handleApplyToAll}
            >
              Apply to All Selected Assets
            </Button>
          )}
          <Button 
            className="w-full bg-frameio-bg-card hover:bg-frameio-bg-highlight transition-colors border border-frameio-border-subtle" 
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
