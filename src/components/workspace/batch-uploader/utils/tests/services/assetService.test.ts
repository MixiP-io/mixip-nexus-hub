
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { toast } from 'sonner';
import { addFilesToProject } from '../../services/assets/upload/addFilesToProject';
import { projects, updateProjects, logProjects } from '../../data/projectStore';

// Re-export all asset service tests
export * from './assets/upload/addFilesToProject.test';

// This file is now just a re-export point for backward compatibility
// All actual tests have been moved to more focused test files
