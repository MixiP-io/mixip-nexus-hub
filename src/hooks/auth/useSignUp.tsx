
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
      console.log('Account type in signUp:', metadata?.account_type);
      setIsLoading(true);
      
      // Check if user already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', email)
        .maybeSingle();
        
      if (checkError) {
        console.log('Error checking existing user:', checkError);
      }
      
      if (existingUsers) {
        console.log('User already exists in profiles table');
        throw new Error("User already registered");
      }
      
      // Validate password length before sending to Supabase
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters.");
      }

      // Log the selected account type for debugging
      console.log('Selected account type:', metadata?.account_type);
      
      // First, let's create the auth user with the metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata?.full_name,
            account_type: metadata?.account_type, // Pass account_type in auth metadata
          },
        },
      });

      if (error) {
        console.error('Supabase auth signUp error:', error);
        throw error;
      }
      
      console.log('Sign up response:', data);
      
      if (data.user) {
        // Create profile record if user was signed up successfully
        if (metadata) {
          // More detailed logging for debugging
          console.log('Creating profile with metadata:', metadata);
          console.log('Account type being saved:', metadata.account_type);
          
          // Using proper typed object for profile data
          const profileData: ProfileCreateData = {
            id: data.user.id,
            full_name: metadata.full_name,
            account_type: metadata.account_type, // Make sure account_type is set here
            is_new_user: metadata.account_type === 'ai_platform' ? true : false,
            verification_status: 'not_verified',
            account_status: 'active',
            user_id: data.user.id
          };
          
          console.log('Profile data to insert:', profileData);
          
          // Now insert the profile with a direct upsert to ensure it exists
          const { error: profileError, data: profileResponse } = await supabase
            .from('profiles')
            .upsert(profileData)
            .select()
            .single();
            
          if (profileError) {
            console.error('Error creating profile:', profileError);
            toast({
              title: "Profile creation issue",
              description: "Your account was created but profile setup failed. Please contact support.",
              variant: "destructive",
            });
          } else {
            console.log('Created profile successfully:', profileResponse);
            console.log('Created profile with account type:', profileResponse.account_type);
          }
        }
        
        if (data.session) {
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
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific known error conditions
      if (error.message === "User already registered" || (error.code && error.code === "user_already_exists")) {
        toast({
          title: "Account already exists",
          description: "This email is already registered. Please try logging in instead.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign up failed",
          description: error.message || "An error occurred during sign up.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp };
}
