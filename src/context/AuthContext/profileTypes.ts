
// Create this file if it doesn't exist already
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
