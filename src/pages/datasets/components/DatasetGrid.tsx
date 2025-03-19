
import React from 'react';
import { Dataset } from '../types';
import DatasetCard from './DatasetCard';

interface DatasetGridProps {
  datasets: Dataset[];
  onLicenseDataset: (datasetId: string) => void;
}

const DatasetGrid: React.FC<DatasetGridProps> = ({ datasets, onLicenseDataset }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {datasets.map((dataset) => (
        <DatasetCard 
          key={dataset.id} 
          dataset={dataset} 
          onLicenseDataset={onLicenseDataset} 
        />
      ))}
    </div>
  );
};

export default DatasetGrid;
