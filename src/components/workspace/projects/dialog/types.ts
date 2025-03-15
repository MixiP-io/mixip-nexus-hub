
import { ProjectOwner, ProjectLicensing } from '../../batch-uploader/utils/projectUtils';
import { UsageRights } from '../../rights-management/types';

export interface CreateProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCreateProject: (name: string) => void;
  parentFolderId?: string;
}

export interface ProjectFormState {
  projectName: string;
  ownershipSplit: number;
  additionalOwners: ProjectOwner[];
  licenseType: string;
  usageRights: UsageRights;
}
