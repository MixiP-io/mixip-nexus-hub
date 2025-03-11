
import { UploadSource } from './types';

export const defaultUploadSources: UploadSource[] = [
  {
    id: 'local',
    name: 'Local Device',
    icon: 'device',
    enabled: true,
    description: 'Upload files from your computer or mobile device'
  },
  {
    id: 'camera',
    name: 'Camera Roll',
    icon: 'camera',
    enabled: true,
    description: 'Access photos and videos from your device camera'
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: 'cloud',
    enabled: true,
    description: 'Import content from your Google Drive account'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: 'cloud',
    enabled: true,
    description: 'Connect to your Dropbox account'
  },
  {
    id: 'box',
    name: 'Box',
    icon: 'cloud',
    enabled: false,
    description: 'Connect to your Box account (Coming soon)'
  },
  {
    id: 'icloud',
    name: 'iCloud',
    icon: 'cloud',
    enabled: false,
    description: 'Connect to your iCloud account (Coming soon)'
  }
];
