
import React from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatusBadge from './StatusBadge';

interface Face {
  id: number;
  thumbnail: string;
  name: string;
  status: string;
}

interface FacesTabProps {
  faces: Face[];
  selectedFace: number | null;
  setSelectedFace: (id: number | null) => void;
  onClearRights: () => void;
  onSendRightsRequest: () => void;
}

const FacesTab: React.FC<FacesTabProps> = ({
  faces,
  selectedFace,
  setSelectedFace,
  onClearRights,
  onSendRightsRequest
}) => {
  if (selectedFace === null) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {faces.map(face => (
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
    );
  }

  // Face detail view
  const selectedFaceData = faces.find(f => f.id === selectedFace);
  
  return (
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
            src={selectedFaceData?.thumbnail} 
            alt="Face" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor="face-name">Person Name</Label>
            <Input 
              id="face-name" 
              value={selectedFaceData?.name}
              className="bg-gray-600 border-gray-500"
            />
          </div>
          
          <div>
            <Label>Status</Label>
            <div className="mt-1">
              <StatusBadge status={selectedFaceData?.status || 'unidentified'} />
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
              onClick={onClearRights}
            >
              Manually Clear
            </Button>
            <Button 
              className="flex-1"
              onClick={onSendRightsRequest}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacesTab;
