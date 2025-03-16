
/**
 * Default values for project data
 */

// Default licensing structure to use when needed
export const defaultLicensing = {
  type: 'standard',
  usageRights: {
    primaryCampaign: true,
    secondaryBrand: false,
    extendedMarketing: false,
    derivativeWorks: false,
    merchandising: false,
    publicity: false,
    socialMedia: true,
    aiTraining: false
  }
};

// Default project template for resets
export const defaultProject = {
  id: 'project1',
  name: 'Marketing Campaign Q1',
  assets: [],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-02-20'),
  createdBy: 'user1',
  owners: [
    { userId: 'user1', name: 'John Doe', email: 'john@example.com', royaltyPercentage: 100 }
  ],
  licensing: defaultLicensing,
  subfolders: []
};
