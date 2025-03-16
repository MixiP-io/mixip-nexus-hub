
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

/**
 * Creates a preview URL for an image file
 * Returns either a blob URL or a data URL depending on the file size
 */
export const getFilePreview = (file: File): string | undefined => {
  try {
    if (file.type.startsWith('image/')) {
      // For smaller images (< 5MB), use data URLs for persistence across sessions
      if (file.size < 5 * 1024 * 1024) {
        return createDataUrlPreview(file);
      } else {
        // For larger images, use blob URLs for better performance
        const preview = URL.createObjectURL(file);
        console.log(`Created blob URL preview for ${file.name}: ${preview}`);
        return preview;
      }
    }
    return undefined;
  } catch (error) {
    console.error(`Failed to create preview for ${file.name}:`, error);
    return undefined;
  }
};

/**
 * Creates a persistent data URL for small images
 * These survive page refreshes as they're stored directly in localStorage
 */
const createDataUrlPreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        console.log(`Created data URL preview for ${file.name} (length: ${dataUrl.length})`);
        resolve(dataUrl);
      } else {
        reject(new Error('Failed to create data URL'));
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error creating data URL:', error);
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Checks if a preview URL is still valid
 * For blob URLs, checks if they still exist
 * For data URLs, always returns true as they're always valid
 */
export const isPreviewValid = (preview: string | undefined): boolean => {
  if (!preview) return false;
  
  // Data URLs are always valid
  if (preview.startsWith('data:')) {
    return true;
  }
  
  // For blob URLs, need to check if they still exist
  // Not a perfect check, but helps identify stale URLs
  if (preview.startsWith('blob:')) {
    try {
      // Try to fetch the blob URL - will fail if revoked
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', preview, false); // Synchronous request
      try {
        xhr.send();
        return xhr.status !== 0;
      } catch (e) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  
  return false;
};

// Clean up blob URLs to prevent memory leaks
export const revokeFilePreview = (preview: string | undefined): void => {
  if (preview && preview.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(preview);
      console.log(`Revoked preview URL: ${preview}`);
    } catch (error) {
      console.error('Error revoking URL:', error);
    }
  }
};
