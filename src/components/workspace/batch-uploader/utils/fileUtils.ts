
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

export const getFilePreview = (file: File): string | undefined => {
  return file.type.startsWith('image/') 
    ? URL.createObjectURL(file) 
    : undefined;
};
