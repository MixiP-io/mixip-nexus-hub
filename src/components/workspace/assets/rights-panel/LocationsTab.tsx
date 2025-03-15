
import React from 'react';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';

interface Location {
  id: number;
  name: string;
  status: string;
}

interface LocationsTabProps {
  locations: Location[];
}

const LocationsTab: React.FC<LocationsTabProps> = ({ locations }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-700 rounded-lg overflow-hidden">
        {locations.map((location, index) => (
          <div 
            key={location.id} 
            className={`p-4 hover:bg-gray-600 cursor-pointer ${
              index < locations.length - 1 ? 'border-b border-gray-600' : ''
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
    </div>
  );
};

export default LocationsTab;
