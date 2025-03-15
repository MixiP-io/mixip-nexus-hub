
import { describe, it, expect } from 'vitest';
import * as projectUtils from '../projectUtils';
import * as projectTypes from '../types/projectTypes';
import * as projectService from '../services/projectService';
import * as folderService from '../services/folderService';
import * as assetService from '../services/assetService';
import * as projectStore from '../data/projectStore';

describe('Project Utils Export', () => {
  it('should re-export all the necessary types and functions', () => {
    // Check that types are properly exported
    expect(projectUtils).toHaveProperty('ProjectData');
    expect(projectUtils).toHaveProperty('ProjectOwner');
    expect(projectUtils).toHaveProperty('ProjectLicensing');
    expect(projectUtils).toHaveProperty('ProjectFolder');
    expect(projectUtils).toHaveProperty('ProjectAsset');
    
    // Check that project service functions are exported
    expect(projectUtils).toHaveProperty('getProjects');
    expect(projectUtils).toHaveProperty('getProjectById');
    expect(projectUtils).toHaveProperty('createProject');
    expect(projectUtils).toHaveProperty('updateProjectOwnership');
    expect(projectUtils).toHaveProperty('updateProjectLicensing');
    expect(projectUtils).toHaveProperty('filterAndSortProjects');
    
    // Check that folder service functions are exported
    expect(projectUtils).toHaveProperty('createSubfolder');
    expect(projectUtils).toHaveProperty('getAllFoldersForProject');
    
    // Check that asset service functions are exported
    expect(projectUtils).toHaveProperty('addFilesToProject');
    
    // Check that debugging functions are exported
    expect(projectUtils).toHaveProperty('logProjects');
  });
});
