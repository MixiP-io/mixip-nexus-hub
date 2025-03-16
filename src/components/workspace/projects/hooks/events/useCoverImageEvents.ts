
import { useCallback } from 'react';

interface UseCoverImageEventsProps {
  setProjectForCoverImage: (id: string | null) => void;
  setSetCoverImageOpen: (open: boolean) => void;
}

export const useCoverImageEvents = ({
  setProjectForCoverImage,
  setSetCoverImageOpen
}: UseCoverImageEventsProps) => {
  
  const handleSetCoverImage = useCallback((projectId: string) => {
    setProjectForCoverImage(projectId);
    setSetCoverImageOpen(true);
  }, [setProjectForCoverImage, setSetCoverImageOpen]);

  return {
    handleSetCoverImage
  };
};
