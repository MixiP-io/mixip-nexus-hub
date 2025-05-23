
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export function useSignOut(
  setIsLoading: (isLoading: boolean) => void,
  setProfile: (profile: null) => void
) {
  const signOut = async () => {
    try {
      console.log('Attempting sign out');
      setIsLoading(true);
      
      // Clear profile data first to prevent stale data issues
      setProfile(null);
      
      // Sign out from supabase with global scope to invalidate all sessions
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      console.log('Sign out successful');
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out.",
      });
      
      // Force a hard navigation to login page to ensure complete state reset
      window.location.href = '/login';
      
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut };
}
