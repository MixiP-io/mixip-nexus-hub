
import React from 'react';
import UploadArea from '../UploadArea';

interface SourceContentProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const SourceContent: React.FC<SourceContentProps> = ({ 
  handleFileSelect, 
  triggerFileInput, 
  fileInputRef 
}) => {
  return (
    <div className="mt-6">
      <UploadArea
        handleFileSelect={handleFileSelect}
        triggerFileInput={triggerFileInput}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default SourceContent;
