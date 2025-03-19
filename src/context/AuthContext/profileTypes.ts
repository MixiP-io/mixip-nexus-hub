
export type UserRole = "creator" | "business" | "client" | "admin" | "ai_platform";
export type AccountType = "creator_basic" | "creator_pro" | "business" | "client" | "ai_platform";
export type AccountStatus = "active" | "pending" | "suspended" | "deleted";
export type VerificationStatus = "pending" | "verified" | "not_verified";

// Enhanced AuthContext type with profile data
export interface AuthContextTypeEnhanced {
  session: any | null;
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: SignUpMetadata) => Promise<void>;
  signInWithSocial: (provider: "google" | "twitter" | "instagram") => Promise<void>;
  signOut: () => Promise<void>;
}

// User profile data from profile table
export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  display_name?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
  roles?: string[];
  skills?: string[];
  account_type: AccountType;
  account_status: AccountStatus;
  verification_status: VerificationStatus;
  is_new_user?: boolean;
  created_at: string;
  updated_at: string;
}

// Data needed when creating a profile
export interface ProfileCreateData {
  id?: string;
  full_name: string;
  account_type: AccountType;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  roles?: string[];
  skills?: string[];
  is_new_user?: boolean;
}

// Metadata for signup
export interface SignUpMetadata {
  full_name: string;
  account_type: AccountType;
  phone?: string;
}
