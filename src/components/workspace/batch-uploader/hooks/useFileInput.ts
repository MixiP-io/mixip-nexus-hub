
import { useRef } from 'react';

export const useFileInput = (onFileSelect: (files: FileList | null) => void) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const triggerFileInput = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("Triggering file input click");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File selection triggered", event.target.files);
    onFileSelect(event.target.files);
    
    // Reset the input value so the same file can be selected again
    if (event.target) {
      event.target.value = '';
    }
  };
  
  return {
    fileInputRef,
    triggerFileInput,
    handleFileSelect
  };
};
