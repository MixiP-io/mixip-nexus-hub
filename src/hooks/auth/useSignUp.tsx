
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { SignUpMetadata, ProfileCreateData } from '@/context/AuthContext/profileTypes';

export function useSignUp(
  setIsLoading: (isLoading: boolean) => void,
  setUser: (user: import('@supabase/supabase-js').User | null) => void,
  setSession: (session: import('@supabase/supabase-js').Session | null) => void
) {
  const signUp = async (email: string, password: string, metadata?: SignUpMetadata) => {
    try {
      console.log('Attempting sign up for email:', email, 'with metadata:', metadata);
      setIsLoading(true);
      
      // Validate password length before sending to Supabase
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters.");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;
      
      console.log('Sign up response:', data);
      
      if (data.user && data.session) {
        // Create profile record if user was signed up successfully
        if (metadata) {
          // More detailed logging for debugging
          console.log('Creating profile with metadata:', metadata);
          
          // Using proper typed object for profile data
          const profileData: ProfileCreateData = {
            id: data.user.id,
            full_name: metadata.full_name,
            account_type: metadata.account_type,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          // Add is_new_user flag for AI Platform users
          if (metadata.account_type === 'ai_platform') {
            console.log('Setting is_new_user flag for AI Platform account');
            profileData.is_new_user = true;
          }
          
          console.log('Profile data to insert:', profileData);
          
          const { error: profileError, data: profileResponse } = await supabase
            .from('profiles')
            .insert(profileData);
            
          if (profileError) {
            console.error('Error creating profile:', profileError);
          } else {
            console.log('Created profile successfully:', profileResponse);
            console.log('Created profile with account type:', metadata.account_type);
          }
        }
        
        setUser(data.user);
        setSession(data.session);
        toast({
          title: "Sign up successful",
          description: "Your account has been created successfully!",
        });
        
        // Navigation will be handled by the auth state change listener
      } else {
        // If email confirmation is required
        console.log('Email confirmation required, user not immediately signed in');
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification.",
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp };
}
