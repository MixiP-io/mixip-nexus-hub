
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  
  // Add a timeout to force-exit loading state
  useEffect(() => {
    const forceExitLoading = setTimeout(() => {
      if (isLoading) {
        console.log('AuthGuard loading timeout reached, forcing exit');
        setShowLoader(false);
      }
    }, 5000); // 5 second maximum loading time
    
    return () => clearTimeout(forceExitLoading);
  }, [isLoading]);
  
  // Only show loader after a brief delay to prevent flashing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowLoader(true);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isLoading]);
  
  // Reset showLoader when loading stops
  useEffect(() => {
    if (!isLoading) {
      setShowLoader(false);
    }
  }, [isLoading]);

  // If still loading auth state, show improved loading UI
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        {showLoader && (
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6 mb-6" />
            <Skeleton className="h-10 w-full mb-4" />
            <div className="flex justify-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;
