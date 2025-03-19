
import React from 'react';
import { Dataset } from '../types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Image, FileVideo, FileStack, Tag } from 'lucide-react';
import { formatCompactNumber } from '../utils';

interface DatasetCardProps {
  dataset: Dataset;
  onLicenseDataset: (datasetId: string) => void;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, onLicenseDataset }) => {
  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'photos':
        return <Image className="h-5 w-5 text-blue-400" />;
      case 'videos':
        return <FileVideo className="h-5 w-5 text-purple-400" />;
      case 'mixed':
        return <FileStack className="h-5 w-5 text-amber-400" />;
      default:
        return <Database className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={dataset.thumbnailUrl} 
          alt={dataset.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      
      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-1">{dataset.title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            {getContentTypeIcon(dataset.contentType)}
            <span className="text-xs text-gray-300 capitalize">{dataset.contentType}</span>
          </div>
        </div>
        
        <Badge className="mb-2 bg-gray-700 text-gray-300">{formatCompactNumber(dataset.itemCount)} items</Badge>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{dataset.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {dataset.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1 bg-gray-700 text-gray-300 border-gray-600">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
          {dataset.tags.length > 3 && (
            <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
              +{dataset.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-2 border-t border-gray-700 flex justify-between items-center">
        <div className="text-lg font-medium text-white">${dataset.price.toLocaleString()}</div>
        <Button 
          onClick={() => onLicenseDataset(dataset.id)}
          className="bg-green-600 hover:bg-green-700"
        >
          License
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatasetCard;
