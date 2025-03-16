
import React, { useState } from 'react';
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
  const [previewError, setPreviewError] = useState(false);
  
  if (!asset) return null;

  // Format upload date (defaults to today if not valid)
  const uploadDate = asset.uploadedAt 
    ? formatDistanceToNow(new Date(asset.uploadedAt), { addSuffix: true })
    : 'recently';

  // Determine icon based on file type
  const getFileIcon = () => {
    return <File className="w-12 h-12 text-gray-400" />;
  };

  const handleImageError = () => {
    console.error(`Failed to load preview for asset: ${asset.id}, ${asset.name}`);
    console.log("Preview URL:", asset.preview ? asset.preview.substring(0, 50) + "..." : "undefined");
    setPreviewError(true);
  };

  return (
    <div
      className={`bg-gray-800 border rounded-lg overflow-hidden transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-700 hover:border-gray-500'
      }`}
      onClick={(e) => onSelect(asset.id, e)}
    >
      <div className="relative aspect-square bg-gray-900 flex items-center justify-center overflow-hidden">
        {asset.preview && !previewError ? (
          <img 
            src={asset.preview} 
            alt={asset.name} 
            className="w-full h-full object-cover" 
            onError={handleImageError}
          />
        ) : (
          getFileIcon()
        )}
        
        {asset.folderName && (
          <div className="absolute top-2 left-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
            {asset.folderName}
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded bg-gray-700 border-gray-600"
            checked={isSelected}
            onChange={() => {}} // Handled by parent onClick
            onClick={(e) => e.stopPropagation()} // Prevent double firing
          />
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-white truncate">{asset.name}</h3>
        <p className="text-xs text-gray-400 mt-1">{asset.type} • {uploadDate}</p>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-1">
            <div className="text-gray-400 hover:text-white cursor-pointer">
              <User className="w-4 h-4" />
            </div>
            <div className="text-gray-400 hover:text-white cursor-pointer">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-gray-400 hover:text-white cursor-pointer">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          
          <button 
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
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
