
import React, { useEffect, useState } from 'react';
import { File } from 'lucide-react';
import { isPreviewValid } from '@/components/workspace/batch-uploader/utils/fileUtils';

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
    
    if (asset.preview) {
      // Validate the preview URL
      const isValid = isPreviewValid(asset.preview);
      
      if (isValid) {
        console.log(`AssetPreview: Valid preview URL for ${asset.name}: ${asset.preview.substring(0, 50)}...`);
        setPreviewUrl(asset.preview);
      } else {
        console.error(`AssetPreview: Invalid preview URL for ${asset.name}`);
        setPreviewUrl(undefined);
        setPreviewError(true);
      }
    } else {
      console.log(`AssetPreview: No preview URL for ${asset.name}`);
      setPreviewUrl(undefined);
    }
  }, [asset]);

  const handleImageError = () => {
    console.error(`Failed to load preview for ${asset.name}`, {
      previewType: previewUrl?.substring(0, 20),
      assetType: asset.type
    });
    setPreviewError(true);
  };
  
  const getFileIcon = () => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <File className="h-12 w-12 text-gray-400" />
      </div>
    );
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
          {getFileIcon()}
          <div className="text-gray-500 text-sm uppercase mt-2">
            {asset.type.split('/')[1] || asset.type}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetPreview;
