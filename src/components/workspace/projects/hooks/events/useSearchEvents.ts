
import { useCallback } from 'react';
import { toast } from 'sonner';
import { filterAndSortProjects } from '../../../batch-uploader/utils/services/projectService';

export const useSearchEvents = () => {
  const searchProjects = useCallback((term: string) => {
    console.log('Searching for projects with term:', term);
    try {
      // Perform the actual search operation
      const results = filterAndSortProjects({
        name: term
      });
      
      console.log(`Found ${results.length} results for search term "${term}"`);
      
      // Return the results so they can be used by the caller
      return results;
    } catch (error) {
      console.error('Error performing search:', error);
      toast.error('Search failed. Please try again.');
      return [];
    }
  }, []);

  return {
    searchProjects
  };
};
