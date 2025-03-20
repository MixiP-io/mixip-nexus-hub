
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { addFilesToProject } from '../../services/assets/upload/addFilesToProject';
import { projects, updateProjects, logProjects } from '../../data/projectStore';

// Re-export all asset service tests for backward compatibility
export * from './assets/upload/addFilesToProject.test';
export * from './assets/upload/folderProcessing.test';
export * from './assets/upload/saveToDatabase.test';
export * from './assets/folder-operations/folderOperations.test';
export * from './assets/cover-image/coverImageOperations.test';

// This file is now just a re-export point
// All actual tests have been moved to more focused test files
