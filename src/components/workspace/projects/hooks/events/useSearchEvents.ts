
import { useCallback } from 'react';

export const useSearchEvents = () => {
  const searchProjects = useCallback((term: string) => {
    console.log('Searching for projects:', term);
  }, []);

  return {
    searchProjects
  };
};
