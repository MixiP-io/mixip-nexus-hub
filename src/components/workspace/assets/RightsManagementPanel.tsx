
import React, { useState } from 'react';
import { X, User, MapPin, Check, AlertTriangle, Clock, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

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
  
  // Status badge component for reuse
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'cleared':
        return (
          <Badge className="bg-green-600">
            <Check className="mr-1 h-3 w-3" />
            Cleared
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-600">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case 'unidentified':
      default:
        return (
          <Badge className="bg-gray-600">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Unidentified
          </Badge>
        );
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg bg-gray-800 border-gray-700 text-white overflow-auto" side="right">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-white flex items-center justify-between">
            Rights Management
            {totalAssets > 1 && (
              <div className="flex items-center text-sm font-normal">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={currentAssetIndex === 0}
                  onClick={handlePreviousAsset}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="mx-2">
                  {currentAssetIndex + 1} of {totalAssets}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={currentAssetIndex === totalAssets - 1}
                  onClick={handleNextAsset}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
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
              <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden mb-4">
                {currentAsset.preview ? (
                  <img 
                    src={currentAsset.preview} 
                    alt={currentAsset.name} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-500 text-lg uppercase">
                      {currentAsset.type.split('/')[1]}
                    </div>
                  </div>
                )}
              </div>
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
              
              <TabsContent value="faces" className="space-y-4">
                {/* Faces grid */}
                {selectedFace === null ? (
                  <div className="grid grid-cols-2 gap-4">
                    {mockFaces.map(face => (
                      <div 
                        key={face.id} 
                        className="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors"
                        onClick={() => setSelectedFace(face.id)}
                      >
                        <div className="w-full h-24 bg-gray-600 rounded mb-3 overflow-hidden">
                          <img 
                            src={face.thumbnail} 
                            alt={face.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="font-medium truncate">{face.name}</div>
                          <StatusBadge status={face.status} />
                          <Button 
                            size="sm" 
                            className="w-full mt-2"
                            variant={face.status === 'cleared' ? 'outline' : 'default'}
                          >
                            {face.status === 'cleared' ? 'View Release' : 'Clear Rights'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Face detail view
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedFace(null)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="font-medium ml-2">Face Details</h3>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-600 rounded overflow-hidden">
                        <img 
                          src={mockFaces.find(f => f.id === selectedFace)?.thumbnail} 
                          alt="Face" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label htmlFor="face-name">Person Name</Label>
                          <Input 
                            id="face-name" 
                            value={mockFaces.find(f => f.id === selectedFace)?.name}
                            className="bg-gray-600 border-gray-500"
                          />
                        </div>
                        
                        <div>
                          <Label>Status</Label>
                          <div className="mt-1">
                            <StatusBadge status={mockFaces.find(f => f.id === selectedFace)?.status || 'unidentified'} />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="release-template">Release Template</Label>
                          <Select defaultValue="standard">
                            <SelectTrigger className="bg-gray-600 border-gray-500">
                              <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="standard">Standard Release</SelectItem>
                              <SelectItem value="commercial">Commercial Usage</SelectItem>
                              <SelectItem value="editorial">Editorial Only</SelectItem>
                              <SelectItem value="social">Social Media</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={handleClearRights}
                          >
                            Manually Clear
                          </Button>
                          <Button 
                            className="flex-1"
                            onClick={handleSendRightsRequest}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Send Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="locations" className="space-y-4">
                {/* Locations list */}
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  {mockLocations.map((location, index) => (
                    <div 
                      key={location.id} 
                      className={`p-4 hover:bg-gray-600 cursor-pointer ${
                        index < mockLocations.length - 1 ? 'border-b border-gray-600' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{location.name}</h4>
                        <StatusBadge status={location.status} />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 border-gray-500"
                        >
                          Edit Location
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          {location.status === 'cleared' ? 'View Release' : 'Clear Rights'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-dashed border-gray-600 hover:border-gray-500"
                >
                  + Add Location
                </Button>
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
