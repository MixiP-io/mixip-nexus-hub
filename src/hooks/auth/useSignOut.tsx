
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Sign out successful');
      setProfile(null); // Clear the profile data
      // Navigation will be handled by the auth state change listener
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
