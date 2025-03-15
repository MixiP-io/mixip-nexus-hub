
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssetNavigationProps {
  currentIndex: number;
  totalAssets: number;
  handlePreviousAsset: () => void;
  handleNextAsset: () => void;
}

const AssetNavigation: React.FC<AssetNavigationProps> = ({
  currentIndex,
  totalAssets,
  handlePreviousAsset,
  handleNextAsset
}) => {
  if (totalAssets <= 1) return null;
  
  return (
    <div className="flex items-center text-sm font-normal">
      <Button
        variant="ghost"
        size="icon"
        disabled={currentIndex === 0}
        onClick={handlePreviousAsset}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="mx-2">
        {currentIndex + 1} of {totalAssets}
      </span>
      <Button
        variant="ghost"
        size="icon"
        disabled={currentIndex === totalAssets - 1}
        onClick={handleNextAsset}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AssetNavigation;
