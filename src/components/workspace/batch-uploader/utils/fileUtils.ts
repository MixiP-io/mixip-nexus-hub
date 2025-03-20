
/**
 * Utility functions for file operations
 */

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

/**
 * Creates a persistent preview for an image file
 * Uses FileReader to create data URLs that persist after page refresh
 * @param file The file to create a preview for
 * @returns A promise that resolves to a data URL for image files, or undefined for non-image files
 */
export const getFilePreview = (file: File): Promise<string | undefined> => {
  return new Promise((resolve) => {
    // Only create previews for image files
    if (!file.type.startsWith('image/')) {
      resolve(undefined);
      return;
    }
    
    const reader = new FileReader();
    
    reader.onloadend = () => {
      resolve(typeof reader.result === 'string' ? reader.result : undefined);
    };
    
    // Start reading the file as a data URL
    reader.readAsDataURL(file);
  });
};

/**
 * Generates a unique ID for files
 * @returns A unique string ID
 */
export const generateUniqueId = (): string => {
  return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
