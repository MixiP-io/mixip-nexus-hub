
import React from 'react';
import { File, User, MapPin, Lock, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AssetCardProps {
  asset: any;
  isSelected: boolean;
  onSelect: (assetId: string, e: React.MouseEvent) => void;
  onOpenRightsPanel: (assetId: string, e: React.MouseEvent) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ 
  asset, 
  isSelected, 
  onSelect,
  onOpenRightsPanel 
}) => {
  if (!asset) return null;

  // Format upload date (defaults to today if not valid)
  const uploadDate = asset.uploadedAt 
    ? formatDistanceToNow(new Date(asset.uploadedAt), { addSuffix: true })
    : 'recently';

  // Determine icon based on file type
  const getFileIcon = () => {
    return <File className="w-12 h-12 text-frameio-text-secondary" />;
  };

  return (
    <div
      className={`bg-frameio-bg-card border rounded-md overflow-hidden transition-all shadow-frame-card ${
        isSelected ? 'border-frameio-accent-blue ring-1 ring-frameio-accent-blue' : 'border-frameio-border-subtle hover:border-frameio-accent-blue/30'
      }`}
      onClick={(e) => onSelect(asset.id, e)}
    >
      <div className="relative aspect-square bg-frameio-bg-dark flex items-center justify-center overflow-hidden">
        {asset.preview ? (
          <img 
            src={asset.preview} 
            alt={asset.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          getFileIcon()
        )}
        
        {asset.folderName && (
          <div className="absolute top-2 left-2 bg-frameio-accent-blue/80 text-frameio-text-primary text-xs px-2 py-1 rounded-sm">
            {asset.folderName}
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded bg-frameio-bg-card border-frameio-border-subtle"
            checked={isSelected}
            onChange={() => {}} // Handled by parent onClick
            onClick={(e) => e.stopPropagation()} // Prevent double firing
          />
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-frameio-text-primary truncate">{asset.name}</h3>
        <p className="text-xs text-frameio-text-secondary mt-1">{asset.type} • {uploadDate}</p>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-1">
            <div className="text-frameio-text-tertiary hover:text-frameio-text-primary cursor-pointer">
              <User className="w-4 h-4" />
            </div>
            <div className="text-frameio-text-tertiary hover:text-frameio-text-primary cursor-pointer">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-frameio-text-tertiary hover:text-frameio-text-primary cursor-pointer">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          
          <button 
            className="text-frameio-text-tertiary hover:text-frameio-text-primary p-1 rounded-sm hover:bg-frameio-bg-hover"
            onClick={(e) => onOpenRightsPanel(asset.id, e)}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
