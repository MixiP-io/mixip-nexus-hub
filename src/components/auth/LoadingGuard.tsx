
import React from 'react';

interface LoadingGuardProps {
  isLoading: boolean;
  user: any;
  currentPath: string;
  children: React.ReactNode;
}

const LoadingGuard: React.FC<LoadingGuardProps> = ({ 
  isLoading, 
  user, 
  currentPath,
  children 
}) => {
  if (isLoading && !user && currentPath !== '/login') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <h2 className="text-lg font-semibold">Loading your session...</h2>
          <p className="mt-2 text-gray-500">Please wait while we authenticate you.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingGuard;
