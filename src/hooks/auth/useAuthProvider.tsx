
import { useLocation } from 'react-router-dom';
import { useAuthService } from '@/hooks/useAuthService';
import { useAuthInitialization } from '@/hooks/auth/useAuthInitialization';
import { useAuthStateListeners } from '@/hooks/auth/useAuthStateListeners';
import { useLoadingStability } from '@/hooks/auth/useLoadingStability';

/**
 * Main hook that combines all authentication services and state management
 * for use in the AuthProvider component
 */
export function useAuthProvider() {
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

  // Handle loading state stability
  const stableLoading = useLoadingStability(isLoading);

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

  return {
    session,
    user,
    profile,
    isLoading: stableLoading,
    signIn,
    signUp,
    signInWithSocial,
    signOut,
    currentPath: location.pathname
  };
}
