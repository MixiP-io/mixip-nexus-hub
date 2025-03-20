
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthService } from '@/hooks/useAuthService';
import { useAuthInitialization } from '@/hooks/auth/useAuthInitialization';
import { useAuthStateListeners } from '@/hooks/auth/useAuthStateListeners';
import LoadingGuard from '@/components/auth/LoadingGuard';
import AuthContext from './context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const auth = useAuthService();
  const [stableLoading, setStableLoading] = useState(true);
  
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

  // Handle loading state stability
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isLoading) {
      setStableLoading(true);
    } else {
      timer = setTimeout(() => {
        setStableLoading(false);
      }, 300);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  // Initialize authentication
  useAuthInitialization(
    setSession,
    setUser,
    setProfile,
    fetchProfile,
    setIsLoading
  );

  // Listen for authentication state changes
  useAuthStateListeners(
    setSession,
    setUser,
    setProfile,
    fetchProfile
  );

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
      <LoadingGuard 
        isLoading={stableLoading} 
        user={user} 
        currentPath={location.pathname}
      >
        {children}
      </LoadingGuard>
    </AuthContext.Provider>
  );
};
