
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
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Log auth state for debugging
  console.log('AuthGuard state:', { 
    hasUser: !!user, 
    isLoading, 
    path: location.pathname,
    showLoader 
  });
  
  // Safety timeout - if loading persists too long, allow access anyway
  useEffect(() => {
    if (isLoading && !redirectTimeout) {
      const timeout = setTimeout(() => {
        console.log('Safety timeout triggered in AuthGuard - proceeding even though loading');
        setShowLoader(false);
      }, 8000); // 8 second safety timeout
      
      setRedirectTimeout(timeout);
    }
    
    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [isLoading, redirectTimeout]);
  
  // Only show loader after a brief delay to prevent flashing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 300);
    } else {
      setShowLoader(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);
  
  // If we've been loading for too long, just proceed (safety)
  if (isLoading && location.pathname.includes('/ai-platform')) {
    console.log('AI Platform route detected - skipping loading state for platform routes');
    return <>{children}</>;
  }

  // If still loading auth state, show improved loading UI
  if (isLoading && showLoader) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
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
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user && !isLoading) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;
