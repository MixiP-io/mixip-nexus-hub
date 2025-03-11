
export type TabType = 'all' | 'pending' | 'interested' | 'shortlisted' | 'declined';
export type SortDirection = 'asc' | 'desc';

export interface CampaignStats {
  totalReached: number;
  viewed: number;
  responded: number;
  interested: number;
  shortlisted: number;
  declined: number;
}
