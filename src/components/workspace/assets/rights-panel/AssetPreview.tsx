
import React from 'react';
import { FileQuestion } from 'lucide-react';

interface AssetPreviewProps {
  asset: {
    preview?: string | null;
    name: string;
    type: string;
  };
}

const AssetPreview: React.FC<AssetPreviewProps> = ({ asset }) => {
  // Function to handle image load errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load preview for ${asset.name}`);
    // Hide the image
    e.currentTarget.style.display = 'none';
    
    // Show the fallback
    const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallbackElement) {
      fallbackElement.style.display = 'flex';
    }
  };

  return (
    <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden mb-4">
      {asset.preview ? (
        <img 
          src={asset.preview} 
          alt={asset.name} 
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      ) : null}
      
      {/* Fallback for missing or invalid previews */}
      <div 
        className={`w-full h-full flex items-center justify-center ${asset.preview ? 'hidden' : ''}`}
        data-testid="preview-fallback"
      >
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FileQuestion className="w-12 h-12 mb-2" />
          <div className="text-sm uppercase">
            {asset.type.split('/')[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetPreview;
