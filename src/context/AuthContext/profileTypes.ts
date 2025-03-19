
import { Tables } from '@/integrations/supabase/types';

// Type representing a user profile as stored in the database
export type UserProfile = Tables<'profiles'>;

// Account type enum
export type AccountType = 'standard' | 'creator' | 'agency' | 'brand' | 'ai_platform' | null;

// Verification status type
export type VerificationStatus = 'not_verified' | 'pending' | 'verified';

// Account status type
export type AccountStatus = 'active' | 'suspended' | 'incomplete' | null;

// Type for profile data when creating a new profile
export interface ProfileCreateData {
  id: string;
  full_name?: string | null;
  display_name?: string | null;
  account_type?: AccountType | null; 
  avatar?: string | null;
  is_new_user?: boolean;
  bio?: string | null;
  location?: string | null;
  user_id?: string | null;
  account_status?: AccountStatus;
  verification_status?: VerificationStatus;
}

// Type for metadata when signing up
export interface SignUpMetadata {
  full_name?: string;
  display_name?: string;
  account_type?: AccountType;
  avatar_url?: string;
  [key: string]: any;
}

// Enhanced auth context type with proper profile typing
export interface AuthContextTypeEnhanced {
  session: import('@supabase/supabase-js').Session | null;
  user: import('@supabase/supabase-js').User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, metadata?: SignUpMetadata) => Promise<void>;
  signInWithSocial: (provider: 'google' | 'twitter' | 'instagram') => Promise<void>;
  signOut: () => Promise<void>;
}
