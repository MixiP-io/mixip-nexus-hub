
import React, { useRef } from 'react';
import { Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UploadAreaProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: (e?: React.MouseEvent) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ 
  handleFileSelect, 
  triggerFileInput 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-6">
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        id="file-upload-input"
        multiple
        onChange={handleFileSelect}
        accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      
      <div 
        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const dt = e.dataTransfer;
          const files = dt.files;
          
          if (files.length > 0) {
            const event = {
              target: {
                files,
                value: ''
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileSelect(event);
          }
        }}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Drag files here or click to browse</h3>
        <p className="text-gray-400 mb-2">
          Upload multiple files at once. Support for images, videos, and documents.
        </p>
        <Button 
          onClick={triggerFileInput}
          className="mt-2 bg-green-600 hover:bg-green-700" 
          type="button"
        >
          <Plus className="mr-2 h-4 w-4" />
          Select Files
        </Button>
      </div>
    </div>
  );
};

export default UploadArea;
