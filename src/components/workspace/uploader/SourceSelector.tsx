
import React from 'react';
import { Cloud, Camera, Laptop, CheckCircle2 } from 'lucide-react';
import { SourceSelectorProps } from './types';
import { Card, CardContent } from '@/components/ui/card';

const SourceSelector: React.FC<SourceSelectorProps> = ({ 
  sources, 
  selectedSource, 
  onSourceSelect 
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'device':
        return <Laptop className="h-4 w-4" />;
      case 'camera':
        return <Camera className="h-4 w-4" />;
      case 'cloud':
        return <Cloud className="h-4 w-4" />;
      default:
        return <Cloud className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-3">Content Sources</h3>
      
      <div className="space-y-2">
        {sources.map((source) => (
          <Card 
            key={source.id}
            className={`border transition-all cursor-pointer ${
              source.enabled 
                ? selectedSource.id === source.id
                  ? 'bg-gray-700 border-mixip-blue' 
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                : 'bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed'
            }`}
            onClick={() => source.enabled && onSourceSelect(source)}
          >
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  {getIconComponent(source.icon)}
                </div>
                <div>
                  <p className="font-medium">{source.name}</p>
                  <p className="text-xs text-gray-400">{source.description}</p>
                </div>
              </div>
              
              {selectedSource.id === source.id && (
                <CheckCircle2 className="h-5 w-5 text-mixip-blue" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SourceSelector;
