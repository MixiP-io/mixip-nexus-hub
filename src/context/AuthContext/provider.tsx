
import React from 'react';
import LoadingGuard from '@/components/auth/LoadingGuard';
import AuthContext from './context';
import { useAuthProvider } from '@/hooks/auth/useAuthProvider';

/**
 * AuthProvider component that manages authentication state and provides
 * authentication context to the application
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signInWithSocial,
    signOut,
    currentPath
  } = useAuthProvider();

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signInWithSocial,
        signOut,
      }}
    >
      <LoadingGuard 
        isLoading={isLoading} 
        user={user} 
        currentPath={currentPath}
      >
        {children}
      </LoadingGuard>
    </AuthContext.Provider>
  );
};
