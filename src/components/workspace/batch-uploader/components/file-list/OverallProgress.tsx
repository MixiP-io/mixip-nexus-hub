
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface OverallProgressProps {
  progress: number;
  isUploading: boolean;
}

const OverallProgress: React.FC<OverallProgressProps> = ({ progress, isUploading }) => {
  if (!isUploading) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>Overall Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default OverallProgress;
