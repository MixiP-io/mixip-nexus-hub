
import { useState } from 'react';
import { toast } from 'sonner';
import { UploadSource } from '../types';

export const useSourceSelection = () => {
  const [activeSource, setActiveSource] = useState<'computer' | 'phone' | 'local'>('local');
  
  // Wrapper for source selection to ensure type compatibility
  const handleSourceChange = (source: 'computer' | 'phone' | 'moby' | 'dropbox' | 'google-drive' | 'box' | 'icloud') => {
    if (source === 'computer' || source === 'phone') {
      setActiveSource(source);
    } else {
      setActiveSource('local'); // Default to local for other sources
      toast.info(`${source} integration coming soon`);
    }
  };
  
  return {
    activeSource,
    handleSourceChange
  };
};
