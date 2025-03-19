
// Augment this file with missing types
export type VerificationStatus = "pending" | "verified" | "not_verified";

export interface UserProfile {
  id: string;
  full_name?: string;
  display_name?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
  account_type?: string; 
  is_new_user?: boolean;
  verification_status?: VerificationStatus;
}

// Add the missing type for authentication context
export interface AuthContextTypeEnhanced {
  session: import('@supabase/supabase-js').Session | null;
  user: import('@supabase/supabase-js').User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithSocial: (provider: 'google' | 'github') => Promise<void>;
  signUp: (email: string, password: string, metadata?: SignUpMetadata) => Promise<void>;
  signOut: () => Promise<void>;
}

// Add missing SignUpMetadata type
export interface SignUpMetadata {
  full_name?: string;
  account_type?: string;
}

// Add missing ProfileCreateData type
export interface ProfileCreateData {
  id: string;
  full_name?: string;
  account_type?: string;
  created_at: string;
  updated_at: string;
  is_new_user?: boolean;
}
