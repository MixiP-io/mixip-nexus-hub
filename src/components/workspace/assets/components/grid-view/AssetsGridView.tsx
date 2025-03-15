
import React from 'react';
import AssetCard from './AssetCard';
import BatchActionsBar from '../BatchActionsBar';

interface AssetsGridViewProps {
  assets: any[];
  selectedAssets: string[];
  handleAssetClick: (assetId: string, e: React.MouseEvent) => void;
  handleSelectAll: () => void;
  handleOpenRightsPanel: (assetId: string, e: React.MouseEvent) => void;
  handleBatchRights: () => void;
}

const AssetsGridView: React.FC<AssetsGridViewProps> = ({
  assets,
  selectedAssets,
  handleAssetClick,
  handleSelectAll,
  handleOpenRightsPanel,
  handleBatchRights
}) => {
  return (
    <div className="space-y-4">
      <BatchActionsBar
        selectedCount={selectedAssets.length}
        totalCount={assets.length}
        handleSelectAll={handleSelectAll}
        handleBatchRights={handleBatchRights}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAssets.includes(asset.id)}
            onSelect={handleAssetClick}
            onOpenRightsPanel={handleOpenRightsPanel}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetsGridView;
