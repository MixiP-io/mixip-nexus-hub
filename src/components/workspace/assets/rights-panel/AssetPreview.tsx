
import React from 'react';

interface AssetPreviewProps {
  asset: {
    preview?: string;
    name: string;
    type: string;
  };
}

const AssetPreview: React.FC<AssetPreviewProps> = ({ asset }) => {
  return (
    <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden mb-4">
      {asset.preview ? (
        <img 
          src={asset.preview} 
          alt={asset.name} 
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500 text-lg uppercase">
            {asset.type.split('/')[1]}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetPreview;
