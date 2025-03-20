
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
