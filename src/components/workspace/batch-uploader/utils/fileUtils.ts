
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
export const getFilePreview = async (file: File): Promise<string | undefined> => {
  try {
    if (!file || !file.type.startsWith('image/')) {
      console.log(`Not creating preview for ${file?.name}: Not an image or file is null`);
      return undefined;
    }
    
    // For smaller images (< 5MB), use data URLs for persistence across sessions
    if (file.size < 5 * 1024 * 1024) {
      try {
        const preview = await createDataUrlPreview(file);
        console.log(`Created data URL preview for ${file.name} (length: ${preview.length})`);
        return preview;
      } catch (error) {
        console.error(`Failed to create data URL preview for ${file.name}:`, error);
        // Fall back to blob URL if data URL creation fails
        const blobUrl = URL.createObjectURL(file);
        console.log(`Created fallback blob URL preview for ${file.name}: ${blobUrl}`);
        return blobUrl;
      }
    } else {
      // For larger images, use blob URLs for better performance
      const preview = URL.createObjectURL(file);
      console.log(`Created blob URL preview for ${file.name}: ${preview}`);
      return preview;
    }
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
        reject(new Error('Failed to create data URL: No result from FileReader'));
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
  if (!preview) {
    console.log('Preview validation failed: No preview provided');
    return false;
  }
  
  // Data URLs are always valid
  if (preview.startsWith('data:')) {
    return true;
  }
  
  // For blob URLs, need to check if they still exist
  if (preview.startsWith('blob:')) {
    try {
      fetch(preview, { method: 'HEAD', mode: 'no-cors' })
        .then(() => true)
        .catch(() => false);
      
      // Default to true - we can't reliably check blob URLs
      // We'll handle errors at the component level
      return true;
    } catch (e) {
      console.error('Error validating blob URL:', e);
      return false;
    }
  }
  
  // If it's neither a data URL nor a blob URL, it's likely invalid
  console.log(`Preview validation failed: Invalid URL format: ${preview.substring(0, 20)}...`);
  return false;
};

// Clean up blob URLs to prevent memory leaks
export const revokeFilePreview = (preview: string | undefined): void => {
  if (!preview) return;
  
  if (preview.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(preview);
      console.log(`Revoked preview URL: ${preview}`);
    } catch (error) {
      console.error('Error revoking URL:', error);
    }
  }
};
