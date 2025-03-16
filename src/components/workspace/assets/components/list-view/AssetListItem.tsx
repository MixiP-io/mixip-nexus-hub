
import React, { useState, useEffect } from 'react';
import { Eye, User, Download, MapPin, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { isPreviewValid } from '@/components/workspace/batch-uploader/utils/fileUtils';

interface AssetListItemProps {
  asset: any;
  isSelected: boolean;
  onSelect: (assetId: string, e: React.MouseEvent) => void;
  onOpenRightsPanel: (assetId: string, e: React.MouseEvent) => void;
}

const AssetListItem: React.FC<AssetListItemProps> = ({
  asset,
  isSelected,
  onSelect,
  onOpenRightsPanel
}) => {
  const [previewError, setPreviewError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(asset?.preview);

  useEffect(() => {
    setPreviewError(false);
    
    if (asset?.preview) {
      // Validate preview URL
      const valid = isPreviewValid(asset.preview);
      if (valid) {
        setPreviewUrl(asset.preview);
      } else {
        console.error(`Asset preview validation failed for ${asset.id}, ${asset.name}`);
        setPreviewUrl(undefined);
        setPreviewError(true);
      }
    } else {
      setPreviewUrl(undefined);
    }
  }, [asset]);

  const handleImageError = () => {
    console.error(`Failed to load preview for asset in list: ${asset.id}, ${asset.name}`);
    setPreviewError(true);
  };

  const getFileIcon = () => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <File className="h-5 w-5 text-gray-400" />
      </div>
    );
  };

  return (
    <tr 
      className={`border-b border-gray-700 hover:bg-gray-750 ${
        isSelected ? 'bg-gray-750' : ''
      }`}
      onClick={(e) => onSelect(asset.id, e as React.MouseEvent)}
    >
      <td className="p-4">
        <input 
          type="checkbox" 
          className="rounded bg-gray-700 border-gray-600"
          checked={isSelected}
          onChange={() => {}}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-gray-700 mr-3 overflow-hidden flex-shrink-0">
            {previewUrl && !previewError ? (
              <img 
                src={previewUrl} 
                alt={asset.name} 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              getFileIcon()
            )}
          </div>
          <span className="truncate max-w-[200px]">{asset.name}</span>
        </div>
      </td>
      <td className="p-4">{asset.type.split('/')[1]}</td>
      <td className="p-4">{(asset.size / 1024).toFixed(0)} KB</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-600 hover:bg-yellow-700">
            <User className="mr-1 h-3 w-3" />
            Faces: 2
          </Badge>
          <Badge variant="outline">
            <MapPin className="mr-1 h-3 w-3" />
            Location
          </Badge>
        </div>
      </td>
      <td className="p-4 text-right">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-1"
          onClick={(e) => {
            e.stopPropagation();
            toast.info('Preview coming soon');
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-1"
          onClick={(e) => onOpenRightsPanel(asset.id, e as React.MouseEvent)}
        >
          <User className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            toast.info('Download coming soon');
          }}
        >
          <Download className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
};

export default AssetListItem;
