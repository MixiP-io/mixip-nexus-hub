
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface OverallProgressProps {
  progress: number;
  isUploading: boolean;
}

const OverallProgress: React.FC<OverallProgressProps> = ({ progress, isUploading }) => {
  // Show progress bar even if not uploading, to show completed uploads
  const safeProgress = Math.min(Math.max(0, progress), 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>Overall Progress</span>
        <span>{Math.round(safeProgress)}%</span>
      </div>
      <Progress value={safeProgress} className="h-2" />
    </div>
  );
};

export default OverallProgress;
