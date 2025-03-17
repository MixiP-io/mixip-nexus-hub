
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/AuthContext/profileTypes';
import { toast } from '@/components/ui/use-toast';

export function useProfileService(setProfile: (profile: UserProfile | null) => void) {
  // Cache for recently fetched profiles to prevent redundant queries
  const profileCache = new Map<string, { data: UserProfile | null, timestamp: number }>();
  const CACHE_TTL = 60000; // Increase cache TTL to 1 minute
  
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      // Check cache first
      const cachedProfile = profileCache.get(userId);
      if (cachedProfile && (Date.now() - cachedProfile.timestamp < CACHE_TTL)) {
        console.log('Using cached profile for user:', userId);
        setProfile(cachedProfile.data);
        return cachedProfile.data;
      }
      
      console.log('Fetching profile for user ID:', userId);
      
      // Add a retry mechanism for profile fetching
      const maxRetries = 3;
      let retryCount = 0;
      let profileData = null;
      let fetchError = null;
      
      while (retryCount < maxRetries && !profileData) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
          
          if (error) {
            console.error(`Error in profile fetch attempt ${retryCount + 1}:`, error);
            fetchError = error;
            retryCount++;
            
            // Wait a bit before retrying
            if (retryCount < maxRetries) {
              await new Promise(r => setTimeout(r, 500 * retryCount));
            }
          } else {
            profileData = data;
            break;
          }
        } catch (err) {
          console.error(`Error in profile fetch attempt ${retryCount + 1}:`, err);
          fetchError = err;
          retryCount++;
          
          // Wait a bit before retrying
          if (retryCount < maxRetries) {
            await new Promise(r => setTimeout(r, 500 * retryCount));
          }
        }
      }
      
      if (retryCount === maxRetries) {
        console.error('Max retries reached for profile fetch:', fetchError);
        toast({
          title: "Error fetching profile",
          description: "Please refresh the page and try again.",
          variant: "destructive"
        });
        return null;
      }
      
      if (!profileData) {
        console.log('No profile found for user:', userId);
        // Cache the null result to prevent repeated queries
        profileCache.set(userId, { data: null, timestamp: Date.now() });
        setProfile(null);
        return null;
      }
      
      console.log('Profile fetched successfully:', profileData);
      // Update cache
      profileCache.set(userId, { data: profileData, timestamp: Date.now() });
      setProfile(profileData);
      return profileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  return { fetchProfile };
}
