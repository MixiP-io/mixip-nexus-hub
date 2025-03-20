
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/AuthContext/profileTypes';
import { toast } from '@/components/ui/use-toast';

export function useProfileService(setProfile: (profile: UserProfile | null) => void) {
  // Cache for recently fetched profiles to prevent redundant queries
  const profileCache = new Map<string, { data: UserProfile | null, timestamp: number }>();
  const CACHE_TTL = 5000; // Reduce cache TTL to 5 seconds to ensure we get fresh data after updates
  
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
      
      // Create a type-safe enhanced profile by casting the base data and adding defaults
      const enhancedProfile: UserProfile = {
        ...profileData,
        // Add default values for fields that might not exist in the database
        verification_status: (profileData as any).verification_status || 'not_verified',
        account_status: (profileData as any).account_status || 'active'
      };
      
      console.log('Profile fetched successfully:', enhancedProfile);
      // Update cache with the typed profile data
      profileCache.set(userId, { data: enhancedProfile, timestamp: Date.now() });
      setProfile(enhancedProfile);
      return enhancedProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Add a direct method to update the profile and clear cache
  const updateProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
    try {
      console.log('Updating profile for user:', userId, 'with data:', updates);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();
        
      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive"
        });
        return null;
      }
      
      // Create a type-safe enhanced profile by casting the base data and adding defaults
      const enhancedProfile: UserProfile = {
        ...data,
        // Add default values for fields that might not exist in the database
        verification_status: (data as any).verification_status || 'not_verified',
        account_status: (data as any).account_status || 'active'
      };
      
      console.log('Profile updated successfully:', enhancedProfile);
      
      // Clear the cache entry to force a fresh fetch next time
      profileCache.delete(userId);
      
      // Update the profile in state
      setProfile(enhancedProfile);
      
      return enhancedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  };

  return { fetchProfile, updateProfile };
}
