
import { useState } from 'react';
import { toast } from 'sonner';
import { UploadSource } from '../types';

export const useSourceSelection = () => {
  const [activeSource, setActiveSource] = useState<UploadSource>('computer');
  
  // Wrapper for source selection to ensure type compatibility
  const handleSourceChange = (source: UploadSource) => {
    if (source === 'computer' || source === 'phone') {
      setActiveSource(source);
    } else {
      setActiveSource('computer'); // Default to computer for other sources
      toast.info(`${source} integration coming soon`);
    }
  };
  
  return {
    activeSource,
    handleSourceChange
  };
};
