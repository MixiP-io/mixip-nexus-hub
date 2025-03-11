
import { CollaboratorGroup, GroupType, CollaboratorGroupPrivacy } from '../types';

export interface GroupFormProps {
  isCreating: boolean;
  onCancel: () => void;
  onComplete: (groupData: Omit<CollaboratorGroup, 'id' | 'createdAt' | 'updatedAt'>) => void;
  existingGroup?: CollaboratorGroup;
}

export interface FormData {
  name: string;
  description: string;
  type: GroupType;
  privacy: CollaboratorGroupPrivacy;
  color: string;
}

export const colorOptions = [
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#0EA5E9', label: 'Blue' },
  { value: '#F97316', label: 'Orange' },
  { value: '#D946EF', label: 'Pink' },
  { value: '#10B981', label: 'Green' },
  { value: '#F59E0B', label: 'Yellow' },
  { value: '#EC4899', label: 'Magenta' },
  { value: '#6366F1', label: 'Indigo' },
];
