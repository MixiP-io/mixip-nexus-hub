
import { ProjectData } from '../../types/projectTypes';
import { projects } from '../../data/projectStore';

// Filter and sort projects by various criteria
export const filterAndSortProjects = (
  filterOptions?: {
    name?: string;
    tags?: string[];
    createdBy?: string;
    createdAfter?: Date;
    createdBefore?: Date;
    updatedAfter?: Date;
    updatedBefore?: Date;
  },
  sortOptions?: {
    sortBy: 'name' | 'createdAt' | 'updatedAt';
    sortOrder: 'asc' | 'desc';
  }
): ProjectData[] => {
  // Start with a copy of all projects
  let filteredProjects = [...projects];
  
  // Apply filters if provided
  if (filterOptions) {
    // Filter by name (case-insensitive partial match)
    if (filterOptions.name) {
      const searchTerm = filterOptions.name.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by tags (must match at least one)
    if (filterOptions.tags && filterOptions.tags.length > 0) {
      filteredProjects = filteredProjects.filter(project => 
        project.tags && project.tags.some(tag => 
          filterOptions.tags?.includes(tag)
        )
      );
    }
    
    // Filter by creator
    if (filterOptions.createdBy) {
      filteredProjects = filteredProjects.filter(project => 
        project.createdBy === filterOptions.createdBy
      );
    }
    
    // Filter by creation date range
    if (filterOptions.createdAfter) {
      filteredProjects = filteredProjects.filter(project => 
        project.createdAt >= filterOptions.createdAfter!
      );
    }
    
    if (filterOptions.createdBefore) {
      filteredProjects = filteredProjects.filter(project => 
        project.createdAt <= filterOptions.createdBefore!
      );
    }
    
    // Filter by last updated date range
    if (filterOptions.updatedAfter) {
      filteredProjects = filteredProjects.filter(project => 
        project.updatedAt >= filterOptions.updatedAfter!
      );
    }
    
    if (filterOptions.updatedBefore) {
      filteredProjects = filteredProjects.filter(project => 
        project.updatedAt <= filterOptions.updatedBefore!
      );
    }
  }
  
  // Apply sorting if provided
  if (sortOptions) {
    filteredProjects.sort((a, b) => {
      let comparison = 0;
      
      // Sort by the specified field
      switch (sortOptions.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'updatedAt':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
      }
      
      // Apply sort order
      return sortOptions.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
  
  return filteredProjects;
};
