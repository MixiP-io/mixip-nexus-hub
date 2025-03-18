
import { create } from 'zustand';

interface BatchUploadModalState {
  isOpen: boolean;
  projectId: string | null;
  folderId: string | null;
  openModal: (projectId: string, folderId?: string) => void;
  closeModal: () => void;
  reset: () => void;
}

export const useBatchUploadModalStore = create<BatchUploadModalState>((set) => ({
  isOpen: false,
  projectId: null,
  folderId: 'root',
  
  openModal: (projectId, folderId = 'root') => {
    console.log(`[BatchUploadStore] Opening modal for project: ${projectId}, folder: ${folderId}`);
    set({ isOpen: true, projectId, folderId });
  },
  
  closeModal: () => {
    console.log('[BatchUploadStore] Closing modal');
    set({ isOpen: false });
  },
  
  reset: () => {
    console.log('[BatchUploadStore] Resetting state');
    set({ isOpen: false, projectId: null, folderId: 'root' });
  }
}));
