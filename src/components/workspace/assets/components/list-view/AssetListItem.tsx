
import React from 'react';
import { Eye, User, Download, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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
  return (
    <tr 
      className={`border-b border-frameio-border-subtle hover:bg-frameio-bg-hover transition-colors ${
        isSelected ? 'bg-frameio-bg-highlight' : ''
      }`}
      onClick={(e) => onSelect(asset.id, e as React.MouseEvent)}
    >
      <td className="p-4">
        <input 
          type="checkbox" 
          className="rounded bg-frameio-bg-card border-frameio-border-subtle text-frameio-accent-blue focus:ring-frameio-accent-blue"
          checked={isSelected}
          onChange={() => {}}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-frameio-bg-dark mr-3 overflow-hidden flex-shrink-0 shadow-sm">
            {asset.preview ? (
              <img 
                src={asset.preview} 
                alt={asset.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-frameio-text-tertiary text-xs uppercase">{asset.type.split('/')[1]}</div>
              </div>
            )}
          </div>
          <div>
            <span className="truncate max-w-[200px] text-frameio-text-primary font-medium block">{asset.name}</span>
            <span className="text-xs text-frameio-text-tertiary">{new Date(asset.uploadedAt || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
      </td>
      <td className="p-4 text-frameio-text-secondary">{asset.type.split('/')[1]}</td>
      <td className="p-4 text-frameio-text-secondary">{(asset.size / 1024).toFixed(0)} KB</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-frameio-accent-yellow text-black hover:bg-frameio-accent-yellow/90">
            <User className="mr-1 h-3 w-3" />
            Faces: 2
          </Badge>
          <Badge variant="outline" className="border-frameio-border-subtle text-frameio-text-secondary">
            <MapPin className="mr-1 h-3 w-3" />
            Location
          </Badge>
        </div>
      </td>
      <td className="p-4 text-right">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-1 text-frameio-text-tertiary hover:text-frameio-text-primary hover:bg-frameio-bg-highlight"
          onClick={(e) => {
            e.stopPropagation();
            toast.info('Preview coming soon', {
              position: 'top-center',
            });
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-1 text-frameio-text-tertiary hover:text-frameio-text-primary hover:bg-frameio-bg-highlight"
          onClick={(e) => onOpenRightsPanel(asset.id, e as React.MouseEvent)}
        >
          <Shield className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-frameio-text-tertiary hover:text-frameio-text-primary hover:bg-frameio-bg-highlight"
          onClick={(e) => {
            e.stopPropagation();
            toast.info('Download coming soon', {
              position: 'top-center',
            });
          }}
        >
          <Download className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
};

export default AssetListItem;
