
import React from 'react';
import { Dataset } from '../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Image, FileVideo, FileStack, Tag } from 'lucide-react';
import { formatCompactNumber } from '../utils';

interface DatasetListProps {
  datasets: Dataset[];
  onLicenseDataset: (datasetId: string) => void;
}

const DatasetList: React.FC<DatasetListProps> = ({ datasets, onLicenseDataset }) => {
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
    <div className="mt-6 space-y-4">
      {datasets.map((dataset) => (
        <div 
          key={dataset.id}
          className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row gap-4"
        >
          <div className="sm:w-40 h-32 flex-shrink-0">
            <img 
              src={dataset.thumbnailUrl} 
              alt={dataset.title} 
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{dataset.title}</h3>
              <div className="flex items-center gap-2 mt-1 sm:mt-0">
                <div className="flex items-center gap-1">
                  {getContentTypeIcon(dataset.contentType)}
                  <span className="text-sm text-gray-300 capitalize">{dataset.contentType}</span>
                </div>
                <Badge className="bg-gray-700 text-gray-300">{formatCompactNumber(dataset.itemCount)} items</Badge>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{dataset.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {dataset.tags.slice(0, 5).map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1 bg-gray-700 text-gray-300 border-gray-600">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
              {dataset.tags.length > 5 && (
                <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                  +{dataset.tags.length - 5} more
                </Badge>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium text-white">${dataset.price.toLocaleString()}</div>
              <Button 
                onClick={() => onLicenseDataset(dataset.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                License Now
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatasetList;
