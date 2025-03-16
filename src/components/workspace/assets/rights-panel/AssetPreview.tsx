
import React, { useEffect, useState } from 'react';

interface AssetPreviewProps {
  asset: {
    preview?: string;
    name: string;
    type: string;
  };
}

const AssetPreview: React.FC<AssetPreviewProps> = ({ asset }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(asset.preview);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    // Reset error state when asset changes
    setPreviewError(false);
    setPreviewUrl(asset.preview);
  }, [asset]);

  const handleImageError = () => {
    console.error(`Failed to load preview for ${asset.name}`);
    setPreviewError(true);
  };

  return (
    <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden mb-4">
      {previewUrl && !previewError ? (
        <img 
          src={previewUrl} 
          alt={asset.name} 
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500 text-lg uppercase">
            {asset.type.split('/')[1] || asset.type}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetPreview;
