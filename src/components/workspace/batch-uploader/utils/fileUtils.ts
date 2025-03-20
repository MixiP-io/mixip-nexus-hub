
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
  return new Promise((resolve, reject) => {
    // Only create previews for image files
    if (!file.type.startsWith('image/')) {
      console.log(`Not an image file: ${file.name}, type: ${file.type}`);
      resolve(undefined);
      return;
    }

    console.log(`Generating preview for: ${file.name}, type: ${file.type}`);
    
    // Create a new FileReader instance for each file
    const reader = new FileReader();
    
    // Use onload instead of onloadend
    reader.onload = () => {
      if (reader.result) {
        console.log(`Preview generated for: ${file.name}`);
        // reader.result will be a data URL that can be stored
        resolve(reader.result.toString());
      } else {
        console.error(`Failed to generate preview for: ${file.name}, result is null`);
        resolve(undefined);
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error creating preview for file:', file.name, error);
      reject(new Error(`Failed to read file: ${file.name}`));
    };
    
    // Start the read operation
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(`Error reading file: ${file.name}`, error);
      reject(new Error(`Error reading file: ${file.name}`));
    }
  });
};

/**
 * Generates a unique ID for files
 * @returns A unique string ID
 */
export const generateUniqueId = (): string => {
  return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
