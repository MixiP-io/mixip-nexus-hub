
import React from 'react';
import AssetListItem from './AssetListItem';

interface AssetsListViewProps {
  assets: any[];
  selectedAssets: string[];
  handleAssetClick: (assetId: string, e: React.MouseEvent) => void;
  handleSelectAll: () => void;
  handleOpenRightsPanel: (assetId: string, e: React.MouseEvent) => void;
}

const AssetsListView: React.FC<AssetsListViewProps> = ({
  assets,
  selectedAssets,
  handleAssetClick,
  handleSelectAll,
  handleOpenRightsPanel
}) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-900 border-b border-gray-700">
          <tr>
            <th className="p-4 text-left font-medium text-gray-400 w-12">
              <input 
                type="checkbox" 
                className="rounded bg-gray-700 border-gray-600"
                checked={selectedAssets.length === assets.length && assets.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-4 text-left font-medium text-gray-400">Name</th>
            <th className="p-4 text-left font-medium text-gray-400">Type</th>
            <th className="p-4 text-left font-medium text-gray-400">Size</th>
            <th className="p-4 text-left font-medium text-gray-400">Rights Status</th>
            <th className="p-4 text-right font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <AssetListItem
              key={asset.id}
              asset={asset}
              isSelected={selectedAssets.includes(asset.id)}
              onSelect={handleAssetClick}
              onOpenRightsPanel={handleOpenRightsPanel}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsListView;
