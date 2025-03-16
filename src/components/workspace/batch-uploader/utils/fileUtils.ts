
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

export const getFilePreview = (file: File): string | undefined => {
  try {
    if (file.type.startsWith('image/')) {
      const preview = URL.createObjectURL(file);
      console.log(`Created preview URL for ${file.name}: ${preview}`);
      return preview;
    }
    return undefined;
  } catch (error) {
    console.error(`Failed to create preview for ${file.name}:`, error);
    return undefined;
  }
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
