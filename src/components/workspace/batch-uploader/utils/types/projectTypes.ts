
export interface ProjectAsset {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string | null;
  uploadedAt: Date;
  licenseType: string;
  folderId?: string;
  storagePath?: string;
  storageUrl?: string;
}

export interface ProjectOwner {
  userId: string;
  name: string;
  email: string;
  royaltyPercentage: number;
}

export interface ProjectLicensing {
  type: string;
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

export interface ProjectFolder {
  id: string;
  name: string;
  assets: ProjectAsset[];
  createdAt: Date;
  updatedAt: Date;
  subfolders?: ProjectFolder[];
}

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
  cover_image?: string;
}
