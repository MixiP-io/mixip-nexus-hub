
export interface Creator {
  id: number;
  name: string;
  role: string;
  avatar: string;
  location: string;
  rating: number;
  status: string;
  portfolio: string[];
  instagram: string;
  website: string;
  previousCollabs: number;
  viewedAt: Date | null;
  respondedAt: Date | null;
}
