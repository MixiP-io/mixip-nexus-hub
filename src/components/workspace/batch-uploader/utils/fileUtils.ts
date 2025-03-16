
import { supabase } from '@/integrations/supabase/client';

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

/**
 * Uploads a file to Supabase storage and returns a public URL
 */
export const uploadFileToStorage = async (file: File): Promise<string | undefined> => {
  try {
    // Create a unique file path using timestamp and random string
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    console.log(`Uploading file to Supabase: ${filePath}`);
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('temp-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading file to Supabase:', error);
      return undefined;
    }
    
    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('temp-uploads')
      .getPublicUrl(filePath);
    
    console.log(`File uploaded successfully. Public URL: ${urlData.publicUrl}`);
    return urlData.publicUrl;
    
  } catch (error) {
    console.error('Error in uploadFileToStorage:', error);
    return undefined;
  }
};

/**
 * Creates a preview URL for an image file by uploading to Supabase
 * For non-image files, returns undefined
 */
export const getFilePreview = async (file: File): Promise<string | undefined> => {
  try {
    if (!file) {
      console.log('No file provided to getFilePreview');
      return undefined;
    }
    
    // Only create previews for image files
    if (!file.type.startsWith('image/')) {
      console.log(`Not creating preview for ${file.name}: Not an image`);
      return undefined;
    }
    
    // Upload the image to Supabase and get the public URL
    const publicUrl = await uploadFileToStorage(file);
    
    if (publicUrl) {
      console.log(`Created Supabase preview for ${file.name}: ${publicUrl}`);
      return publicUrl;
    } else {
      console.error(`Failed to create Supabase preview for ${file.name}`);
      return undefined;
    }
  } catch (error) {
    console.error(`Error in getFilePreview for ${file?.name}:`, error);
    return undefined;
  }
};

/**
 * Checks if a preview URL is valid
 */
export const isPreviewValid = (preview: string | undefined): boolean => {
  if (!preview) {
    console.log('Preview validation failed: No preview provided');
    return false;
  }
  
  // Supabase URLs should always be valid as long as they exist and start with http
  if (preview.startsWith('http')) {
    return true;
  }
  
  console.log(`Preview validation failed: Invalid URL format: ${preview.substring(0, 30)}...`);
  return false;
};

/**
 * We don't need to revoke Supabase URLs, but keep this function for API compatibility
 */
export const revokeFilePreview = (preview: string | undefined): void => {
  // Nothing to do for Supabase URLs
  if (!preview) return;
  
  // If it's a blob URL, revoke it to prevent memory leaks
  if (preview.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(preview);
      console.log(`Revoked blob URL preview: ${preview}`);
    } catch (error) {
      console.error('Error revoking URL:', error);
    }
  }
};
