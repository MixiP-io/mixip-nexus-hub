
import React from 'react';
import { Toaster } from 'sonner';

interface BatchUploaderContainerProps {
  children: React.ReactNode;
}

const BatchUploaderContainer: React.FC<BatchUploaderContainerProps> = ({ children }) => {
  return (
    <div className="p-6">
      {children}
      <Toaster position="top-right" />
    </div>
  );
};

export default BatchUploaderContainer;
