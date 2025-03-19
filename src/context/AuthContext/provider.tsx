
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthService } from '@/hooks/useAuthService';
import AuthContext from './context';
import { useAuthInitialization } from './hooks/useAuthInitialization';
import { useAuthStateListener } from './hooks/useAuthStateListener';
import { useLoadingStabilizer } from './hooks/useLoadingStabilizer';
import { LoadingIndicator } from './components/LoadingIndicator';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const auth = useAuthService();
  
  const {
    session, 
    setSession,
    user, 
    setUser,
    profile, 
    setProfile,
    isLoading, 
    setIsLoading,
    fetchProfile,
    signIn,
    signUp,
    signInWithSocial,
    signOut,
  } = auth;

  // Use our custom hooks
  useAuthInitialization(setSession, setUser, setProfile, setIsLoading, fetchProfile);
  useAuthStateListener(setSession, setUser, setProfile, fetchProfile);
  
  // Add a safety check to prevent infinite loading
  const stableLoading = useLoadingStabilizer(isLoading);
  
  // Debug logs to help understand the auth state
  console.log('Auth provider state:', { 
    hasUser: !!user, 
    isLoading, 
    stableLoading, 
    currentPath: location.pathname,
    userEmail: user?.email
  });

  // Show loading indicator when appropriate
  // Add a safety check for login page specifically
  if (stableLoading && !user && location.pathname !== '/login') {
    console.log('Showing loading indicator, path:', location.pathname);
    return <LoadingIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading: stableLoading,
        signIn,
        signUp,
        signInWithSocial,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
