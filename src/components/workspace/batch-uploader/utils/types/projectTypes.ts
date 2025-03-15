
/**
 * Project data types and interfaces
 */

// Project data structure
export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  assets: ProjectAsset[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  owners: ProjectOwner[];
  licensing: ProjectLicensing;
  subfolders: ProjectFolder[];
  parentId?: string;
}

// Owner of a project
export interface ProjectOwner {
  userId: string;
  name: string;
  email: string;
  royaltyPercentage: number;
}

// Licensing information
export interface ProjectLicensing {
  type: string; // 'standard', 'exclusive', 'limited', etc.
  usageRights: {
    primaryCampaign: boolean;
    secondaryBrand: boolean;
    extendedMarketing: boolean;
    derivativeWorks: boolean;
    merchandising: boolean;
    publicity: boolean;
    socialMedia: boolean;
    aiTraining: boolean;
  };
}

// Folder structure
export interface ProjectFolder {
  id: string;
  name: string;
  assets: ProjectAsset[];
  createdAt: Date;
  updatedAt: Date;
  subfolders: ProjectFolder[]; // Recursive structure for nested folders
}

// Asset within a project
export interface ProjectAsset {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
  uploadedAt: Date;
  licenseType?: string;
  folderId?: string; // Reference to folder if in a subfolder
}
