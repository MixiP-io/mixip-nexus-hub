
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signInWithSocial: (provider: 'google' | 'twitter' | 'instagram') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          fetchProfile(session.user.id);
          toast({
            title: "Signed in successfully",
            description: "Welcome back!",
          });
          navigate('/dashboard');
        }
        
        if (event === 'SIGNED_OUT') {
          setProfile(null);
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
          navigate('/login');
        }

        if (event === 'USER_UPDATED') {
          if (session?.user) {
            fetchProfile(session.user.id);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Navigation will be handled by the auth state change listener
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;
      
      if (data.user && data.session) {
        // If the user is immediately signed in after signup
        setUser(data.user);
        setSession(data.session);
        toast({
          title: "Sign up successful",
          description: "Your account has been created successfully!",
        });
        navigate('/dashboard');
      } else {
        // If email confirmation is required
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

  const signInWithSocial = async (provider: 'google' | 'twitter' | 'instagram') => {
    try {
      setIsLoading(true);
      let providerKey: 'google' | 'twitter' = provider === 'instagram' ? 'twitter' : provider;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: providerKey,
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        },
      });
      
      if (error) throw error;
      // Redirection will be handled by the OAuth provider
    } catch (error: any) {
      toast({
        title: "Social sign in failed",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Navigation will be handled by the auth state change listener
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
