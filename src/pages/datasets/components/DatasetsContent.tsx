
import React from 'react';
import { Dataset } from '../types';
import DatasetGrid from './DatasetGrid';
import DatasetList from './DatasetList';
import DatasetsEmpty from './DatasetsEmpty';

interface DatasetsContentProps {
  isLoading: boolean;
  filteredDatasets: Dataset[];
  viewMode: 'grid' | 'list';
  onLicenseDataset: (datasetId: string) => void;
  onRequestCustomDataset: () => void;
}

const DatasetsContent: React.FC<DatasetsContentProps> = ({
  isLoading,
  filteredDatasets,
  viewMode,
  onLicenseDataset,
  onRequestCustomDataset
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (filteredDatasets.length === 0) {
    return <DatasetsEmpty onRequestCustomDataset={onRequestCustomDataset} />;
  }

  return viewMode === 'grid' ? (
    <DatasetGrid 
      datasets={filteredDatasets} 
      onLicenseDataset={onLicenseDataset} 
    />
  ) : (
    <DatasetList 
      datasets={filteredDatasets} 
      onLicenseDataset={onLicenseDataset} 
    />
  );
};

export default DatasetsContent;
